import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthentication } from "../hooks/authentication"
import { registerUser } from "../api/user"

export default function Register() {
    const navigate = useNavigate()

    const [user, login, logout] = useAuthentication()

    const [statusMessage, setStatusMessage] = useState("")

    const [formData, setFormData] = useState({
        user_email: "lingCH@server.com",
        user_password: "123",
        user_access_role: "user",
        user_phone: "110110",
        user_first_name: "John",
        user_last_name: "Adam",
        user_address: "28 Hassall St, South Bank",
    })
    function onRegisterSubmit(e) {
        e.preventDefault()
        setStatusMessage("Registering...")

        if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$/.test(formData.user_email)) {
            setStatusMessage("Invalid email address")
            return
        }

        // TODO: Add validation for other fields

        // Register then attempt login
        // registerUser(formData)
        //     .then(result => {
        //         setStatusMessage(result.message);

        //         login(formData.user_email, formData.user_password)
        //             .then(result => {

        //                 setStatusMessage(result.message)
        //                 navigate("/class_booking")
        //             })
        //             .catch(error => {
        //                 setStatusMessage("Login failed: " + error)
        //             })
        //     })
        registerUser(formData)
            .then(result => {
                if (result.status !== 200) {
                    throw new Error(result.error);
                }
                setStatusMessage(result.error);
                return login(formData.user_email, formData.user_password);
            })
            .then(result => {
                setStatusMessage(result.message);
                navigate("/class_booking");
            })
            .catch(error => {
                setStatusMessage(
                    <span style={{ color: '#f00' }}>{error.error || error.message || "An error occurred"}</span>
                );
            });
    }

    return <div className="flex justify-evenly items-center w-full bg-blue-200 min-h-screen">
        <form className="flex-grow m-4 max-w-lg" onSubmit={onRegisterSubmit}>
            <h1 className="text-4xl text-center mb-8">High Street Gym</h1>
            <h2 className="text-3xl text-center mb-8">Register Account</h2>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="user@server.tld"
                    className="input input-bordered w-full"
                    value={formData.user_email}
                    onChange={(e) => setFormData(existing => { return { ...existing, user_email: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full"
                    value={formData.user_password}
                    onChange={(e) => setFormData(existing => { return { ...existing, user_password: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Role:</span>
                </label>
                <select
                    className="select select-bordered"
                    value={formData.user_access_role}
                    onChange={(e) => setFormData(existing => { return { ...existing, user_access_role: e.target.value } })}
                >
                    {/* <option disabled selected>Pick one</option> */}
                    <option value="" >-- Select an role --</option>
                    {/* <option value="admin">admin</option> */}
                    <option value="trainer">trainer</option>
                    <option value="user">member</option>
                </select>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Phone:</span>
                </label>
                <input
                    type="text"
                    placeholder="Jane"
                    className="input input-bordered w-full"
                    value={formData.user_phone}
                    onChange={(e) => setFormData(existing => { return { ...existing, user_phone: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">First Name:</span>
                </label>
                <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full"
                    value={formData.user_first_name}
                    onChange={(e) => setFormData(existing => { return { ...existing, user_first_name: e.target.value } })}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Last Name:</span>
                </label>
                <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full"
                    value={formData.user_last_name}
                    onChange={(e) => setFormData(existing => { return { ...existing, user_last_name: e.target.value } })}
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Address:</span>
                </label>
                <input
                    type="text"
                    placeholder="Doe"
                    className="input input-bordered w-full"
                    value={formData.user_address}
                    onChange={(e) => setFormData(existing => { return { ...existing, user_address: e.target.value } })}
                />
            </div>

            <div className="my-2">
                <button className="btn btn-primary mr-2" >Register</button>
                <button
                    className="btn btn-secondary"
                    onClick={() => navigate("/")}>Back</button>
                <label className="label">
                    <span className="label-text-alt">{statusMessage}</span>
                </label>
            </div>
        </form>
    </div>
}