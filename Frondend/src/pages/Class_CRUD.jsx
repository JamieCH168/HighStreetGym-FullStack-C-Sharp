import React from 'react'
import Bookings from '../components/Bookings'
import Classes from '../components/Classes'
import Activities from './Activities'
import Rooms from './Rooms'
import Blog_post from '../components/Blog_post';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';
import ToolBar from '../components/ToolBar'

export default function Class_CRUD() {
    return (
        <div>
            <Nav></Nav>
            <ToolBar></ToolBar>
            <Bookings></Bookings>
            <Classes></Classes>
            <Activities></Activities>
            <Rooms></Rooms>
            <Blog_post></Blog_post>
            <Footer></Footer>
        </div>
    )
}
