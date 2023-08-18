import { API_URL } from "./api"

export async function login(email, password) {
    const response = await fetch(
        API_URL + "/User/login",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                user_email: email,
                user_password: password,
            }),
        },
    )

    const APIResponseObject = await response.json()
    console.log(APIResponseObject)

    if (response.ok && APIResponseObject.jwtToken) {
        localStorage.setItem("jwtToken", APIResponseObject.jwtToken);
    }

    return APIResponseObject
}

export async function logout(jwtToken) {
    const response = await fetch(
        API_URL + "/User/logout",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify({ jwtToken })
        }
    );

    return await response.json();
}

export async function getAllUsers() {
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(
        API_URL + "/User",
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

export async function getUserByID(userID) {
    const jwtToken = localStorage.getItem("jwtToken")
    // console.log(authenticationKey)
    userID = parseInt(userID)
    const response = await fetch(
        API_URL + "/User/" + userID,
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


export async function update(user) {
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/User",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(user)
        }
    )

    const patchUserResult = await response.json()
    return patchUserResult
}

export async function registerUser(user) {
    user.user_id = 0
    const response = await fetch(
        API_URL + "/User",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify(user)
        }
    )
    const patchUserResult = await response.json()
    // console.log(patchUserResult)
    return patchUserResult
}


export async function deleteUserById(data) {
    const userId = data.user_id
    const jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(API_URL + "/User/" + userId, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + jwtToken
        }
    });

    return response.ok;
}
