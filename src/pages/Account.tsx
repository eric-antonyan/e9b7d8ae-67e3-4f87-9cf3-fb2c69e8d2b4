import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { DataList, Text } from '@radix-ui/themes';
import cyberGray from '../assets/cyber-gray.jpg';
import { Button } from '@nextui-org/react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
                const response = await axios.get("http://api-gray-hub.loca.lt/user", {
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

    return (
        <div className="dark text-foreground bg-background h-full pb-6">
            {data ? (
                <div>
                    <header className="p-3 bg-slate-900 sticky top-0">
                        <div className="max-w-[1120px] mx-auto flex items-center px-2 justify-between">
                            <div className='font-bold flex items-center gap-2'>Gray<div className='bg-orange-500 text-black px-2 py-1 rounded'>HUB</div></div>
                            {isLoggedIn && <Button onClick={handleLogout} color="danger">Log out</Button>}
                        </div>
                    </header>
                    <DataList.Root style={{ rowGap: '30px', columnGap: '15px' }} className="mt-20 p-3 max-w-[1120px] mx-auto">
                        <DataList.Item align="start">
                            <DataList.Label minWidth="88px">Username</DataList.Label>
                            <DataList.Value>
                                <Text as="span">{data.username}</Text>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item align="start">
                            <DataList.Label minWidth="88px">Age</DataList.Label>
                            <DataList.Value>
                                <Text as="span">{data.age}</Text>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item align="start">
                            <DataList.Label minWidth="88px">Description</DataList.Label>
                            <DataList.Value>
                                <Text as="span">{data.bio}</Text>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item align="start">
                            <DataList.Label minWidth="88px">Image</DataList.Label>
                            <DataList.Value>
                                <img src={"https://i0.wp.com/www.itphoto.co.uk/wp-content/uploads/2018/02/1737-09-sized.jpg"} alt="" />
                            </DataList.Value>
                        </DataList.Item>
                    </DataList.Root>
                    <footer className='max-w-[1120px] mt-6 w-[100%] flex justify-between mx-auto'>
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
