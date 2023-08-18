import { API_URL } from "./api"


export async function createClass(data) {
    data.class_id = 0;
    data.class_activity_id = parseInt(data.class_activity_id);
    data.class_room_id = parseInt(data.class_room_id);
    data.class_trainer_user_id = parseInt(data.class_trainer_user_id);
    const jwtToken = localStorage.getItem("jwtToken")

    const response = await fetch(
        API_URL + "/Class",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(data)
        }
    )
    const createClassResult = await response.json()
    return createClassResult
}

export async function getAllClasses() {
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Class",
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

export async function getClassByID(classID) {
    const jwtToken = localStorage.getItem("jwtToken")
    classID = parseInt(classID)

    const response = await fetch(
        API_URL + "/Class/" + classID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
        }
    )
    const APIResponseObject = await response.json()

    const dateObject = new Date(APIResponseObject.class_date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    const timeObject = new Date(APIResponseObject.class_time);
    const formattedTime = timeObject.toTimeString().split(' ')[0];
    APIResponseObject.class_date = formattedDate;
    APIResponseObject.class_time = formattedTime;
    // console.log(APIResponseObject)
    return APIResponseObject
}

export async function getClassByActivityID(ActivityID) {
    ActivityID = parseInt(ActivityID)
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Class/activity/" + ActivityID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
        }
    )

    const APIResponseObject = await response.json();

    const dateObject = new Date(APIResponseObject.class_date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    const timeObject = new Date(APIResponseObject.class_time);
    const formattedTime = timeObject.toTimeString().split(' ')[0];
    APIResponseObject.class_date = formattedDate;
    APIResponseObject.class_time = formattedTime;

    // console.log(APIResponseObject)
    return APIResponseObject
}


export async function update(data) {
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Class",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(data)
        }
    )

    const patchClassesResult = await response.json()
    return patchClassesResult
}


export async function deleteClassById(data) {
    const classId = data.class_id
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(API_URL + "/Class/" + classId, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + jwtToken
        }
    });

    return response.ok;
}
