import { API_URL } from "./api"

export async function createBlog_post(data) {
    const  jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/BlogPost",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken

            },
            body: JSON.stringify(data)
        }
    )
    const createBlog_postResult = await response.json()
    return createBlog_postResult
}

export async function getAllBlog_posts() {
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/BlogPost",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken

            },
        }
    )
    const APIResponseObject = await response.json()
    return APIResponseObject
}

export async function getBlog_postByID(blog_postID) {
    blog_postID = parseInt(blog_postID)
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/BlogPost/" + blog_postID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
        }
    )

    const APIResponseObject = await response.json()

    const dateObject = new Date(APIResponseObject.post_date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    const timeObject = new Date(APIResponseObject.post_time);
    const formattedTime = timeObject.toTimeString().split(' ')[0];
    APIResponseObject.post_date = formattedDate;
    APIResponseObject.post_time = formattedTime;

    return APIResponseObject
}


export async function update(data) {
    const  jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/BlogPost",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken

            },
            body: JSON.stringify(data)
        }
    )

    const patchBlog_postsResult = await response.json()
    return patchBlog_postsResult
}


export async function deleteBlog_postById(data) {
    const blogPostId = data.post_id;
    const  jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(API_URL + "/BlogPost/" + blogPostId, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + jwtToken
        }
    });

    return response.ok;
}
