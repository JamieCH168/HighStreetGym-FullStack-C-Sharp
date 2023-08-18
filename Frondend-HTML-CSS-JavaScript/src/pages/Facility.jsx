import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getAllClasses, } from "../api/classes";
import { getAllActivities, } from "../api/activities";
import Nav from "../components/Nav";
import Footer from '../components/Footer.jsx';
import ToolBar from '../components/ToolBar'

export default function User_Booking() {
    const navigate = useNavigate()
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        getAllActivities().then((data) =>
            setActivity(data)
        );
    }, []);

    const [classData, setClassData] = useState([]);
    useEffect(() => {
        getAllClasses().then((data) =>
            // console.log(class),
            setClassData(data));
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-blue-200"
            style={{
                backgroundImage: `url('/Blog_1.jpg')`,
                backgroundAttachment: 'fixed'
            }}
        >
            <Nav></Nav>
            <ToolBar></ToolBar>
            <h2 className="text-center text-4xl  font-bold my-8 text-zinc-50">Facility</h2>
            <div className="grow w-8/12 mb-8 mx-auto">
                <div className='flex justify-center flex-wrap gap-8 '>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl'
                        style={{
                            boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                        }}
                    >
                        <img
                            src={"/facility_1.jpg"}
                            alt="Badminton"
                            className='h-[550px] w-[550px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'

                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >
                            <span className="px-4 py-6">
                                <button>Badminton</button>
                            </span>
                        </span>
                    </figure>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl' style={{
                       boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                    }}>
                        <img
                            src={"/facility_2.jpg"}
                            alt="boxing"
                            className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'
                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >
                            <button>Boxing</button>
                        </span>
                    </figure>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl' style={{
                       boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                    }}>
                        <img
                            src={"/facility_3.jpg"}
                            alt="roller"
                            className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'
                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >    <button>Roller  </button>
                        </span>
                    </figure>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl' style={{
                       boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                    }}>
                        <img
                            src={"/facility_4.jpg"}
                            alt="gloves"
                            className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'
                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >    <button>Gloves  </button></span>
                    </figure>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl' style={{
                        boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                    }}>
                        <img
                            src={"/facility_5.jpg"}
                            alt="yoga"
                            className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'
                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >    <button>Yoga  </button></span>
                    </figure>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl' style={{
                       boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                    }}>
                        <img
                            src={"/facility_6.jpg"}
                            alt="abs"
                            className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'
                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >     <button>ABS </button></span>
                    </figure>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl' style={{
                        boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                    }}>
                        <img
                            src={"/facility_7.jpg"}
                            alt="Weight"
                            className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'
                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >    <button>Weight  </button></span>
                    </figure>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl' style={{
                       boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                    }}>
                        <img
                            src={"/facility_8.jpg"}
                            alt="deep squat
                        "
                            className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'
                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >     <button>Deep Squat </button>
                        </span>
                    </figure>
                    <figure className='relative group h-[400px] w-[400px] overflow-hidden rounded-lg drop-shadow-xl' style={{
                        boxShadow: '5px 7px  rgba(255, 255, 255, 0.6)'
                    }}>
                        <img
                            src={"/facility_9.jpg"}
                            alt="treadmill
                        "
                            className='h-[400px] w-[400px] group-hover:scale-[1.7] group-hover:rotate-[25deg]   group-hover:duration-500 group-hover:ease-linear  group-hover:opacity-70'
                        />
                        <span className='absolute inset-0 text-center h-[400px] leading-[400px] text-[0px] hover:text-[40px] text-zinc-50
                    hover:duration-500 hover:ease-linear'
                        >     <button>Treadmill </button>
                        </span>
                    </figure>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
