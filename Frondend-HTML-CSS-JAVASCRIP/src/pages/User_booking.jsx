import { useEffect, useState } from "react";
import { getActivityByID } from "../api/activities";
import { getClassByID } from "../api/classes";
import { getUserByID } from "../api/user";
import { deleteBookingById, getAllBookingByUserID } from "../api/bookings";
import { getRoomByID } from "../api/rooms";
import { useAuthentication } from "../hooks/authentication";
import Nav from "../components/Nav";
import Footer from "../components/Footer.jsx";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import DeleteHandler from "../components/DeleteHandler";
import ToolBar from "../components/ToolBar";
import homepage_picture from '../../public/Blog_1.jpg'

export default function BookingInfo() {
  const [showConfirm, setShowConfirm] = useState(false);
  const showConfirmHandler = (booking) => {
    setShowConfirm(true);
    setBooking(booking);
  };
  const cancelConfirmHandler = () => {
    setShowConfirm(false);
  };
  const navigate = useNavigate();
  const [user] = useAuthentication();
  const [bookings, setBookings] = useState([]);
  console.log(bookings)
  const [reloadBookings, setReloadBookings] = useState(false);


  useEffect(() => {
    if (user?.user_id) {
      getAllBookingByUserID(user.user_id).then(async (booking) => {
        if (booking === undefined) {
          setBookings([]);
        } else {
          const bookingsWithExtras = await Promise.all(
            booking.map(async (bookingItem) => { // Rename the variable to avoid naming conflict
              // console.log(bookingItem)
              const classData = await getClassByID(bookingItem.booking_class_id);
              const activity = await getActivityByID(
                classData.class_activity_id
              );
              const room = await getRoomByID(classData.class_room_id);
              const trainerUser = await getUserByID(classData.class_trainer_user_id);
              // console.log(classData,room,trainerUser,activity  )
              return Promise.resolve({
                booking: bookingItem,
                classData: classData,
                activity: activity,
                room: room,
                user: trainerUser, // Rename the variable to avoid naming conflict
              });
            })
          );
          setBookings(bookingsWithExtras);
          console.log(bookingsWithExtras)
        }
      });
    }
  }, [user, reloadBookings]);

  
  const [booking, setBooking] = useState({});

  const deleteSelectedBooking = () => {
    // console.log(booking)
    deleteBookingById(booking)
      .then((result) => {
        setReloadBookings((prev) => !prev);
      })
      .catch((error) => {
        // console.error(error);
      });
    cancelConfirmHandler();
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-200" style={{
      backgroundImage: `url(${homepage_picture})`,
      backgroundAttachment: 'fixed'
    }}>
      <Nav />
      <ToolBar></ToolBar>
      {showConfirm && (
        <DeleteHandler
          onDelete={deleteSelectedBooking}
          onCancel={cancelConfirmHandler}
        ></DeleteHandler>
      )}
      <h1 className="text-3xl lg:text-5xl font-bold my-6 text-center text-zinc-50">
        Your Booking
      </h1>
      {bookings.length === 0 && (
        <div className="grow ">
          <div className="text-4xl text-center text-amber-500">
            Please proceed to class page to book classes
          </div>
          <Spinner></Spinner>
        </div>
      )}
      {bookings.map((booking) => (
        <div
          key={booking.booking_id}
          className="grow container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 w-8/12"
        >
          <div className="font-bold text-lg text-zinc-50">
            <span className="mr-3">
              {" "}
              Time:
              {/* {booking.booking.booking_created_time} */}
              {/* {new Date(booking.booking.booking_created_time).toLocaleTimeString('en-AU', { hour: 'numeric', minute: 'numeric' })} */}
              {new Date(booking.booking.booking_created_time).toLocaleTimeString('en-AU', { hour: 'numeric', minute: 'numeric', second: 'numeric' })}

            </span>
            <span> Date:
              {/* {booking.booking.booking_created_date} */}
              {/* {new Date(booking.booking.booking_created_date).toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })} */}
              {new Date(booking.booking.booking_created_date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}

            </span>
          </div>
          <div></div>
          <div className="rounded p-2" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', backgroundColor: 'rgba(156, 158, 161, 0.7)' }}>
            <h2 className="text-center text-4xl  font-bold">
              Activity
            </h2>
            {booking.activity == null ? (
              <Spinner />
            ) : (
              <div className="stats bg-transparent  stats-vertical w-full" 	>
                <div className="stat">
                  <div className="stat-title">Activity Name</div>
                  <div className="stat-value">
                    {booking.activity.activity_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Description</div>
                  <div className="stat-value" style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }} >
                    {booking.activity.activity_description}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Duration</div>
                  <div className="stat-value">
                    {booking.activity.activity_duration}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded p-2" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', backgroundColor: 'rgba(156, 158, 161, 0.7)' }}>
            <h2 className="text-center text-4xl  font-bold">
              Location && Time
            </h2>
            {(booking.classData && booking.room) == null ? (
              <Spinner />
            ) : (
              <div className="stats bg-transparent  stats-vertical w-full" 	>
                <div className="stat">
                  <div className="stat-title">ClassDate</div>
                  <div className="stat-value whitespace-normal">
                    {/* {booking.classData.class_date} */}
                    {new Date(booking.classData.class_date).toLocaleDateString('en-AU', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">ClassTime</div>
                  <div className="stat-value whitespace-normal">
                    {booking.classData.class_time}
                    {/* {new Date(booking.classData.class_time).toLocaleTimeString('en-AU', { hour: 'numeric', minute: 'numeric' })} */}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Location </div>
                  <div className="stat-value">
                    {booking.room.room_location}&nbsp;&nbsp; R
                    {booking.room.room_number}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded p-2" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', backgroundColor: 'rgba(156, 158, 161, 0.7)' }}>
            <h2 className="text-center text-4xl  font-bold ">
              User
            </h2>
            {user == null ? (
              <Spinner />
            ) : (
              <div className="stats bg-transparent  stats-vertical w-full" 	>
                <div className="stat">
                  <div className="stat-title">First Name</div>
                  <div className="stat-value whitespace-normal">
                    {user.user_first_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Last Name</div>
                  <div className="stat-value whitespace-normal">
                    {user.user_last_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Phone</div>
                  <div className="stat-value whitespace-normal">
                    {user.user_phone}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="rounded p-2" style={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', backgroundColor: 'rgba(156, 158, 161, 0.7)' }}>
            <h2 className="text-center text-4xl  font-bold">
              Trainer
            </h2>
            {booking.user == null ? (
              <Spinner />
            ) : (
              <div className="stats bg-transparent  stats-vertical w-full" 	>
                <div className="stat">
                  <div className="stat-title">First Name</div>
                  <div className="stat-value whitespace-normal">
                    {booking.user.user_first_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Last Name</div>
                  <div className="stat-value whitespace-normal">
                    {booking.user.user_last_name}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title">Phone</div>
                  <div className="stat-value whitespace-normal">
                    {booking.user.user_phone}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-2 flex">
            <button className="btn btn-primary mr-2 mb-6">
              <span className="hidden md:inline">Proceed to pay</span>
              <span className="inline md:hidden">Pay</span>
            </button>
            <button
              className="btn btn-secondary mr-2"
              onClick={() => navigate("/class_booking")}
            >
              Back
            </button>
            <button
              className="btn btn-warning mr-2"
              // onClick={() => deleteSelectedBooking(booking.booking.booking_id)}
              // onClick={showConfirmHandler()}
              onClick={() => showConfirmHandler(booking.booking)}
            >
              Delete
            </button>
            <label className="label">
              {/* <span className="label-text-alt">{statusMessage}</span> */}
            </label>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
