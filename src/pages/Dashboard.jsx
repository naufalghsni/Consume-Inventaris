import React, { useEffect, useState } from 'react';
import axios from "axios";
import Case from '../components/Case';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Rectangle } from 'recharts';

export default function Dashboard() {
    const [stuffs, setStuffs] = useState([]);
    const [users, setUsers] = useState([]);
    const [LendingGrouped, setLendingGrouped] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
        })
        .then((res) => {
            setIsLogin(true);
            setAuthUser(res.data.data);
            if (window.location.pathname === '/login') {
                navigate('/profile');
            }
        })
        .catch((err) => {
            setIsLogin(false);
            if (err.response && err.response.status === 401 && window.location.pathname !== '/login' && window.location.pathname !== '/') {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        });
        getDataLendings();
        getDataStuffs();
        getDataUsers();
    }, []); // Removed checkProses dependency

    function getDataStuffs() {
        axios.get('http://localhost:8000/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            handleUnauthorizedError(err);
        });
    }

    function getDataUsers() {
        axios.get('http://localhost:8000/user', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            setUsers(res.data.data);
        })
        .catch(err => {
            handleUnauthorizedError(err);
        });
    }

    function getDataLendings() {
        axios.get('http://localhost:8000/lending', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        })
        .then(res => {
            const data = res.data.data;
            const groupedData = {};
            data.forEach((entry) => {
                const date = new Date(entry.date_time);
                const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
                if (!groupedData[formattedDate]) {
                    groupedData[formattedDate] = [];
                }
                groupedData[formattedDate].push(entry);
            });
            const processedData = Object.keys(groupedData).map((date) => ({
                date,
                totalStuff: groupedData[date].reduce((acc, entry) => acc + entry.total_stuff, 0)
            }));
            setLendingGrouped(processedData);
        })
        .catch(err => {
            handleUnauthorizedError(err);
        });
    }

    function handleUnauthorizedError(err) {
        if (err.response && err.response.status === 401) {
            navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
        } else {
            console.error('An error occurred:', err);
        }
    }

    return (
        <Case>
            <div>
                <div className="flex flex-wrap justify-center m-10">
                    {isLogin && (
                        <>
                            {authUser['role'] === 'admin' && (
                                <div className="p-4 w-1/2">
                                    <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                                        <div className="flex items-center mb-3">
                                            <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                                </svg>
                                            </div>
                                            <h2 className="text-white dark:text-white text-lg font-medium">Data User</h2>
                                        </div>
                                        <div className="flex flex-col justify-between flex-grow">
                                            <h1 className="text-white dark:text-white text-lg font-medium">{users.length}</h1>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="p-4 w-1/2">
                                <div className="flex rounded-lg h-full dark:bg-gray-800 bg-teal-400 p-8 flex-col">
                                    <div className="flex items-center mb-3">
                                        <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-indigo-500 bg-indigo-500 text-white flex-shrink-0">
                                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                            </svg>
                                        </div>
                                        <h2 className="text-white dark:text-white text-lg font-medium">Data Stuff</h2>
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow">
                                        <h1 className="text-white dark:text-white text-lg font-medium">{stuffs.length}</h1>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                    <BarChart
                        width={730} 
                        height={250}
                        data={LendingGrouped}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="totalStuff" fill="#8884d8" shape={<Rectangle fill='pink' stroke='blue' />} />
                    </BarChart>
                </div>
            </div>
        </Case>
    );
}
