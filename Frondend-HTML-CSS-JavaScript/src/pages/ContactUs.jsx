import React from 'react';
import Nav from '../components/Nav.jsx';
import Footer from '../components/Footer.jsx';

const ContactUs = () => {
    return (
        <div className="flex flex-col min-h-screen bg-blue-200" style={{ backgroundImage: `url('/Blog_1.jpg')` ,
        backgroundAttachment: 'fixed'}}>

            <Nav />
            <h1 className="text-5xl font-bold my-6 text-center text-zinc-50">Contact Us</h1>
            <h2 className="text-3xl font-bold mb-6 text-center text-zinc-50">Get in touch or find a gym location near you.</h2>
            <div
                className="grow grid grid-flow-row lg:grid-flow-col justify-evenly items-center gap-8 my-6 w-8/12 mx-auto "
            >
                <div className='flex flex-col gap-2 mx-auto items-center'>
                    <div className="card w-96 bg-primary text-primary-content" style={{ backgroundColor: 'rgb(190 138 46)' }}>
                        <div className="card-body">
                            <h2 className="card-title ">Enquiry form</h2>
                            <p>Complete an online enquiry form.</p>
                            <div className="card-actions justify-end">
                                <button className="btn">Message us</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 bg-primary text-primary-content" style={{ backgroundColor: 'rgb(70 163 102)' }}>
                        <div className="card-body">
                            <h2 className="card-title">1300 XXX XXX</h2>
                            <p>Give us a phone call.</p>
                            <div className="card-actions justify-end">
                                <button className="btn">Call now</button>
                            </div>
                        </div>
                    </div>
                    <div className="card w-96 bg-primary text-primary-content" style={{ backgroundColor: 'rgb(113 155 148)' }}>
                        <div className="card-body">
                            <h2 className="card-title">Webchat</h2>
                            <p>Chat online to our support team.</p>
                            <div className="card-actions justify-end">
                                <button className="btn">Chat now</button>
                            </div>
                        </div>
                    </div>
                </div>
                <iframe className='grow h-[550px] w-[384px] xl:w-[500px]'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92531.13898483072!2d153.02938394796828!3d-27.48572112119923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b915a0c3a9a0799%3A0xabd7ca3589cf6825!2sSouth%20Bank%2C%20South%20Brisbane%20QLD!5e0!3m2!1sen!2sau!4v1667859258264!5m2!1sen!2sau"
                    width="600"
                    height="450"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                    title="The Address of ML Strength - Health and Fitness"
                ></iframe>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;