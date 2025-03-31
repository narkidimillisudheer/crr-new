import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

const Login: React.FC = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const onSubmit = async (data: any) => {
        try {
            const res = await axios.post("http://localhost:5000/login", data);
            console.log(res.data);
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userEmail", res.data.email);
                localStorage.setItem("userName", res.data.username);
                navigate("/customer-dashboard");
            } else {
                setErrorMessage(res.data.message);
                setOpen(true);
            }
        } catch (error:unknown) {
            console.log(error);
            if (axios.isAxiosError(error) && error.response) {
                setErrorMessage(error.response.data.error || "An error occurred");
            } else {
                setErrorMessage("An error occurred");
            }
            setOpen(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-[#33384a] font-montserrat">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className="flex w-2/3 max-w-4xl bg-white rounded-[10px] shadow-lg shadow-gray-500">
                    <div className="w-1/2 p-2">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="py-10">
                                <h2 className="text-3xl font-extrabold">Login</h2>
                            </div>
                            <div className="flex justify-center my-2 mb-12 gap-5">
                                <a href="/" className="h-12 w-12 text-[#333333] border border-gray-300 rounded-full p-3 hover:bg-gray-100">
                                    <FontAwesomeIcon icon={faFacebookF} className="font text-[20px]"/>
                                </a>
                                <a href="/" className="h-12 w-12 text-[#333333] border border-gray-300 rounded-full p-3 hover:bg-gray-100">
                                    <FontAwesomeIcon icon={faTwitter} className="font text-[20px]"/>
                                </a>
                            </div>
                            <p className="text-gray-500 my-3">or use your account</p>
                            <div className="flex flex-col items-center">
                                <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                                    <input {...register("email")} type="email" placeholder="Email" required className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"/>
                                </div>
                                <div className="bg-gray-100 w-80 p-2 flex items-center mb-4">
                                    <input {...register("password")} type="password" placeholder="Password" required className="bg-gray-100 outline-none text-m flex-1 m-1 px-2"/>
                                </div>
                                <div>
                                    <a href="/" className='text-gray-500 text-[17px] hover:text-gray-600'>Forgot your password?</a>
                                </div>
                                <div>
                                    <button type="submit" className='w-36 py-2.5 my-4 bg-primary hover:bg-[#33384a] text-white text-sm font-bold uppercase rounded-full tracking-widest'>
                                        Log In
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="w-1/2 bg-gradient-to-r from-[#00040f] to-[#33384a] text-white rounded-r-[10px] py-48 px-14">
                        <h2 className="text-3xl font-extrabold mb-4">Customer Login</h2>
                        <p>Bank customers login through this page.</p>
                    </div>
                </div>
            </main>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
