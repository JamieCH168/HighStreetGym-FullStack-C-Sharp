import { API_URL } from "./api"

export async function createRoom(data) {
    data.room_id = 0
    const  jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Room",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(data)
        }
    )
    const createRoomResult = await response.json()
    return createRoomResult
}

export async function getAllRooms() {
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Room",
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

export async function getRoomByID(roomID) {
    roomID = parseInt(roomID)
    const  jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Room/" + roomID,
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


export async function update(data) {

    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Room",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(data)
        }
    )

    const patchRoomsResult = await response.json()
    return patchRoomsResult
}


export async function deleteRoomById(data) {
    const roomId = data.room_id
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(API_URL + "/Room/" + roomId, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + jwtToken
        }
    });

    return response.ok;
}
