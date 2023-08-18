import { useEffect, useState } from "react";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import DeleteHandler from "../components/DeleteHandler.jsx"
import {
  getAllUsers,
  getUserByID,
  update,
  registerUser,
  deleteUserById
} from "../api/user.js";

export default function UserCRUD() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");


  const handleSelectClick = (data) => {
    setSelectedUserID(data)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    createOrUpdateSelectedUser()
    setIsModalOpen(false);
  };

  const showConfirmHandler = () => {
    setShowConfirm(true);
  };
  const cancelConfirmHandler = () => {

    setShowConfirm(false);
  };
  const [user, setUser] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [selectedUser, setSelectedUser] = useState({
    user_id: "",
    user_email: "",
    user_password: "",
    user_access_role: "",
    user_phone: "",
    user_first_name: "",
    user_last_name: "",
    user_address: "",
    // user_authentication_key: ""
  });

  // console.log(selectedUser);

  const handleSortClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    getAllUsers().then((user) => {
      let sortedUser = [...user];

      if (sortColumn === "id") {
        sortedUser.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.user_id) - parseInt(b.user_id);
          } else {
            return parseInt(b.user_id) - parseInt(a.user_id);
          }
        });
      } else if (sortColumn === "email") {
        sortedUser.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.user_email.localeCompare(b.user_email);
          } else {
            return b.user_email.localeCompare(a.user_email);
          }
        });
      } else if (sortColumn === "role") {
        sortedUser.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.user_access_role.localeCompare(b.user_access_role);
          } else {
            return b.user_access_role.localeCompare(a.user_access_role);
          }
        });
      }
      else if (sortColumn === "phone") {
        sortedUser.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.user_phone.localeCompare(b.user_phone);
          } else {
            return b.user_phone.localeCompare(a.user_phone);
          }
        });
      }
      else if (sortColumn === "firstName") {
        sortedUser.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.user_first_name.localeCompare(b.user_first_name);
          } else {
            return b.user_first_name.localeCompare(a.user_first_name);
          }
        });
      }
      else if (sortColumn === "lastName") {
        sortedUser.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.user_last_name.localeCompare(b.user_last_name);
          } else {
            return b.user_last_name.localeCompare(a.user_last_name);
          }
        });
      }
      setUser(sortedUser);
    });
  }, [sortColumn, sortOrder, selectedUserID]);


  useEffect(() => {
    if (selectedUserID) {
      getUserByID(selectedUserID).then((user) => {

        setSelectedUser(user);
      });
    } else {
      setSelectedUser({
        user_id: "",
        user_email: "",
        user_password: "",
        user_access_role: "",
        user_phone: "",
        user_first_name: "",
        user_last_name: "",
        user_address: "",
        // user_authentication_key: ""
      });
    }
  }, [selectedUserID]);

  function createOrUpdateSelectedUser() {
    if (selectedUserID) {
      update(selectedUser).then((updateUser) => {
        // console.log(selectedUser)
        setSelectedUserID(null);
        setSelectedUser({
          user_id: "",
          user_email: "",
          user_password: "",
          user_access_role: "",
          user_phone: "",
          user_first_name: "",
          user_last_name: "",
          user_address: "",
          // user_authentication_key: ""
        });
      });
    } else {
      registerUser(selectedUser).then((createdUser) => {
        setSelectedUser({
          user_id: "",
          user_email: "",
          user_password: "",
          user_access_role: "",
          user_phone: "",
          user_first_name: "",
          user_last_name: "",
          user_address: "",
          // user_authentication_key: ""
        });

        getAllUsers().then((user) =>
          setUser(user));
      }, []);
    }
  }
  const deleteSelectedUser = () => {
    deleteUserById(selectedUser).then((result) => {
      setSelectedUserID(null);
      setSelectedUser({
        user_id: "",
        user_email: "",
        user_password: "",
        user_access_role: "",
        user_phone: "",
        user_first_name: "",
        user_last_name: "",
        user_address: "",
        // user_authentication_key: ""
      });
    });
    cancelConfirmHandler()
    handleCloseModal()
  }

  return (
    <div className="flex flex-col min-h-screen bg-emerald-100 bg-opacity-70 " style={{
      backgroundImage: `url('/Blog_1.jpg')`,
      backgroundAttachment: 'fixed'
    }}>
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedUser}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
      <Nav />
      <h1 className="text-5xl font-bold my-6 text-center text-zinc-50">User List</h1>
      <h2 className="text-3xl font-bold my-6 text-center text-zinc-50">Our success is a reflection of our team's hard work and dedication.</h2>
      <div className="grid grid-cols-1 xl:grid-cols-1 my-10 mx-auto justify-items-center gap-10 w-8/12 ">
        <div className="w-full my-4 overflow-auto p-1">
          <table className="table table-compact w-full shadow-green rounded-[7px] ">
            <thead>
              {!isModalOpen && (
                <tr>
                  <th
                    className="w-[7%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    style={{ position: 'static' }}
                    onClick={() => handleSortClick("id")} >
                    <span>ID</span>
                    {sortColumn === 'id' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[25%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("email")} >
                    <span> Email </span>
                    {sortColumn === 'email' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("role")} >
                    <span> Role</span>
                    {sortColumn === 'role' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300" onClick={() => handleSortClick("phone")} >
                    <span> Phone </span>
                    {sortColumn === 'phone' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300" onClick={() => handleSortClick("firstName")} >
                    <span> First Name </span>
                    {sortColumn === 'firstName' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="w-[15%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300" onClick={() => handleSortClick("lastName")} >
                    <span> Last Name </span>
                    {sortColumn === 'lastName' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="bg-emerald-100 bg-opacity-70 " >Status</th>
                </tr>)}
            </thead>
            <tbody className="overflow-y-auto">
              {user.map((user) => (
                <tr key={user.user_id}>
                  <td className="bg-emerald-100 bg-opacity-70">{user.user_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{user.user_email}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{user.user_access_role}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{user.user_phone}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{user.user_first_name}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{user.user_last_name}</td>
                  <td className="bg-emerald-100 bg-opacity-70">
                    <button
                      className="btn btn-xs"
                      // onClick={() => setSelectedUserID(user.user_id)}
                      onClick={() => handleSelectClick(user.user_id)}
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
          <div className="w-full rounded p-2 my-4
          fixed inset-0 bg-[#000] 
        text-3xl m-auto flex justify-evenly items-center z-10"
            style={{ position: "fixed" }}
            onClick={() => handleCloseModal()}>
            <div className="w-8/12" onClick={(e) => e.stopPropagation()}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">ID:</span>
                </label>
                <input
                  type="text"
                  readonly
                  className="input input-bordered bg-emerald-100 "
                  value={selectedUser.user_id}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Email:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100 "
                  value={selectedUser.user_email}
                  onChange={(e) => {
                    setSelectedUser({ ...selectedUser, user_email: e.target.value });
                  }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Password:</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered bg-emerald-100 "
                  value={selectedUser.user_password}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, user_password: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Role:</span>
                </label>
                <select
                  className="select select-bordered bg-emerald-100"
                  value={selectedUser.user_access_role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, user_access_role: e.target.value })
                  }
                >
                  {/* <option disabled selected>Pick one</option> */}
                  <option value="" >-- Select an role --</option>
                  <option value="admin">admin</option>
                  <option value="trainer">trainer</option>
                  <option value="member">member</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Phone:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100 "
                  value={selectedUser.user_phone}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, user_phone: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">First Name:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100 "
                  value={selectedUser.user_first_name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, user_first_name: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Last Name:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100 "
                  value={selectedUser.user_last_name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, user_last_name: e.target.value })
                  }
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">Address:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100 "
                  value={selectedUser.user_address}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, user_address: e.target.value })
                  }
                />
              </div>
              <div className="pt-4 flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedUserID(null);
                    setSelectedUser({
                      user_id: "",
                      user_email: "",
                      user_password: "",
                      user_access_role: "",
                      user_phone: "",
                      user_first_name: "",
                      user_last_name: "",
                      user_address: "",
                      // user_authentication_key: ""
                    });
                  }}
                >
                  New
                </button>
                <button
                  className="btn"
                  // onClick={() => createOrUpdateSelectedUser()}
                  onClick={handleSaveClick}
                >
                  Save
                </button>{" "}
                <button
                  className="btn btn-secondary"
                  // onClick={() => deleteSelectedUser()}
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
      <Footer />
    </div>
  );
}
