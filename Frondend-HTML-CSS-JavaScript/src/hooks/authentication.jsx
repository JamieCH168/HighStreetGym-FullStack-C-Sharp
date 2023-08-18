import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    login as apiLogin,
    logout as apiLogout,
    getUserByID
} from "../api/user";
import jwtDecode from "jwt-decode";

export const AuthenticationContext = createContext(null);

export function AuthenticationProvider({ router, children }) {
    const [authenticatedUser, setAuthenticatedUser] = useState(null);

    useEffect(() => {
        if (authenticatedUser == null) {
            const jwtToken = localStorage.getItem("jwtToken");
            if (jwtToken) {
                const decodedUser = jwtDecode(jwtToken);
                getUserByID(decodedUser.user_id)
                    .then(user => {
                        setAuthenticatedUser(user);
                    })
                    .catch(error => {
                        router.navigate("/");
                    });
            } else {
                router.navigate("/");
            }
        }
    }, []);

    return (
        <AuthenticationContext.Provider value={[authenticatedUser, setAuthenticatedUser]}>
            {children}
        </AuthenticationContext.Provider>
    );
}

export function useAuthentication() {
    const [authenticatedUser, setAuthenticatedUser] = useContext(AuthenticationContext);

    async function login(email, password) {
        setAuthenticatedUser(null);
        return apiLogin(email, password)
            .then(result => {
                if (result.status === 200 && result.jwtToken) {
                    localStorage.setItem("jwtToken", result.jwtToken);
                    // Fetch the complete user data from the backend
                    return getUserByID(result.user_id)
                        .then(user => {
                            console.log(user);
                            setAuthenticatedUser(user);
                            return Promise.resolve(result);
                        });
                } else {
                    return Promise.reject(result.message);
                }
            })
            .catch(error => {
                return Promise.reject(error);
            });
    }

    async function logout() {
        const jwtToken = localStorage.getItem("jwtToken");
        if (jwtToken) {
            return apiLogout(jwtToken)
                .then(result => {
                    localStorage.removeItem("jwtToken");
                    setAuthenticatedUser(null);
                    return Promise.resolve(result.message);
                })
                .catch(error => {
                    return Promise.reject(error);
                });
        } else {
            setAuthenticatedUser(null);
            return Promise.resolve("Logged out");
        }
    }

    return [authenticatedUser, login, logout];
}
