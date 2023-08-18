import { createBrowserRouter } from "react-router-dom"
import { RestrictedRoute } from "./components/RestrictedRoute"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Facility from "./pages/Facility"
import ContactUs from "./pages/ContactUs"
import Classes from "./pages/Classes"
import Bookings from "./pages/Bookings"
import Rooms from './pages/Rooms'
import Activities from './pages/Activities'
import Blog_post from './pages/Blog_post'
import User from "./pages/User"
import JoinUs from "./pages/JoinUs"
// import Class_CRUD from "./pages/Class_CRUD"
import Class_booking from "./pages/Class_booking"
import Booking_info from './pages/Booking_info'
import User_Booking from "./pages/User_booking"
import Blog_post_page from './pages/Blog_post_page'
import User_edit_post from './pages/User_edit_post'


const router = createBrowserRouter([

    {
        path: "/class",
        element:
            <RestrictedRoute allowedRoles={["admin", "trainer"]}>
                <Classes />
            </RestrictedRoute>
    },
    {
        path: "/booking",
        element:
            <RestrictedRoute allowedRoles={["admin", "trainer"]}>
                <Bookings />
            </RestrictedRoute>
    },

    {
        path: "/room",
        element:
            <RestrictedRoute allowedRoles={["admin", "trainer"]}>
                <Rooms />
            </RestrictedRoute>
    },
    {
        path: "/activity",
        element:
            <RestrictedRoute allowedRoles={["admin", "trainer"]}>
                <Activities />
            </RestrictedRoute>
    },
    {
        path: "/blog_post",
        element:
            <RestrictedRoute allowedRoles={["admin", "trainer"]}>
                <Blog_post />
            </RestrictedRoute>
    },

    {
        path: "/user",
        element:
            <RestrictedRoute allowedRoles={["admin"]}>
                <User />
            </RestrictedRoute>
    },

    {
        path: "/",
        element: <Homepage />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/facility",
        element: <Facility />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },

    {
        path: "/contact",
        element: <ContactUs />
    },

    {
        path: "/join",
        element: <JoinUs />
    },
    // {
    //     path: "/class_crud",
    //     element:
    //         <RestrictedRoute allowedRoles={["admin", "trainer"]}>
    //             <Class_CRUD />
    //         </RestrictedRoute>
    // },
    {
        path: "/class_booking",
        element:

            <Class_booking />

    },
    {
        path: "/booking/:activity_id",
        element: <Booking_info />
    },

    {
        path: "/user_booking",
        element:
            <RestrictedRoute allowedRoles={["admin", "trainer", "member"]}>
                <User_Booking />
            </RestrictedRoute>
    },
    {
        path: "/blog_post_page",
        element: <Blog_post_page />
    },
    {
        path: "/blog_post_page/user_edit_post/:post_id?",
        element: <User_edit_post />
    },

])

export default router