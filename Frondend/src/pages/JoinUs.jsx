import React from 'react'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import homepage_picture from '../../public/Blog_1.jpg'

export default function JoinUs() {
    return (
        <div className='flex flex-col min-h-screen ' style={{ backgroundImage: `url(${homepage_picture})` }}>

            <Nav></Nav>

            <h1 className='text-center text-6xl my-10 text-zinc-50'> Join Us</h1>

            <div className="grow flex text-4xl gap-4 justify-around flex-wrap m-10" >

                <ul className='flex flex-col justify-around gap-5  p-10 m-10 border-solid border-4 border-indigo-400 rounded-3xl shadow-offset-x-20 shadow-offset-y-20 shadow-color-red shadow-offset-x-5 shadow-offset-y-5 shadow-color-black shadow-2xl' style={{ backgroundColor: 'rgb(119, 163, 70, 0.4)' }} >
                    <li>3 Month Contract</li>
                    <li>$129</li>
                    <li>Unlimited 24/7 Access</li>
                    <li>Includes all classes</li>
                    <li>Free joining fee</li>
                    <li className="text-rose-500 text-center text-5xl " >Get Offer</li>
                </ul>
                <ul className='flex flex-col justify-around gap-5  p-10 m-10 border-solid border-4 border-indigo-400 rounded-3xl shadow-2xl' style={{ backgroundColor: '#8a46a3',opacity:'0.8'}}>
                    <li>6 Month Contract</li>
                    <li>$200</li>
                    <li>Unlimited 24/7 Access</li>
                    <li>Includes all classes</li>
                    <li>Free joining fee</li>
                    <li className="text-rose-500 text-center text-5xl ">Get Offer</li>
                </ul>
                <ul className='flex flex-col justify-around gap-5  p-10 m-10 border-solid border-4 border-indigo-400 rounded-3xl shadow-2xl' style={{ backgroundColor: 'rgba(156, 158, 161, 0.7)' }}>
                    <li>12 Month Contract</li>
                    <li>$300</li>
                    <li>Unlimited 24/7 Access</li>
                    <li>Includes all classes</li>
                    <li>Free joining fee</li>
                    <li className="text-rose-500 text-center text-5xl ">Get Offer</li>
                </ul>
            </div>

            <Footer></Footer>


        </div>
    )
}
