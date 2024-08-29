import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { DataList, Text } from '@radix-ui/themes';
import cyberGray from '../assets/cyber-gray.jpg';
import generalityJPG from '../assets/generality.jpg';
import { Button } from '@nextui-org/react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import post1 from "../assets/photo_2024-08-29_11-41-41.jpg"
import post2 from "../assets/photo_2024-08-29_11-41-43.jpg"
import post3 from "../assets/photo_2024-08-29_11-41-44.jpg"
import post4 from "../assets/photo_2024-08-29_11-41-46.jpg"
import post5 from "../assets/photo_2024-08-29_11-41-48.jpg"
import post6 from "../assets/photo_2024-08-29_11-41-50.jpg"
import post7 from "../assets/photo_2024-08-29_11-41-53.jpg"
import post8 from "../assets/photo_2024-08-29_13-05-04.jpg"
import post9 from "../assets/photo_2024-08-29_13-05-08.jpg"
import axios from 'axios';

const Account = () => {
    const [data, setData] = useState<any>();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (!token) {
            const fetchUser = async () => {
                const response = await axios.get(`http://${window.location.hostname}:3001/user`, {
                    headers: {
                        Authorization: `Basic ${btoa("admin:password")}`
                    }
                })
                setData(response.data)
                setIsLoggedIn(false)
            }

            fetchUser()
        } else {
            try {
                const payload = jwtDecode(token as string);
                setData(payload);
                setIsLoggedIn(true)
            } catch (error) {
                console.error('Invalid token:', error);
                setIsLoggedIn(false)
                setShouldRedirect(true);
            }
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('access_token');
        navigate('/login');
    };

    if (shouldRedirect) {
        return <Navigate to="/login" />;
    }

    const posts = [
        {
            img: post1
        },
        {
            img: post2
        },
        {
            img: post3
        },
        {
            img: post4
        },
        {
            img: post5
        },
        {
            img: post6
        },
        {
            img: post7
        },
        {
            img: post8
        },
        {
            img: post9
        }
    ]

    return (
        <div className="dark text-foreground bg-background h-full pb-6">
            {data ? (
                <div>
                    <header className="p-3 bg-slate-900 sticky top-0">
                        <div className="max-w-[1120px] mx-auto flex items-center px-2 justify-between">
                            <div className='font-bold flex items-center gap-2'>Gray<div className='bg-orange-500 text-black px-2 py-1 rounded text-white'>HUB</div></div>
                            {isLoggedIn && <Button onClick={handleLogout} color="danger">Log out</Button>}
                        </div>
                    </header>
                    <div className='p-3 max-w-[1120px] mt-8 w-[100%] mx-auto'>
                        <div className="flex gap-5">
                            <img className='w-[150px] h-[150px] phone:w-[90px] phone:h-[90px] rounded-full' src={generalityJPG} alt="" />
                            <div className='flex font-bold phone:gap-4 mt-3 flex-col gap-3'>
                                <p className='text-2xl phone:text-xl'>{data.username}</p>
                                <p className="text-2xl phone:text-xl">{data.firstName} {data.lastName}, {data.age}</p>
                                <p className='phone:hidden'>{data.bio}</p>
                            </div>
                        </div>
                        <p className='mt-4 font-bold desktop:hidden phone:text-sm'>{data.bio}</p>
                    </div>
                    <div className="max-w-[1120px] mx-auto px-3 mt-6 text-center">
                        <h2 className='font-bold text-4xl'>Posts</h2>
                        <div className='border-1 border-white mt-8 grid grid-cols-3'>
                            {
                                posts.map((post) => (
                                    <img src={post.img} className='aspect-square object-cover border-1 border-white' alt="" />
                                ))
                            }
                        </div>
                    </div>
                    <footer className='max-w-[1120px] mt-6 p-3 w-[100%] flex justify-between mx-auto'>
                        <img className='w-[20px] rounded-full' src={cyberGray} alt="" />
                        <p className='font-bold'>&copy; GrayHUB 2024</p>
                        {
                            isLoggedIn ? (
                                <Link to={"/"} onClick={handleLogout} className='text-danger font-bold cursor-pointer'>logout</Link>
                            ) : (
                                <Link to="/" className='text-primary font-bold cursor-pointer'>Log in</Link>
                            )
                        }
                    </footer>
                </div>
            ) : (
                <div>Loading...</div> // Display a loading state while data is being fetched
            )}
        </div>
    );
};

export default Account;
