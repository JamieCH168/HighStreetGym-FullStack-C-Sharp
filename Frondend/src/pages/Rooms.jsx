import { useEffect, useState } from "react";
import {
  createRoom,
  getAllRooms,
  getRoomByID,
  update,
  deleteRoomById
} from "../api/rooms";
// import { XMLUpload } from "../components/XMLUpload.jsx";
import DeleteHandler from "../components/DeleteHandler"
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function roomCRUD() {
  const [warningMessage, setWarningMessage] = useState('');
  const [room, setRoom] = useState([]);
  const [selectedRoomID, setSelectedRoomID] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState({
    room_id: "",
    room_location: "",
    room_number: "",
  });
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {
    setShowConfirm(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSelectClick = (data) => {
    setSelectedRoomID(data)
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveClick = () => {
    createOrUpdateSelectedRoom()
    setIsModalOpen(false);
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
    getAllRooms().then((data) => {
      let sortedData = [...data];

      if (sortColumn === "id") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.room_id) - parseInt(b.room_id);
          } else {
            return parseInt(b.room_id) - parseInt(a.room_id);
          }
        });
      } else if (sortColumn === "location") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.room_location.localeCompare(b.room_location);
          } else {
            return b.room_location.localeCompare(a.room_location);
          }
        });
      } else if (sortColumn === "number") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.room_number) - parseInt(b.room_number);
          } else {
            return parseInt(b.room_number) - parseInt(a.room_number);
          }
        });
      }
      setRoom(sortedData);
    })
  }, [sortColumn, sortOrder, selectedRoomID]);

  useEffect(() => {
    if (selectedRoomID) {
      getRoomByID(selectedRoomID).then((data) => {
        setSelectedRoom(data);
      });
    } else {
      setSelectedRoom({
        room_id: "",
        room_location: "",
        room_number: "",
      });
    }
  }, [selectedRoomID]);

  function createOrUpdateSelectedRoom() {
    if (selectedRoomID) {
      update(selectedRoom).then((updateRoom) => {
        setSelectedRoomID(null);
        setSelectedRoom({
          room_id: "",
          room_location: "",
          room_number: "",
        });
      });
    } else {
      createRoom(selectedRoom).then((createdRoom) => {
        // setSelectedRoomID(createdRoom);
        setSelectedRoom({
          room_id: "",
          room_location: "",
          room_number: "",
        });
        getAllRooms().then((data) =>
          setRoom(data));
      });
    }
  }
  const deleteSelectedRoom = () => {

    if (selectedRoom) {
      deleteRoomById(selectedRoom).then((result) => {
        setSelectedRoomID(null);
        setSelectedRoom({
          room_id: "",
          room_location: "",
          room_number: "",
        });
      });
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
        onDelete={deleteSelectedRoom}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
      <Nav></Nav>
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center text-zinc-50">Room CRUD</h1>
      <div className="grid grid-cols-1 xl:grid-cols-1 justify-items-center w-8/12 mx-auto gap-4 pb-4">
        <div className="w-full rounded  p-1 overflow-auto">
          <table className="w-full table table-compact text-center shadow-green rounded-[7px]">
            <thead>
              {!isModalOpen && (
                <tr>
                  <th
                    className="w-[25%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    style={{ position: 'static' }}
                    onClick={() => handleSortClick("id")} >
                    <span>ID</span>
                    {sortColumn === 'id' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[25%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("location")} >
                    <span>Location</span>
                    {sortColumn === 'location' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[25%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("number")} >
                    <span>Number</span>
                    {sortColumn === 'number' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="bg-emerald-100 bg-opacity-70 " >Status</th>
                </tr>
              )}

            </thead>
            <tbody>
              {room.map((data) => (
                <tr key={data.room_id}>
                  <td className="bg-emerald-100 bg-opacity-70">{data.room_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.room_location}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.room_number}</td>
                  <td className="bg-emerald-100 bg-opacity-70">
                    <button
                      className="btn btn-xs"
                      // onClick={() => setSelectedRoomID(data.room_id)}
                      onClick={() => handleSelectClick(data.room_id)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="rounded p-2 my-2 w-full" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
          {/* <XMLUpload
            endpoint="/room/upload/xml"
            onUploadSuccess={() => {
              getAllRooms().then((data) =>
                setRoom(data));
            }} /> */}
        </div>

        {isModalOpen && (
          <div className="w-full fixed inset-0 bg-[#000] 
          text-3xl m-auto flex justify-evenly items-center z-100"
            onClick={() => handleCloseModal()}>
            <div className="rounded p-2 w-8/12" onClick={(e) => e.stopPropagation()} >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">ID:</span>
                </label>
                <input
                  type="text"
                  readonly
                  className="input input-bordered bg-emerald-100"
                  value={selectedRoom.room_id}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Room Location:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedRoom.room_location}
                  onChange={(e) => {
                    setSelectedRoom({ ...selectedRoom, room_location: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Room Number:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedRoom.room_number}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (isNaN(value) || value.includes('.')) {
                      setWarningMessage('Please enter a valid integer for Room Number!');
                      return;
                    }
                    setWarningMessage('');
                    setSelectedRoom({ ...selectedRoom, room_number: value })

                  }
                  }
                />
                {warningMessage && <div className="text-red-500">{warningMessage}</div>}
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedRoomID(null);
                    setSelectedRoom({
                      room_id: "",
                      room_location: "",
                      room_number: "",
                    });
                  }}
                >
                  New
                </button>
                <button
                  className="btn"
                  // onClick={() => createOrUpdateSelectedRoom()}
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
      {!isModalOpen && (<Footer></Footer>)}

    </div>
  );
}
