import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import LogIn from '/Blog_1.jpg'
import { useAuthentication } from "../hooks/authentication"

function Login() {
    const navigate = useNavigate()

    const [user, login, logout] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function onLoginSubmit(e) {
        e.preventDefault()
        setStatusMessage("Logging in...")
        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.email)) {
            setStatusMessage("Invalid email address")
            return
        }

        login(formData.email, formData.password)
            .then(result => {

                setStatusMessage("Login successful!")
                if (result.role === "member") {
                    navigate("/user_booking")
                } else if (result.role === "admin") {
                    navigate("/user")
                } else {
                    navigate("/booking")
                }
            })
            .catch(error => {
                setStatusMessage("Login failed: " + error)
            })
    }
    // Load recent sightings list
    // const [sightings, setSightings] = useState([])



    return <div className="min-h-screen flex items-center justify-center relative">
        <div
            className={`w-full h-full bg-cover absolute inset-0`}
            style={{ backgroundImage: `url(${LogIn})` }}
        >
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)' }}></div>
        </div>
        <div className="flex justify-center items-center h-full" style={{ position: 'relative', zIndex: 10 }}>
            <form className="grow m-40 max-w-lg flex flex-col space-y-10 " >
                <h2 className="text-4xl text-center mb-8 text-[#fff]">High Gym Street</h2>
                <h2 className="text-3xl text-center mb-8 text-[#fff]">Welcome Login</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-[#fff]">Your Email</span>
                    </label>
                    <label className="input-group ">
                        <span className="w-40 flex justify-center !rounded-l-full">Email</span>
                        <input
                            type="email"
                            placeholder="user@server.tld"
                            className="input input-bordered w-full !rounded-r-full"
                            value={formData.email}
                            onChange={(e) => setFormData(existing => { return { ...existing, email: e.target.value } })}
                        />
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-[#fff]">Your Password</span>
                    </label>
                    <label className="input-group">
                        <span className="w-40 flex justify-center !rounded-l-full">Password</span>
                        <input
                            type="password"
                            placeholder="password"
                            className="input input-bordered w-full !rounded-r-full"
                            value={formData.password}
                            onChange={(e) => setFormData(existing => { return { ...existing, password: e.target.value } })}
                        />
                    </label>
                </div>



                {/* <div className="form-control">
                <label className="label">
                    <span className="label-text">Your Password</span>
                </label>

                <label className="input-group">
                    <span className="w-40 flex justify-center !rounded-l-full">Remembers me  /// forget password</span>
                    <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered w-full !rounded-r-full"
                        value={formData.password}
                        onChange={(e) => setFormData(existing => { return { ...existing, password: e.target.value } })}
                    />
                </label>
            </div> */}

                <div className="text-center">
                    <button className="btn btn-primary mr-2" onClick={onLoginSubmit}>Login</button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate("/register")}>Sign up</button>

                    <label className="label">
                        <span className="label-text-alt">statusMessage</span>
                    </label>
                </div>
                <div>


                    {/* This section is included for debugging and development purposes
                <h2>Default users</h2>
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>email</th>
                            <th>password</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>admin</td>
                            <td>admin@srv.com</td>
                            <td>abc123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("admin@srv.com", "abc123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                        <tr>
                            <td>moderator</td>
                            <td>mod@srv.com</td>
                            <td>abc123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("mod@srv.com", "abc123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                        <tr>
                            <td>spotter</td>
                            <td>spot@srv.com</td>
                            <td>abc123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("spot@srv.com", "abc123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/dashboard")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                        </tr>
                    </tbody>
                </table> */}

                </div>
            </form>
        </div>
    </div>




    {/* <div className="relative">
    <div className="absolute inset-0 bg-gray-900 opacity-50"> 
    
    </div>
    </div> */}
}

export default Login