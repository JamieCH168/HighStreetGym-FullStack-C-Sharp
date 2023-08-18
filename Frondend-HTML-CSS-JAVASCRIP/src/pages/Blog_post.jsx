import { useEffect, useState } from "react";
import DeleteHandler from "../components/DeleteHandler"
import {
  createBlog_post,
  getAllBlog_posts,
  getBlog_postByID,
  update,
  deleteBlog_postById,
} from "../api/blog_post";
import { getAllUsers } from "../api/user";
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';


export default function postCRUD() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [post, setPost] = useState([]);
  const [selectedPostID, setSelectedPostID] = useState(null);
  const [selectedPost, setSelectedPost] = useState({
    post_id: "",
    post_date: "",
    post_time: "",
    post_user_id: "",
    post_title: "",
    post_content: ""
  });
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSelectClick = (data) => {
    setSelectedPostID(data)
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    createOrUpdateSelectedPost()
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
    getAllBlog_posts().then(data => {
      let sortedData = [...data];

      if (sortColumn === "id") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.post_id) - parseInt(b.post_id);
          } else {
            return parseInt(b.post_id) - parseInt(a.post_id);
          }
        });
      } else if (sortColumn === "date") {
        sortedData.sort((a, b) => {
          const dateA = new Date(a.post_date.replace(/-/g, "/"));
          const dateB = new Date(b.post_date.replace(/-/g, "/"));

          if (sortOrder === "asc") {
            return dateA - dateB;
          } else {
            return dateB - dateA;
          }
        });
      } else if (sortColumn === "time") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.post_time.localeCompare(b.post_time);
          } else {
            return b.post_time.localeCompare(a.post_time);
          }
        });
      } else if (sortColumn === "userId") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return parseInt(a.post_user_id) - parseInt(b.post_user_id);
          } else {
            return parseInt(b.post_user_id) - parseInt(a.post_user_id);
          }
        });
      } else if (sortColumn === "title") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.post_title.localeCompare(b.post_title);
          } else {
            return b.post_title.localeCompare(a.post_title);
          }
        });
      } else if (sortColumn === "content") {
        sortedData.sort((a, b) => {
          if (sortOrder === "asc") {
            return a.post_content.localeCompare(b.post_content);
          } else {
            return b.post_content.localeCompare(a.post_content);
          }
        });
      }
      setPost(sortedData)
    }
    );
  }, [selectedPostID, sortColumn, sortOrder]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    getAllUsers().then((data) => {
      const filteredData = data.filter((user) => user.user_access_role === 'member');
      setUser(filteredData);
      // console.log(filteredData);
    })
  }, []);
  useEffect(() => {

    if (selectedPostID) {
      getBlog_postByID(selectedPostID).then((data) => {
        setSelectedPost(data);
      });
    } else {
      setSelectedPost({
        post_id: "",
        post_date: "",
        post_time: "",
        post_user_id: "",
        post_title: "",
        post_content: ""
      });
    }
  }, [selectedPostID]);

  function createOrUpdateSelectedPost() {
    if (selectedPostID) {
      // console.log(selectedPost)
      update(
        {
          ...selectedPost, post_user_id: selectedPost.post_user_id.toString()
        }).then((updatePost) => {
          setSelectedPostID(null);
          setSelectedPost({
            post_id: "",
            post_date: "",
            post_time: "",
            post_user_id: "",
            post_title: "",
            post_content: ""
          });
        });
    } else {
      // console.log(selectedPost)
      createBlog_post(
        selectedPost)
        // {
        //   ...selectedPost, post_user_id: Number(selectedPost.post_user_id)
        // }
        .then((createdPost) => {
          // setSelectedPostID(createdPost);
          setSelectedPost({
            post_id: "",
            post_date: "",
            post_time: "",
            post_user_id: "",
            post_title: "",
            post_content: ""
          });
          getAllBlog_posts().then(
            (data) => setPost(data)
          );
        });
    }
  }
  const deleteSelectedPost = () => {
    if (selectedPost) {
      deleteBlog_postById(selectedPost).then((result) => {
        setSelectedPostID(null);
        setSelectedPost({
          post_id: "",
          post_date: "",
          post_time: "",
          post_user_id: "",
          post_title: "",
          post_content: ""
        });
      });
      cancelConfirmHandler()
      handleCloseModal()
    }
  }

  return (
    <div className="flex flex-col min-h-screen" style={{
      backgroundImage: `url('/Blog_1.jpg')`,
      backgroundAttachment: 'fixed',
    }}>
      {showConfirm && <DeleteHandler
        onDelete={deleteSelectedPost}
        onCancel={cancelConfirmHandler}
      ></DeleteHandler>}
      <Nav></Nav>
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center text-zinc-50">Post CRUD</h1>
      <div className="grid grid-cols-1 xl:grid-cols-1  justify-items-center w-8/12 mx-auto gap-4 mb-4 pb-4">
        <div className="overflow-auto w-full p-1" >
          <table className="table table-compact text-center w-full shadow-green rounded-[7px]">
            <thead>
              {!isModalOpen && (
                <tr>
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
                    className="w-[10%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("date")} >
                    <span>Date</span>
                    {sortColumn === 'date' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[10%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("time")} >
                    <span>Time</span>
                    {sortColumn === 'time' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[10%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("userId")} >
                    <span>user Id</span>
                    {sortColumn === 'userId' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className="w-[10%] bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    onClick={() => handleSortClick("title")} >
                    <span>Title</span>
                    {sortColumn === 'title' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th
                    className=" bg-emerald-100 bg-opacity-70 cursor-pointer hover:bg-blue-300"
                    style={{
                      wordWrap: 'break-word',
                      maxWidth: '500px'
                    }
                    }
                    onClick={() => handleSortClick("content")} >
                    <span>Content</span>
                    {sortColumn === 'content' && (
                      <span className="ml-2">{sortOrder === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                  <th className="bg-emerald-100 bg-opacity-70">Status</th>
                </tr>
              )}
            </thead>
            <tbody>
              {post.map((data) => (
                <tr key={data.post_id}>
                  <td className="bg-emerald-100 bg-opacity-70">{data.post_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.post_date}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.post_time}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.post_user_id}</td>
                  <td className="bg-emerald-100 bg-opacity-70">{data.post_title}</td>
                  <td

                    style={{
                      backgroundColor: 'rgb(209 250 229)',
                      opacity: '0.7',
                      overflowWrap: 'break-word',
                      whiteSpace: 'normal',
                      maxWidth: '400px',
                      textAlign: 'left',

                    }
                    }

                  >{data.post_content}</td>

                  <td className="bg-emerald-100 bg-opacity-70">
                    <button
                      className="btn btn-xs"
                      // onClick={() => setSelectedPostID(data.post_id)}
                      onClick={() => {
                        handleSelectClick(data.post_id);
                        // console.log(data.post_id)
                      }
                      }
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
          <div className="w-full rounded  p-2 
          fixed inset-0 bg-[#000] 
          text-3xl m-auto flex justify-evenly items-center z-10"
            onClick={() => handleCloseModal()}>

            <div className="w-8/12" onClick={(e) => e.stopPropagation()}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">ID:</span>
                </label>
                <input
                  type="text"
                  readonly
                  className="input input-bordered bg-emerald-100"
                  value={selectedPost.post_id}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">post_date:</span>
                </label>
                <input
                  type="text"
                  readonly
                  disabled
                  className="input input-bordered bg-emerald-100"
                  value={selectedPost.post_date}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost, post_date: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">post_time:</span>
                </label>
                <input
                  type="text"
                  readonly
                  disabled
                  className="input input-bordered bg-emerald-100"
                  value={selectedPost.post_time}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost, post_time: e.target.value,
                    })
                  }
                />
              </div>

              {/* <div className="form-control">
  <label className="label">
    <span className="label-text text-xl text-lime-500">post_user_id:</span>
  </label>
  <input
    type="text"
    className="input input-bordered bg-emerald-100"
    value={selectedPost.post_user_id}
    onChange={(e) => {
      setSelectedPost({
        ...selectedPost,
        post_user_id: e.target.value,
      });
    }}
  />
</div> */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">post_user_id:</span>
                </label>
                <select
                  className="input input-bordered bg-emerald-100"
                  value={selectedPost.post_user_id}
                  onChange={(e) => {
                    setSelectedPost({
                      ...selectedPost,
                      post_user_id: e.target.value,
                    });
                  }}
                >
                  {/* <option disabled selected>Pick one</option> */}
                  <option value="" >-- Select a user ID --</option>
                  {user.map(option => (
                    <option key={option.user_id} value={option.user_id}>{option.user_id}</option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">post_title:</span>
                </label>
                {/* <select
    className="input input-bordered bg-emerald-100"
    value={selectedPost.post_title}
    onChange={(e) =>
      setSelectedPost({
        ...selectedPost, post_title: e.target.value,
      })
    }
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
  </select> */}

                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedPost.post_title}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost, post_title: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-lime-500">post_content:</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered bg-emerald-100"
                  value={selectedPost.post_content}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost, post_content: e.target.value,
                    })
                  }
                />
                {/* <textarea
                 className="bg-emerald-100"
                  value={selectedPost.post_content}
                  onChange={(e) =>
                    setSelectedPost({
                      ...selectedPost, post_content: e.target.value,
                    })
                  }
                  style={{
                    backgroundColor: 'var(--tw-bg-emerald-100)',
                    overflowWrap: 'break-word',
                    whiteSpace: 'normal',
                    maxWidth: '1400px',
                    textAlign: 'left'
                  }}
                /> */}
              </div>
              <div className="pt-4 flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectedPostID(null);
                    setSelectedPost({
                      post_id: "",
                      post_date: "",
                      post_time: "",
                      post_user_id: "",
                      post_title: "",
                      post_content: ""
                    });
                  }}
                >
                  New
                </button>
                <button
                  className="btn"
                  // onClick={() => createOrUpdateSelectedPost()}
                  onClick={handleSaveClick}
                >
                  Save
                </button>
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
