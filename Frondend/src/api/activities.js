import { API_URL } from "./api"

export async function createActivity(data) {
    data.activity_id = 0
    const  jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Activity",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(data)
        }
    )
    const createActivityResult = await response.json()
    return createActivityResult
}

export async function getAllActivities() {
    const jwtToken = localStorage.getItem("jwtToken")

    const response = await fetch(
        API_URL + "/Activity",
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
        }
    )

    const APIResponseObject = await response.json()
    return APIResponseObject.activities
}

export async function getActivityByID(activityID) {
    const  jwtToken = localStorage.getItem("jwtToken")
    activityID = parseInt(activityID)
    const response = await fetch(
        API_URL + "/Activity/" + activityID,

        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
        }
    )

    const APIResponseObject = await response.json()
    return APIResponseObject.activity

}

export async function update(data) {
    const  jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Activity",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(data)
        }
    )

    const patchActivityResult = await response.json()
    return patchActivityResult
}


export async function deleteActivityById(data) {
    const activityId= data.activity_id;
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(API_URL + "/Activity/" + activityId, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + jwtToken
        }
    });

    return response.ok; 
}
