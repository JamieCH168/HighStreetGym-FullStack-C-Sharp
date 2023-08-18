import { API_URL } from "./api"

export async function createBooking(data) {
    data.booking_id = 0
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Booking",
        {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(data)
        }
    )
    const createBookingResult = await response.json()
    return createBookingResult
}

export async function getAllBookings() {
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Booking",
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

export async function getBookingByID(bookingID) {
    // console.log(bookingID)
    bookingID = parseInt(bookingID)
    const  jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Booking/" + bookingID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
        }
    )

    const APIResponseObject = await response.json()

    const dateObject = new Date(APIResponseObject.booking_created_date);
    const formattedDate = dateObject.toISOString().split('T')[0];
    const timeObject = new Date(APIResponseObject.booking_created_time
        );
    const formattedTime = timeObject.toTimeString().split(' ')[0];
    APIResponseObject.booking_created_date = formattedDate;
    APIResponseObject.booking_created_time
    = formattedTime;


    return APIResponseObject
}


export async function getBookingByClassID(classID) {
    classID = parseInt(classID)
    const  jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Booking/class/" + classID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
        }
    )

    const APIResponseObject = await response.json()
    return APIResponseObject.booking
}

export async function getAllBookingByUserID(bookingID) {
    const  jwtToken = localStorage.getItem("jwtToken")
    // console.log(bookingID)
    const response = await fetch(
        API_URL + "/Booking/user/" + bookingID,
        {
            method: "GET",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
        }
    )

    const APIResponseObject = await response.json()
    // console.log(APIResponseObject.bookings);
    return APIResponseObject.bookings
}


export async function update(data) {
    // console.log(data)
    const jwtToken = localStorage.getItem("jwtToken")
    const response = await fetch(
        API_URL + "/Booking",
        {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
                'Authorization': 'Bearer ' + jwtToken
            },
            body: JSON.stringify(data)
        }
    )

    const patchBookingsResult = await response.json()
    return patchBookingsResult
}


export async function deleteBookingById(data) {
    const bookingId = data.booking_id
    const  jwtToken = localStorage.getItem("jwtToken");
    const response = await fetch(API_URL + "/Booking/" + bookingId, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            'Authorization': 'Bearer ' + jwtToken
        }
    });

    return response.ok; 
}
