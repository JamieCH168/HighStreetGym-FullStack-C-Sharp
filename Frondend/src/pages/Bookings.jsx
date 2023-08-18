import React, { useEffect, useState } from "react";
import {
  createBooking,
  getAllBookings,
  getBookingByID,
  update,
  deleteBookingById
} from "../api/bookings";
import { getAllClasses } from "../api/classes";
import { getAllUsers } from "../api/user";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DeleteHandler from "../components/DeleteHandler"

export default function bookingCRUD() {

  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {
    setShowConfirm(false);
  };
  const [booking, setBooking] = useState([]);
  const [classData, setClassData] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedBookingID, setSelectedBookingID] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState({
    booking_id: "",
    booking_user_id: "",
    booking_class_id: "",
    booking_created_date: "",
    booking_created_time: "",
  });
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");


  const handleSelectClick = (data) => {
    setSelectedBookingID(data)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    createOrUpdateSelectedBooking()
    setIsModalOpen(false);
  };

  useEffect(() => {
    getAllClasses().then((data) =>
      setClassData(data)
    );
  }, []);

  useEffect(() => {
    getAllUsers().then((data) => {
      const filteredData = data.filter((user) => user.user_access_role === 'member');
      setUser(filteredData);
    })
  }, []);

  const handleSortClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    getAllBookings().then((data) => {
      let sortedData = [...data];

      if (sortColumn === "id") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.booking_id) - parseInt(b.booking_id);
          } else {
            return parseInt(b.booking_id) - parseInt(a.booking_id);
          }
        });
      } else if (sortColumn === "userId") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.booking_user_id) - parseInt(b.booking_user_id);
          } else {
            return parseInt(b.booking_user_id) - parseInt(a.booking_user_id);
          }
        });
      } else if (sortColumn === "classId") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.booking_class_id) - parseInt(b.booking_class_id);
          } else {
            return parseInt(b.booking_class_id) - parseInt(a.booking_class_id);
          }
        });
      } else if (sortColumn === "date") {
        sortedData.sort((a, b) => {
          const dateA = new Date(a.booking_created_date.replace(/-/g, "/"));
          const dateB = new Date(b.booking_created_date.replace(/-/g, "/"));

          if (sortOrder === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
      } else if (sortColumn === "time") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.booking_created_time.localeCompare(b.booking_created_time);
          } else {
            return b.booking_created_time.localeCompare(a.booking_created_time);
          }
        });
      }

      setBooking(sortedData)
      // setBooking(prevBookings => [...prevBookings, ...data.map(booking => ({
      //   ...booking,
      //   booking_created_date: new Date(booking.booking_created_date).toLocaleDateString()
      // }))]
      // )

    });
  }, [selectedBookingID, sortColumn, sortOrder]);

  useEffect(() => {

    if (selectedBookingID) {
      getBookingByID(selectedBookingID).then((data) => {
        setSelectedBooking(data);
      });
    } else {
      setSelectedBooking({
        booking_id: "",
        booking_user_id: "",
        booking_class_id: "",
        booking_created_date: "",
        booking_created_time: "",
      });
    }
  }, [selectedBookingID]);

  function createOrUpdateSelectedBooking() {
    if (selectedBookingID) {
      update({
        ...selectedBooking, booking_user_id: selectedBooking.booking_user_id.toString(), booking_class_id: selectedBooking.booking_class_id.toString(),
      })
        .then((updateBooking) => {
          setSelectedBookingID(null);
          setSelectedBooking({
            booking_id: "",
            booking_user_id: "",
            booking_class_id: "",
            booking_created_date: "",
            booking_created_time: "",
          });
        });
    } else {
      // console.log(selectedBooking)
      //    console.log({
      //   ...selectedBooking,booking_user_id:Number(selectedBooking.booking_user_id),booking_class_id:Number(selectedBooking.booking_class_id)
      // })

      createBooking(
        selectedBooking
        // {
        //   ...selectedBooking,booking_user_id:Number(selectedBooking.booking_user_id),booking_class_id:Number(selectedBooking.booking_class_id)
        // }
      ).then((createdBooking) => {
        // setSelectedBookingID(createdBooking.booking_id);
        setSelectedBooking({
          booking_id: "",
          booking_user_id: "",
          booking_class_id: "",
          booking_created_date: "",
          booking_created_time: "",
        });
        getAllBookings().then((data) =>
          setBooking(data)
        );
      });
    }
  }
  const deleteSelectedBooking = () => {
    if (selectedBooking) {
      // console.log(selectedBooking)

      deleteBookingById(selectedBooking).then((result) => {
        setSelectedBookingID(null);
        setSelectedBooking({
          booking_id: "",
          booking_user_id: "",
          booking_class_id: "",
          booking_created_date: "",
          booking_created_time: "",
        });
      });
      cancelConfirmHandler()
      handleCloseModal()

    } else {
      cancelConfirmHandler()
      handleCloseModal()
    }
  }

  return (
    <div className="flex flex-col min-h-screen" style={{
      backgroundImage: `url('/Blog_1.jpg')`,
      backgroundAttachment: 'fixed'
    }}>
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedBooking}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
      <Nav></Nav>
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center text-zinc-50">Booking CRUD</h1>
      <div className="grid grid-cols-1 xl:grid-cols-1 justify-items-center w-8/12 mx-auto gap-4 pb-4">
        <div className="w-full overflow-auto p-1" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
          <table className="w-full table table-compact text-center shadow-green rounded-[7px] " >
            <thead >
              {!isModalOpen && (
                <tr >
                  <th
                    className="w-[17%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    style={{ position: 'static' }}
                    onClick={() => handleSortClick("id")} >
                    <span>ID</span>
                    {sortColumn === 'id' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[17%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("userId")} >
                    <span>User ID</span>
                    {sortColumn === 'userId' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[17%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("classId")} >
                    <span>Class ID</span>
                    {sortColumn === 'classId' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[17%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("date")} >
                    <span>Date</span>
                    {sortColumn === 'date' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[17%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("time")} >
                    <span>Time</span>
                    {sortColumn === 'time' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="bg-emerald-100 bg-opacity-70">Status</th>
                </tr>
              )}
            </thead>
            <tbody>
              {booking.map((data) => (
                <tr key={data.booking_id} >
                  <td className="bg-emerald-100 bg-opacity-70">{data.booking_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.booking_user_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.booking_class_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.booking_created_date}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.booking_created_time}</td>
                  <td className="bg-emerald-100 bg-opacity-70">
                    <button
                      className="btn btn-xs"
                      // onClick={() => setSelectedBookingID(data.booking_id)}
                      onClick={() => handleSelectClick(data.booking_id)}
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
          // <Modal booking={selectedBooking} onClose={handleCloseModal} />
          <div className="w-full rounded  p-2 
        fixed inset-0 bg-[#000] 
        text-3xl m-auto flex justify-evenly items-center z-10
        "
            onClick={() => handleCloseModal()}
          >
            <div className="w-8/12" onClick={(e) => e.stopPropagation()}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">ID:</span>
                </label>
                <input
                  type="text"
                  readonly
                  className="input input-bordered bg-emerald-100"
                  value={selectedBooking.booking_id}
                />
              </div>

              {/* <div className="form-control">
          <label className="label">
            <span className="label-text">booking_user_id:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            // value={selectedBooking.booking_user_id ? Number(selectedBooking.booking_user_id) : ""}
            value={selectedBooking.booking_user_id}
            onChange={(e) => {
              setSelectedBooking({ ...selectedBooking, booking_user_id: e.target.value });
            }}
          />
        </div> */}

              <div className="form-control" >
                <label className="label">
                  <span className="label-text text-xl text-lime-500 ">booking user id:</span>
                </label>
                <select
                  className="input input-bordered bg-emerald-100"
                  value={selectedBooking.booking_user_id}
                  onChange={(e) => {
                    setSelectedBooking({ ...selectedBooking, booking_user_id: e.target.value });
                  }}
                >
                  {/* <option disabled selected>Pick one</option> */}
                  <option value="" >-- Select a user ID --</option>
                  {user.map(option => (
                    <option key={option.user_id} value={option.user_id}>{option.user_id}</option>
                  ))}
                </select>
              </div>

              {/* <div className="form-control">
          <label className="label">
            <span className="label-text">booking_class_id:</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            // value={selectedBooking.booking_class_id ? parseInt(selectedBooking.booking_class_id) : ""}
            value={selectedBooking.booking_class_id}
            onChange={(e) =>
              setSelectedBooking({ ...selectedBooking, booking_class_id: e.target.value })
            }
          />
        </div> */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">booking_class_id:</span>
                </label>
                <select
                  className="input input-bordered bg-emerald-100"
                  value={selectedBooking.booking_class_id}
                  onChange={(e) =>
                    setSelectedBooking({ ...selectedBooking, booking_class_id: e.target.value })
                  }
                >
                  {/* <option disabled selected>Pick one</option> */}
                  <option value="" >-- Select a class ID --</option>
                  {classData.map(option => (
                    <option key={option.class_id} value={option.class_id}>{option.class_id}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">booking_created_date:</span>
                </label>
                <input
                  type="text"
                  // readonly
                  disabled
                  className="input input-bordered bg-emerald-100"

                  value={selectedBooking.booking_created_date}
                  onChange={(e) =>
                    setSelectedBooking({ ...selectedBooking, booking_created_date: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">booking_created_time:</span>
                </label>
                <input
                  type="text"
                  readonly
                  disabled
                  className="input input-bordered"
                  value={selectedBooking.booking_created_time}
                  onChange={(e) =>
                    setSelectedBooking({ ...selectedBooking, booking_created_time: e.target.value })
                  }
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedBookingID(null);
                    setSelectedBooking({
                      booking_id: "",
                      booking_user_id: "",
                      booking_class_id: "",
                      booking_created_date: "",
                      booking_created_time: "",
                    });
                  }}
                >
                  New
                </button>
                <button
                  className="btn btn-info"
                  // onClick={() => createOrUpdateSelectedBooking()}
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
