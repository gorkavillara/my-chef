import React, { useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    OAuthProvider,
} from "firebase/auth"
import ALogo from "../../../utils/svgs/ALogo_white.svg"

const appleProvider = new OAuthProvider("apple.com")
appleProvider.addScope("email")
appleProvider.addScope("name")
appleProvider.setCustomParameters({
    locale: "en"
})

import { loginUri2 } from "../../../utils/svgs/login"
import { IoRocket, IoStar, IoWallet } from "react-icons/io5"
import Image from "next/image"

const emptyUser = {
    email: "",
    password: "",
    confirm_password: "",
}

const LoginPage = ({ setUser, auth }) => {
    const [route, setRoute] = useState("login")
    const [newUser, setNewUser] = useState(emptyUser)
    const [loading, setLoading] = useState(false)
    const [errorCode, setErrorCode] = useState("")

    useEffect(() => {
        setErrorCode("")
        return () => setErrorCode("")
    }, [route])

    const login = async () => {
        const { email, password } = newUser
        setLoading(true)
        setErrorCode("")
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                setLoading(false)
                setUser(user)
                // saveUserInStorage(user);
            })
            .catch((error) => {
                console.log(error)
                setNewUser(emptyUser)
                setErrorCode(error.code)
                setLoading(false)
            })
    }

    const appleLogin = async () => {
        setLoading(true)
        setErrorCode("")
        signInWithPopup(auth, appleProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user
                auth.currentUser = result.user
                setLoading(false)
                setUser(user)
                // saveUserInStorage(user);
                // ...
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }

    const registerUser = async () => {
        const { email, password, confirm_password } = newUser
        if (password !== confirm_password) {
            setNewUser({ ...emptyUser, email })
            return alert("Las dos contraseñas no coinciden")
        }
        setLoading(true)
        createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then((userCredential) => {
                const user = userCredential.user
                setLoading(false)
                setUser(user)
            })
            .catch((error) => {
                console.log(error)
                setNewUser(emptyUser)
                setErrorCode("register-error")
                setLoading(false)
            })
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-screen w-screen">
            <div
                style={{
                    backgroundImage: `url("${loginUri2}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                }}
                className="hidden sm:flex flex-col items-center justify-center gap-8"
            >
                <img
                    src="/logo_blanco_horizontal.png"
                    className={`w-80 ${loading && "animate-bounce"}`}
                    alt="logo"
                />
                <div className="hidden sm:flex gap-12">
                    <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-400 rounded-full flex justify-center items-center text-white text-5xl">
                        <IoRocket />
                    </div>
                    <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-teal-400 rounded-full flex justify-center items-center text-white text-5xl">
                        <IoStar />
                    </div>
                    <div className="w-24 h-24 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-full flex justify-center items-center text-white text-5xl">
                        <IoWallet />
                    </div>
                </div>
                <div className="hidden sm:block w-full lg:w-56 text-center">
                    <h1 className="text-white font-semibold text-3xl">
                        Start Catering Wisely
                    </h1>
                </div>
                <div className="hidden lg:block w-64 text-center">
                    <span className="text-white">
                        A new solution for high-level restaurants looking for
                        the best quality in their service
                    </span>
                </div>
            </div>
            <div className="flex bg-white flex-col justify-center items-center gap-8 px-6 sm:px-12">
                {route === "login" && (
                    <div className="max-w-xl flex flex-col justify-center items-center gap-8">
                        <h1 className="text-4xl font-bold text-center">
                            Welcome to My Rapid Chef
                        </h1>
                        <div className="flex gap-6">
                            {/* <button
                                className="bg-gray-200 rounded-lg p-3 text-slate-800 flex items-center gap-4"
                                onClick={googleLogin}
                            >
                                <img src={"/GLogo.svg"} alt="GLogo" />
                                <span>Log In with Google</span>
                            </button> */}
                            <button
                                className="bg-black rounded-lg py-2 px-8 text-white text-lg flex items-center gap-4"
                                onClick={appleLogin}
                            >
                                <div className="w-5 flex items-center">
                                    <Image src={ALogo} alt="" />
                                </div>
                                <span>Sign In with Apple</span>
                            </button>
                        </div>
                        <div className="my-4 flex items-center gap-4 w-full sm:w-96">
                            <div className="border-t border-slate-200 flex-grow"></div>
                            <span className="text-slate-400">
                                or do it via email
                            </span>
                            <div className="border-t border-slate-200 flex-grow"></div>
                        </div>
                        <label className="flex flex-col gap-2 w-full items-center">
                            <span className="label-input w-full">Email</span>
                            <input
                                type="text"
                                placeholder="Email"
                                value={newUser.email}
                                onKeyPress={(e) =>
                                    (e.code === "Enter" ||
                                        e.code === "NumpadEnter") &&
                                    login()
                                }
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                    })
                                }
                                disabled={loading}
                                className="w-full input-text"
                            />
                        </label>
                        <label className="flex flex-col gap-2 w-full items-center">
                            <span className="label-input w-full">Password</span>
                            <input
                                type="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                    })
                                }
                                onKeyPress={(e) =>
                                    (e.code === "Enter" ||
                                        e.code === "NumpadEnter") &&
                                    login()
                                }
                                disabled={loading}
                                className="w-full input-text"
                            />
                        </label>
                        {errorCode === "auth/invalid-email" && (
                            <p className="text-red-500 text-center bg-white bg-opacity-30 py-2 px-4 rounded-lg">
                                There is no user with this email address
                            </p>
                        )}
                        {errorCode === "auth/wrong-password" && (
                            <p className="text-red-500 text-center bg-white bg-opacity-30 py-2 px-4 rounded-lg">
                                The password for this email is wrong
                            </p>
                        )}
                        <button
                            onClick={login}
                            className="w-full btn-primary-green py-2 rounded"
                        >
                            Submit
                        </button>
                        <button
                            onClick={() => setRoute("signup")}
                            className="italic"
                        >
                            ...or you can click here to Sign Up
                        </button>
                    </div>
                )}
                {route === "signup" && (
                    <div className="max-w-xl flex flex-col justify-center items-center gap-8">
                        <h1 className="text-4xl font-bold text-center">
                            Welcome to My Rapid Chef
                        </h1>
                        <h1 className="text-xl">Sign Up below</h1>
                        <div className="flex gap-6">
                            {/* <button
                                className="bg-gray-200 rounded-lg p-3 text-slate-800 flex items-center gap-4"
                                onClick={googleLogin}
                            >
                                <img src={"/GLogo.svg"} alt="GLogo" />
                                <span>Sign Up with Google</span>
                            </button> */}
                            <button
                                className="bg-black rounded-lg py-2 px-8 text-white text-lg flex items-center gap-4"
                                onClick={appleLogin}
                            >
                                <div className="w-5 flex items-center">
                                    <Image src={ALogo} alt="" />
                                </div>
                                <span>Register with Apple</span>
                            </button>
                        </div>
                        <div className="my-4 flex items-center gap-4 w-full sm:w-96">
                            <div className="border-t border-slate-200 flex-grow"></div>
                            <span className="text-slate-400">
                                or do it via email
                            </span>
                            <div className="border-t border-slate-200 flex-grow"></div>
                        </div>
                        <label className="flex flex-col gap-2 w-full items-center">
                            <span className="label-input w-full">Email</span>
                            <input
                                type="text"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        email: e.target.value,
                                    })
                                }
                                onKeyPress={(e) =>
                                    (e.code === "Enter" ||
                                        e.code === "NumpadEnter") &&
                                    registerUser()
                                }
                                disabled={loading}
                                className="w-full input-text"
                            />
                        </label>
                        <label className="flex flex-col gap-2 w-full items-center">
                            <span className="label-input w-full">Password</span>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        password: e.target.value,
                                    })
                                }
                                onKeyPress={(e) =>
                                    (e.code === "Enter" ||
                                        e.code === "NumpadEnter") &&
                                    registerUser()
                                }
                                disabled={loading}
                                className="w-full input-text"
                            />
                        </label>
                        <label className="flex flex-col gap-2 w-full items-center">
                            <span className="label-input w-full">
                                Confirm Password
                            </span>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={newUser.confirm_password}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        confirm_password: e.target.value,
                                    })
                                }
                                onKeyPress={(e) =>
                                    (e.code === "Enter" ||
                                        e.code === "NumpadEnter") &&
                                    registerUser()
                                }
                                disabled={loading}
                                className="w-full input-text"
                            />
                        </label>
                        {errorCode === "register-error" && (
                            <p className="text-red-500 text-center bg-white bg-opacity-30 py-2 px-4 rounded-lg">
                                There has been an error, please try again later.
                            </p>
                        )}
                        <button
                            onClick={registerUser}
                            className="w-full btn-primary-green py-2 rounded"
                        >
                            Create New User
                        </button>
                        <button
                            onClick={() => setRoute("login")}
                            className="italic"
                        >
                            Already have an account? Click here to Log In
                        </button>
                    </div>
                )}
                <p>
                    Powered by{" "}
                    <a href="https://myrapidwaiter.com">My Rapid Waiter</a>
                </p>
            </div>
        </div>
    )
}

export default LoginPage
