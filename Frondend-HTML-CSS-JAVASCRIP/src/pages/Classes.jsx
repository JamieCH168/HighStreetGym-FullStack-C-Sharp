import { useEffect, useState } from "react";
import DeleteHandler from "../components/DeleteHandler"
import {
  createClass,
  getAllClasses,
  getClassByID,
  update,
  deleteClassById,
} from "../api/classes";
import { getAllUsers } from "../api/user";
import { getAllActivities } from "../api/activities";
import { getAllRooms } from "../api/rooms";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function classCRUD() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classData, setClassData] = useState([]);
  const [selectedClassID, setSelectedClassID] = useState(null);
  const [selectedClass, setSelectedClass] = useState({
    class_id: "",
    class_date: "",
    class_time: "",
    class_room_id: "",
    class_activity_id: "",
    class_trainer_user_id: "",
  });
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");



  const handleSelectClick = (data) => {
    setSelectedClassID(data)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    createOrUpdateSelectedClass()
    setIsModalOpen(false);
  };

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {
    setShowConfirm(false);
  };

  const handleSortClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    getAllClasses().then((data) => {
      let sortedData = [...data];
      if (sortColumn === "id") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.class_id) - parseInt(b.class_id);
          } else {
            return parseInt(b.class_id) - parseInt(a.class_id);
          }
        });
      } else if (sortColumn === "date") {
        sortedData.sort((a, b) => {
          const dateA = new Date(a.class_date.replace(/-/g, "/"));
          const dateB = new Date(b.class_date.replace(/-/g, "/"));

          if (sortOrder === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
      } else if (sortColumn === "time") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.class_time.localeCompare(b.class_time);
          } else {
            return b.class_time.localeCompare(a.class_time);
          }
        });
      } else if (sortColumn === "roomId") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.class_room_id) - parseInt(b.class_room_id);
          } else {
            return parseInt(b.class_room_id) - parseInt(a.class_room_id);
          }
        });
      } else if (sortColumn === "activityId") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.class_activity_id) - parseInt(b.class_activity_id);
          } else {
            return parseInt(b.class_activity_id) - parseInt(a.class_activity_id);
          }
        });
      } else if (sortColumn === "trainerId") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.class_trainer_user_id) - parseInt(b.class_trainer_user_id);
          } else {
            return parseInt(b.class_trainer_user_id) - parseInt(a.class_trainer_user_id);
          }
        });
      }
      setClassData(sortedData)
    }
    );
  }, [selectedClassID, sortColumn, sortOrder]);


  const [user, setUser] = useState([]);
  // console.log(user)
  useEffect(() => {
    getAllUsers().then((data) => {
      const filteredData = data.filter((user) => user.user_access_role === 'trainer');
      setUser(filteredData);
    })
  }, []);

  const [activity, setActivity] = useState([]);
  useEffect(() => {
    getAllActivities().then((data) =>
      setActivity(data)
    );
  }, []);

  const [room, setRoom] = useState([]);
  useEffect(() => {
    getAllRooms().then((data) =>
      setRoom(data));
  }, []);


  useEffect(() => {

    if (selectedClassID) {
      // console.log(selectedClassID)
      getClassByID(selectedClassID).then((data) => {
        // console.log(data)
        setSelectedClass(data);
      });
    } else {
      setSelectedClass({
        class_id: "",
        class_date: "",
        class_time: "",
        class_room_id: "",
        class_activity_id: "",
        class_trainer_user_id: "",
      });
    }
  }, [selectedClassID]);

  function createOrUpdateSelectedClass() {
    if (selectedClassID) {
      // console.log(selectedClass)
      update(
        {
          ...selectedClass, class_room_id: selectedClass.class_room_id.toString(), class_activity_id: selectedClass.class_activity_id.toString(), class_trainer_user_id: selectedClass.class_trainer_user_id.toString()
        }
      ).then((updateClass) => {
        setSelectedClassID(null);
        setSelectedClass({
          class_id: "",
          class_date: "",
          class_time: "",
          class_room_id: "",
          class_activity_id: "",
          class_trainer_user_id: "",
        });
      });
    } else {
      // console.log(selectedClass)
      createClass(selectedClass).then((createdClass) => {
        // setSelectedClassID(createdClass.class_id);
        getAllClasses().then((data) =>
          setClassData(data)
        );
        setSelectedClass({
          class_id: "",
          class_date: "",
          class_time: "",
          class_room_id: "",
          class_activity_id: "",
          class_trainer_user_id: "",
        });
      });
    }
  }
  const deleteSelectedClass = () => {
    deleteClassById(selectedClass).then((result) => {
      setSelectedClassID(null);
      setSelectedClass({
        class_id: "",
        class_date: "",
        class_time: "",
        class_room_id: "",
        class_activity_id: "",
        class_trainer_user_id: "",
      });
    });
    cancelConfirmHandler()
    handleCloseModal()
  }

  // useEffect(() => {
  //   const currentDate = new Date().toISOString().slice(0,10);
  //   setSelectedClass({
  //     ...selectedClass,
  //     class_date: currentDate,
  //   });
  // }, []);


  return (
    <div className="flex flex-col min-h-screen " style={{
      backgroundImage: `url('/Blog_1.jpg')`,
      backgroundAttachment: 'fixed'
    }}>
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedClass}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
      <Nav></Nav>
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center text-zinc-50">Class CRUD</h1>
      <div className="grid grid-cols-1 xl:grid-cols-1 mx-auto justify-items-center w-8/12 ">
        <div className="w-full my-4 overflow-auto p-1">
          <table className="table table-compact w-full text-center shadow-green rounded-[7px]">
            <thead>
              {!isModalOpen && (<tr>
                <th
                  className="w-[10%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300 "
                  style={{ position: 'static' }}
                  onClick={() => handleSortClick("id")} >
                  <span>ID</span>
                  {sortColumn === 'id' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th
                  className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                  onClick={() => handleSortClick("date")} >
                  <span>Date</span>
                  {sortColumn === 'date' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th
                  className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                  onClick={() => handleSortClick("time")} >
                  <span>Time</span>
                  {sortColumn === 'time' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th
                  className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                  onClick={() => handleSortClick("roomId")} >
                  <span>Room ID</span>
                  {sortColumn === 'roomId' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th
                  className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                  onClick={() => handleSortClick("activityId")} >
                  <span>Activity ID</span>
                  {sortColumn === 'activityId' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th
                  className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                  onClick={() => handleSortClick("trainerId")} >
                  <span>Trainer ID</span>
                  {sortColumn === 'trainerId' && (
                    <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                  )}
                </th>
                <th className="bg-emerald-100 bg-opacity-70 " >Status</th>
              </tr>)}
            </thead>
            <tbody >
              {classData.map((data) => (
                <tr key={data.class_id}>
                  <td className="bg-emerald-100 bg-opacity-70">{data.class_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.class_date}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.class_time}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.class_room_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.class_activity_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.class_trainer_user_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">
                    <button
                      className="btn btn-xs"
                      // onClick={() => setSelectedClassID(data.class_id)}
                      onClick={() => handleSelectClick(data.class_id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isModalOpen && (
          <div className="w-full 
          fixed inset-0 bg-[#000] 
          text-3xl m-auto flex justify-evenly items-center z-10
          "
            onClick={() => handleCloseModal()}
          >
            <div className="w-8/12 rounded p-2" onClick={(e) => e.stopPropagation()}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">ID:</span>
                </label>
                <input
                  type="text"
                  readonly
                  className="input input-bordered bg-emerald-100"
                  value={selectedClass.class_id}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Date:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100 "
                  placeholder="2023/04/20"
                  // value={selectedClass.class_date || new Date().toISOString().slice(0, 10)}
                  // value={new Date(selectedClass.class_date).toISOString().slice(0, 10)|| new Date().toISOString().slice(0, 10)}
                  value={selectedClass.class_date || new Date().toISOString().slice(0, 10)}
                  onChange={(e) => {
                    setSelectedClass({
                      ...selectedClass,
                      class_date: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Time:</span>
                </label>
                <input
                  type="text"
                  placeholder="12:30"
                  className="input input-bordered bg-emerald-100"
                  // value={selectedClass.class_time || "12:30:00"}
                  value={selectedClass.class_time || new Date().toISOString().slice(11, 19)}

                  onChange={(e) => {
                    setSelectedClass({
                      ...selectedClass,
                      class_time: e.target.value,
                    });
                  }}
                />
              </div>
              {/* <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-500">Room ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-emerald-100"
                value={selectedClass.class_room_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_room_id: e.target.value,
                  })
                }
              />
            </div> */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Room ID:</span>
                </label>
                <select
                  className="input input-bordered bg-emerald-100"
                  value={selectedClass.class_room_id}
                  onChange={(e) =>
                    setSelectedClass({
                      ...selectedClass,
                      class_room_id: e.target.value,
                    })
                  }
                >
                  {/* <option disabled selected>Pick one</option> */}
                  <option value="" >-- Select a room ID --</option>
                  {room.map(option => (
                    <option key={option.room_id} value={option.room_id}>{option.room_id}</option>
                  ))}
                </select>
              </div>
              {/* <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-500">Activity ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-emerald-100"
                value={selectedClass.class_activity_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_activity_id: e.target.value,
                  })
                }
              />
            </div> */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Activity ID:</span>
                </label>
                <select
                  className="input input-bordered bg-emerald-100"
                  value={selectedClass.class_activity_id}
                  onChange={(e) =>
                    setSelectedClass({
                      ...selectedClass,
                      class_activity_id: e.target.value,
                    })
                  }
                >
                  {/* <option disabled selected>Pick one</option> */}
                  <option value="" >-- Select an activity ID --</option>
                  {activity.map(option => (
                    <option key={option.activity_id} value={option.activity_id}>{option.activity_id}</option>
                  ))}
                </select>
              </div>
              {/* <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-500">Trainer User ID:</span>
              </label>
              <input
                type="text"
                className="input input-bordered bg-emerald-100"
                value={selectedClass.class_trainer_user_id}
                onChange={(e) =>
                  setSelectedClass({
                    ...selectedClass,
                    class_trainer_user_id: e.target.value,
                  })
                }
              />
            </div> */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Trainer User ID:</span>
                </label>
                <select
                  className="input input-bordered bg-emerald-100"
                  value={selectedClass.class_trainer_user_id}
                  onChange={(e) =>
                    setSelectedClass({
                      ...selectedClass,
                      class_trainer_user_id: e.target.value,
                    })
                  }
                >
                  {/* <option disabled selected>Pick one</option> */}
                  <option value="" >-- Select a trainer user ID --</option>
                  {user.map(option => (
                    <option key={option.user_id} value={option.user_id}>{option.user_id}</option>
                  ))}
                </select>
              </div>
              <div className="pt-4 flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedClassID(null);
                    setSelectedClass({
                      class_id: "",
                      class_date: "",
                      class_time: "",
                      class_room_id: "",
                      class_activity_id: "",
                      class_trainer_user_id: "",
                    });
                  }}
                >
                  New
                </button>
                <button
                  className="btn"
                  // onClick={() => createOrUpdateSelectedClass()}
                  onClick={handleSaveClick}
                >
                  Save
                </button>{" "}
                <button
                  className="btn btn-secondary"
                  onClick={showConfirmHandler}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="grow  ">
      </div>
      <Footer></Footer>
    </div>
  );
}
