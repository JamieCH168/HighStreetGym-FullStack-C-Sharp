import React, { useEffect, useState,useContext } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import Blog_1 from "../../public/Blog_1.jpg"



function Dashboard() {

  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/blog_post_page');
};

  return <div className="flex flex-col min-h-screen">
 <Nav></Nav>

    <div className="hero grow bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={Blog_1} className="max-w-sm rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Gym News!</h1>
          <p className="py-6">Introduction:
            Going to the gym can be a challenging task, especially when you are not motivated. However, it is crucial to stay motivated if you want to achieve your fitness goals. In this blog post, we will discuss some effective tips on how to stay motivated at the gym.</p>
          <button className="btn btn-primary"
           onClick={handleButtonClick}
          >Tap here to see more gym blogs</button>
        </div>
      </div>
    </div>

  <Footer/>

  </div>
}

export default Dashboard