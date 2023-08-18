import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import homepage_picture from '../../public/Blog_1.jpg'
import { useAuthentication } from "../hooks/authentication"
import styled, { keyframes } from 'styled-components';
import DumbbellIcon from '../components/DumbbellIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

function Homepage() {
    const [user, login, logout] = useAuthentication()
    // const {login} = useAuthentication()
    const [statusMessage, setStatusMessage] = useState("")
    // console.log(login)
    const navigate = useNavigate()
    const handleButtonClick = () => {
        navigate('/class_booking');
    };

    const colorChange = keyframes`
  0% {color: #FF0000;}
  25% {color: #64e647 ;}
  50% {color: #FFFF00;}
  75% {color: #00FF00;}
  100% {color: #FF0000;}
`;

    const GymName = styled.h1`
  font-size: 4em; // or whatever size you want
  text-align: center; // centers the text
  animation: ${colorChange} 5s infinite; // apply the animation
`;
    const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -15%;
  left: 0;
  width: 100%;
  height: 100%;
`;

    const horizontalBorderSpin = keyframes`
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

    // Animation for left and right borders
    const verticalBorderSpin = keyframes`
  0% { transform: translateY(-100%); }
  50% { transform: translateY(100%); }
  100% { transform: translateY(-100%); }
`;

    const SpinningButton = styled.button`
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    border: 2px solid transparent;
  }

  &::before {
    left: 0;
    right: 0;
    border-top-color: red;  //自定义颜色
    border-bottom-color: #6232a8;  //自定义颜色
    animation: ${horizontalBorderSpin} 2s linear infinite;
  }

  &::after {
    top: 0;
    bottom: 0;
    left: -2px;  // Offset by border width
    right: -2px;  // Offset by border width
    border-left-color: #6232a8;  //自定义颜色
    border-right-color: #6232a8;  //自定义颜色
    animation: ${verticalBorderSpin} 2s linear infinite;
    animation-delay: 1s; // 开始动画的延迟
  }
`;
    const twinkleAnimation = keyframes`
    0% {
      opacity: 0;
      transform: scale(0);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  `;
    const StarryBackground = styled.div`
    position: relative;
    min-height: 100vh;
    background-color: #000033;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url(${homepage_picture});
      opacity: 0.3;
      z-index: -1;
    }
  `;

    const TwinklingStar = styled.div`
  position: absolute;
  top: ${() => `${Math.random() * 100}%`};
  left: ${() => `${Math.random() * 100}%`};
  width: ${() => `${Math.random() * 20}px`};  
  height: ${() => `${Math.random() * 4}px`}; 
  background-color: ${() => `hsl(${Math.random() * 360}, 100%, 80%)`}; 
  box-shadow: 1px 1px 3px rgba(255, 255, 255, 0.8);
  animation: ${twinkleAnimation} ${() => `${Math.random() * 2 + 1}s`} infinite;
`;

    const generateStars = () => {
        const stars = [];
        for (let i = 0; i < 100; i++) {
            stars.push(<TwinklingStar key={i} />);
        }
        return stars;
    };
    const LoginButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 50px;
    border: none;
    border-radius: 25px;
    background-color: #104de8;
    color: #ffffff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: #ba20b8;
    }
`;

    const Icon = styled(FontAwesomeIcon)`
    margin-right: 10px;
`;

    // function LoginButton({ onClick }) {
    //     return (
    //         <LoginButtonContainer onClick={onClick}>
    //             <Icon icon={faSignInAlt} />
    //             Login
    //         </LoginButtonContainer>
    //     );
    // }

    return (
        <div className='flex justify-end'>
            <StarryBackground className="grow relative">
                {/* <btn className="btn btn-accent btn-xs sm:btn-sm md:btn-md lg:btn-lg absolute"
                    style={{ top: '10%', right: '5%' }}
                >Responsive</btn> */}
                <div className='absolute z-10' style={{ top: '12%', right: '5%' }} >
                    <LoginButtonContainer
                        onClick={() => {
                            navigate('/login');
                        }}
                    >
                        <Icon icon={faSignInAlt} />
                        Login
                    </LoginButtonContainer>
                </div>
                <DumbbellIcon />
                {generateStars()}
                <div className="hero min-h-screen " style={{ backgroundImage: `url(${homepage_picture})` }}>
                    <CenteredContainer>
                        <GymName>High Street Gym</GymName>
                    </CenteredContainer>
                    <div className="hero-overlay bg-opacity-40"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            {/* <h1 className="mb-10 text-5xl font-bold">Transform Your Life</h1> */}
                            <p className="text-4xl absolute" style={{ top: '40.5%', right: '28%' }} >Transform Your Life</p>
                            <button className="btn btn-primary rounded-full text-4xl"
                                style={{ backgroundColor: '#104de8' }}
                                onClick={handleButtonClick}
                            >Get Started</button>
                        </div>
                    </div>
                </div>
            </StarryBackground>
            {/* This section is included for debugging and development purposes */}
            <div>
                <h2>Default users</h2>
                <table className="table table-compact w-full">
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>email</th>
                            <th>password</th>
                            <th>login</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>admin</td>
                            <td>jackCH111@server.com</td>
                            <td>123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("jackCH111@server.com", "123")
                                            .then(result => {
                                                // console.log(666)
                                                setStatusMessage("Login successful!")
                                                navigate("/user")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>

                            </td>
                            <td> <label className="label">
                                <span className="label-text-alt">{statusMessage}</span>
                            </label></td>
                        </tr>
                        <tr>
                            <td>trainer</td>
                            <td>jackCH222@server.com</td>
                            <td>123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("jackCH222@server.com", "123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")
                                                navigate("/booking")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                            <td> <label className="label">
                                <span className="label-text-alt">{statusMessage}</span>
                            </label></td>
                        </tr>
                        <tr>
                            <td>Member</td>
                            <td>jackCH333@server.com</td>
                            <td>123</td>
                            <td>
                                <button
                                    className="btn btn-xs btn-primary"
                                    onClick={() => {
                                        login("jackCH333@server.com", "123")
                                            .then(result => {
                                                setStatusMessage("Login successful!")

                                                navigate("/user_booking")
                                            })
                                            .catch(error => {
                                                setStatusMessage("Login failed: " + error)
                                            })
                                    }}>Login</button>
                            </td>
                            <td> <label className="label">
                                <span className="label-text-alt">{statusMessage}</span>
                            </label></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Homepage;

