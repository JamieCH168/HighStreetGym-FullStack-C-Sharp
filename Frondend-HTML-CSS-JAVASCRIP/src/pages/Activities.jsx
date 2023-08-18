import { useEffect, useState } from "react";
import { XMLUpload } from "../components/XMLUpload.jsx";
import DeleteHandler from "../components/DeleteHandler.jsx"
import {
    createActivity,
    getAllActivities,
    getActivityByID,
    update,
    deleteActivityById
} from "../api/activities.js";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

export default function activityCRUD() {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activity, setActivity] = useState([]);
    const [selectedActivityID, setSelectedActivityID] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState({
        activity_id: "",
        activity_name: "",
        activity_description: "",
        activity_duration: "",
    });
    const [sortColumn, setSortColumn] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");



    const handleSelectClick = (data) => {
        setSelectedActivityID(data)
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveClick = () => {
        createOrUpdateSelectedActivity()
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
        getAllActivities().then((data) => {
            let sortedData = [...data];

            if (sortColumn === "id") {
                sortedData.sort((a, b) => {
                    if (sortOrder === "asc") {
                        return parseInt(a.activity_id) - parseInt(b.activity_id);
                    } else {
                        return parseInt(b.activity_id) - parseInt(a.activity_id);
                    }
                });
            } else if (sortColumn === "name") {
                sortedData.sort((a, b) => {
                    if (sortOrder === "asc") {
                        return a.activity_name.localeCompare(b.activity_name);
                    } else {
                        return b.activity_name.localeCompare(a.activity_name);
                    }
                });
            } else if (sortColumn === "description") {
                sortedData.sort((a, b) => {
                    if (sortOrder === "asc") {
                        return a.activity_description.localeCompare(b.activity_description);
                    } else {
                        return b.activity_description.localeCompare(a.activity_description);
                    }
                });
            } else if (sortColumn === "duration") {
                sortedData.sort((a, b) => {
                    if (sortOrder === "asc") {
                        return a.activity_duration.localeCompare(b.activity_duration);
                    } else {
                        return b.activity_duration.localeCompare(a.activity_duration);
                    }
                });
            }
            setActivity(sortedData)
        }
        );

    }, [selectedActivityID, sortColumn, sortOrder]);

    useEffect(() => {
        if (selectedActivityID) {
            // console.log(selectedActivityID)
            getActivityByID(selectedActivityID).then((data) => {
                setSelectedActivity(data);
            });
        } else {
            setSelectedActivity({
                activity_id: "",
                activity_name: "",
                activity_description: "",
                activity_duration: "",
            });
        }
    }, [selectedActivityID]);

    function createOrUpdateSelectedActivity() {
        if (selectedActivityID) {
            update(selectedActivity).then((updateActivity) => {
                setSelectedActivityID(null);
                setSelectedActivity({
                    activity_id: "",
                    activity_name: "",
                    activity_description: "",
                    activity_duration: "",
                });
            });
        } else {
            createActivity(selectedActivity).then((createdActivity) => {
                //   setSelectedActivityID(createdActivity.id);
                setSelectedActivity({
                    activity_id: "",
                    activity_name: "",
                    activity_description: "",
                    activity_duration: "",
                });
                getAllActivities().then((data) =>
                    setActivity(data)
                );

            });
        }
    }
    const deleteSelectedActivity = () => {
        if (selectedActivity) {
            deleteActivityById(selectedActivity).then((result) => {
                setSelectedActivityID(null);
                setSelectedActivity({
                    activity_id: "",
                    activity_name: "",
                    activity_description: "",
                    activity_duration: "",
                });
            });
            cancelConfirmHandler()
            handleCloseModal()
        }

    }

    return (
        <div className="flex flex-col min-h-screen " style={{
            backgroundImage: `url('/Blog_1.jpg')`,
            backgroundAttachment: 'fixed'
        }}>
            {showConfirm && <DeleteHandler
                onDelete={deleteSelectedActivity}
                onCancel={cancelConfirmHandler}
            ></DeleteHandler>}
            <Nav></Nav>
            <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center text-zinc-50">Activity CRUD</h1>
            <div className="grid grid-cols-1 xl:grid-cols-1 justify-items-center w-8/12 mx-auto gap-4 pb-4">
                <div className="w-full overflow-auto p-1">
                    <table className="w-full table table-compact shadow-green rounded-[7px]">
                        <thead>
                            {!isModalOpen && (<tr>
                                <th
                                    className="w-[10%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                                    style={{ position: 'static' }}
                                    onClick={() => handleSortClick("id")} >
                                    <span>ID</span>
                                    {sortColumn === 'id' && (
                                        <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th
                                    className="w-[17%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSortClick("name")} >
                                    <span>Name</span>
                                    {sortColumn === 'name' && (
                                        <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th
                                    className="w-[50%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSortClick("description")} >
                                    <span>Description</span>
                                    {sortColumn === 'description' && (
                                        <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th
                                    className="w-[10%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                                    onClick={() => handleSortClick("duration")} >
                                    <span>Duration</span>
                                    {sortColumn === 'duration' && (
                                        <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                                    )}
                                </th>
                                <th className="bg-emerald-100 bg-opacity-70">Status</th>
                            </tr>)}

                        </thead>
                        <tbody>
                            {activity.map((data) => (
                                <tr key={data.activity_id}>
                                    <td className="bg-emerald-100 bg-opacity-70">{data.activity_id}</td>
                                    <td className="bg-emerald-100 bg-opacity-70">{data.activity_name}</td>
                                    <td className="bg-emerald-100 bg-opacity-70">{data.activity_description}</td>
                                    <td className="bg-emerald-100 bg-opacity-70">{data.activity_duration}</td>
                                    <td className="bg-emerald-100 bg-opacity-70">
                                        <button
                                            className="btn btn-xs"
                                            // onClick={() => setSelectedActivityID(data.activity_id)}
                                            onClick={() => handleSelectClick(data.activity_id)}
                                        >
                                            Select
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="rounded  p-2 my-4 w-full" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)' }}>
                    {/* <XMLUpload endpoint="/activity/upload/xml" onUploadSuccess={() => {
                        getAllActivities().then((data) =>
                            setActivity(data));
                    }} /> */}
                </div>

                {isModalOpen && (
                    <div className="w-full fixed inset-0 bg-[#000] 
                    text-3xl m-auto flex justify-evenly items-center z-10"
                        onClick={() => handleCloseModal()}>
                        <div className="rounded p-2 w-8/12"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-lime-500">ID:</span>
                                </label>
                                <input
                                    type="text"
                                    readonly
                                    className="input input-bordered bg-emerald-100"
                                    value={selectedActivity.activity_id}
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-lime-500">activity name:</span>
                                </label>
                                {/* <select
            className="input input-bordered bg-emerald-100 "
            value={selectedActivity.activity_name}
            onChange={(e) => {
                setSelectedActivity({ ...selectedActivity, activity_name: e.target.value });
            }}
        >
            <option disabled selected>Pick one</option>
            <option value="" >-- Select an activity --</option>
            <option value="Yoga">Yoga</option>
            <option value="Pilates">Pilates</option>
            <option value="Abs">Abs</option>
            <option value="HIIT or high-intensity interval training">HIIT or high-intensity interval training</option>
            <option value="Indoor cycling">Indoor cycling</option>
            <option value="Boxing">Boxing</option>
            <option value="Zumba">Zumba</option>
        </select>  */}

                                <input
                                    type="text"
                                    className="input input-bordered bg-emerald-100 "
                                    value={selectedActivity.activity_name}
                                    onChange={(e) =>
                                        setSelectedActivity({ ...selectedActivity, activity_name: e.target.value })
                                    }
                                />

                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-lime-500">activity_description:</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered bg-emerald-100 "
                                    value={selectedActivity.activity_description}
                                    onChange={(e) =>
                                        setSelectedActivity({ ...selectedActivity, activity_description: e.target.value })
                                    }
                                />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-xl text-lime-500">activity_duration:</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered bg-emerald-100 "
                                    value={selectedActivity.activity_duration}
                                    onChange={(e) =>
                                        setSelectedActivity({ ...selectedActivity, activity_duration: e.target.value })
                                    }
                                />
                            </div>

                            <div className="pt-4 flex gap-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setSelectedActivityID(null);
                                        setSelectedActivity({
                                            activity_id: "",
                                            activity_name: "",
                                            activity_description: "",
                                            activity_duration: "",
                                        });
                                    }}
                                >
                                    New
                                </button>
                                <button
                                    className="btn"
                                    // onClick={() => createOrUpdateSelectedActivity()}
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
