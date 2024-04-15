import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [open, setOpen] = useState(false);
    

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                const users = await doCreateUserWithEmailAndPassword(email, password);
                const user = {
                    name: name,
                    uid: users.user.uid,
                    email: users.user.email,
                    mobile: phone,
                    country: country,
                    time: Timestamp.now()
                }
                const userRef = collection(db, "users");
                await addDoc(userRef, user);

                setIsRegistering(false);
            } catch (error) {
                console.error('Error registering user:', error);
                setIsRegistering(false);
            }
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await doSignInWithGoogle();
        } catch (error) {
            console.error(error.message);
        }
    };

    const toggle = () => {
        setOpen(!open)
    }

    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                        </div>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Name</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Email</label>
                            <input type="email" autoComplete='email' required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:indigo-600 shadow-sm rounded-lg transition duration-300" />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Password</label>
                            <input disabled={isRegistering} type={(open === false) ? 'password' : 'text'} autoComplete='new-password' required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300" />
                            <div className='text-2xl -top-[33px] -right-[310px] relative'>
                                {
                                    (open === false) ? <AiFillEyeInvisible onClick={toggle} /> : <AiFillEye onClick={toggle} />
                                }
                            </div>
                        </div>
                        <div className='-top-[15px] relative '>
                            <label className="text-sm text-gray-600 font-bold ">Confirm Password</label>
                            <input disabled={isRegistering} type={(open === false) ? 'password' : 'text'} autoComplete='off' required value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300" />
                            <div className='text-2xl  -top-[33px] -right-[310px] relative'>
                                {
                                    (open === false) ? <AiFillEyeInvisible onClick={toggle} /> : <AiFillEye onClick={toggle} />
                                }
                            </div>
                        </div>
                        <div className='-top-[20px] relative'>
                            <label className="text-sm text-gray-600 font-bold">Country</label>
                            <select value={country} onChange={(e) => setCountry(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300">
                                <option value="">Select Country</option>
                                <option value="USA">India</option>
                                <option value="Canada">Pakistan</option>
                                <option value="UK">United States</option>
                                <option value="Australia">Bangladesh</option>
                                <option value="Germany">China</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold">Phone Number</label>
                            <input type="text" autoComplete='tel' required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300" />
                        </div>
                        <button type="submit" disabled={isRegistering} className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}>{isRegistering ? 'Signing Up...' : 'Sign Up'}</button>
                        <button type="button" onClick={handleGoogleSignUp} className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-100 transition duration-300 active:bg-gray-100">
                            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_17_40)">
                                    <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                    <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                    <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                    <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_17_40">
                                        <rect width="48" height="48" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                            Sign Up with Google
                        </button>
                        <div className="text-sm text-center">
                            Already have an account? <Link to={'/login'} className="text-center text-sm hover:underline font-bold">Login</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default Register;
