import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer.jsx";
// import { useLocation } from "react-router-dom";
import {
  createBlog_post,
  getBlog_postByID,
  update,
  deleteBlog_postById,
} from "../api/blog_post";
import { useAuthentication } from "../hooks/authentication";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export default function postCRUD() {
  const navigate = useNavigate()
  const { post_id } = useParams()
  const [refresh, setRefresh] = useState(false);
  // const { user } = props.location.state.user;
  // console.log(user)
  // const location = useLocation();
  // const post = location.state.post;
  // console.log(post)
  const [user] = useAuthentication()
  //  console.log(user)
  const [selectedPostID, setSelectedPostID] = useState(post_id);

  const [selectedPost, setSelectedPost] = useState({
    post_id: "",
    post_date: "",
    post_time: "",
    post_user_id: "",
    post_title: "",
    post_content: ""
  });

  useEffect(() => {
    if (selectedPostID) {
      getBlog_postByID(selectedPostID).then((data) => {
        setSelectedPost(data);
      });
    }
    else {
      setSelectedPost({
        post_id: "",
        post_date: "",
        post_time: "",
        post_user_id: "",
        post_title: "",
        post_content: ""
      });
    }
  }, []);

  function createOrUpdateSelectedPost() {
    if (selectedPostID) {
      update({
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
      // console.log({
      //   ...selectedPost,post_user_id:user.user_id,
      // })
      createBlog_post({
        ...selectedPost, post_user_id: user.user_id.toString(),
      }).then((createdPost) => {
        setSelectedPostID(createdPost.post_id);
        setSelectedPost({
          post_id: "",
          post_date: "",
          post_time: "",
          post_user_id: "",
          post_title: "",
          post_content: ""
        });

      });
    }

  }


  function deleteSelectedPost() {
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
  }

  // function autoResizeTextArea() {
  //   const textarea = document.getElementById('myTextArea');
  //   textarea.style.height = 'auto';
  //   textarea.style.height = `${textarea.scrollHeight}px`;
  // }

  return (
    <div className="flex flex-col min-h-screen" style={{
      backgroundImage: `url('/Blog_1.jpg')`,
      backgroundAttachment: 'fixed'
    }}>
      <Nav></Nav>
      {post_id ? <h1 className="text-5xl font-bold my-6 text-center">Post Edit</h1> : <h1 className="text-zinc-50 text-5xl font-bold my-6 text-center">New Post</h1>
      }
      {/* <div className="grow grid grid-cols-1  justify-items-center mb-6"> */}
      <div className="grow flex flex-col mb-6 items-center ">
        <div className="w-8/12 rounded  p-2 bg-emerald-100 bg-opacity-70 shadow-green "
        >
          <div className="form-control">
            <label className="label">
              <span className="label-text">post_date:</span>
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
              <span className="label-text">post_time:</span>
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

          <div className="form-control">
            {/* <label className="label">
              <span className="label-text">post_user_id:</span>
            </label> */}
            <input
              type="text"
              hidden
              // readonly
              // disabled
              className="input input-bordered bg-emerald-100"
              // value={user? user.user_id:selectedPost.post_user_id}
              value={selectedPost.post_user_id}
              onChange={(e) => {
                setSelectedPost({
                  ...selectedPost,
                  post_user_id: e.target.value,
                });
              }}
            />
          </div>


          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">post_title:</span>
            </label>
            <select
              className="input input-bordered bg-emerald-100"
              value={selectedPost.post_title}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost, post_title: e.target.value,
                })
              }
            >
              <option disabled selected>Pick one</option>
              <option >Yoga</option>
              <option value="Pilates">Pilates</option>
              <option value="Abs">Abs</option>
              <option value="HIIT or high-intensity interval training">HIIT or high-intensity interval training</option>
              <option value="Indoor cycling">Indoor cycling</option>
              <option value="Boxing">Boxing</option>
              <option value="Zumba">Zumba</option>
            </select>
          </div> */}

          <div className="form-control">
            <label className="label">
              <span className="label-text">post_title:</span>
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
              <option >Pick one</option>  
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
              <span className="label-text">post_content:</span>
            </label>
            <textarea
              id="myTextArea"
              rows="10"
              oninput="autoResizeTextArea()"
              className="input input-bordered bg-emerald-100"
              value={selectedPost.post_content}
              onChange={(e) =>
                setSelectedPost({
                  ...selectedPost, post_content: e.target.value,
                })
              }
            ></textarea>
          </div>

        </div>
        <div className="w-8/12  pt-2 flex gap-2 ">
          <button
            className="btn btn-warning"
            onClick={() =>
              navigate("/blog_post_page")}
          >
            Back
          </button>
          <button
            disabled
            className="btn btn-primary"
            onClick={() => {
              setSelectedPostID(null);
              setSelectedPost({
                post_id: "",
                post_date: "",
                post_time: "",
                // post_user_id:selectedPost.post_user_id,
                // post_user_id:user.user_id,
                post_user_id: "",
                post_title: "",
                post_content: ""
              });
            }}
          >
            New
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              createOrUpdateSelectedPost(),
                navigate("/blog_post_page")
            }}

          >
            Save
          </button>
          <button
            disabled
            className="btn btn-secondary"
            onClick={() => deleteSelectedPost()}
          >
            Delete
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
