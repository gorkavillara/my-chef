import React, { useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    OAuthProvider,
    setPersistence,
    inMemoryPersistence,
} from "firebase/auth"

const appleProvider = new OAuthProvider("apple.com")
appleProvider.addScope("email")
appleProvider.addScope("name")
appleProvider.setCustomParameters({
    locale: "en",
})

import { loginUri2 } from "../../../utils/svgs/login"
import { IoRocket, IoStar, IoWallet } from "react-icons/io5"

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
        setPersistence(auth, inMemoryPersistence)
            .then(() => {
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
            })
            .catch((e) => console.error(e))
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
        <div className="grid h-screen w-screen grid-cols-1 lg:grid-cols-2">
            <div
                style={{
                    backgroundImage: `url("${loginUri2}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "bottom",
                }}
                className="hidden flex-col items-center justify-center gap-8 sm:flex"
            >
                <img
                    src="/logo_blanco_horizontal.png"
                    className={`w-80 ${loading && "animate-bounce"}`}
                    alt="logo"
                />
                <div className="hidden gap-12 sm:flex">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-orange-400 text-5xl text-white">
                        <IoRocket />
                    </div>
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 to-teal-400 text-5xl text-white">
                        <IoStar />
                    </div>
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 text-5xl text-white">
                        <IoWallet />
                    </div>
                </div>
                <div className="hidden w-full text-center sm:block lg:w-56">
                    <h1 className="text-3xl font-semibold text-white">
                        Start Catering Wisely
                    </h1>
                </div>
                <div className="hidden w-64 text-center lg:block">
                    <span className="text-white">
                        A new solution for high-level restaurants looking for
                        the best quality in their service
                    </span>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 bg-white px-6 sm:px-12">
                {route === "login" && (
                    <div className="flex max-w-xl flex-col items-center justify-center gap-12">
                        <h1 className="text-center text-4xl font-bold">
                            Welcome to My Rapid Chef
                        </h1>
                        <h1 className="text-xl">Log Yourself In Below</h1>
                        <label className="flex w-full flex-col items-center gap-2">
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
                                className="input-text w-full"
                            />
                        </label>
                        <label className="flex w-full flex-col items-center gap-2">
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
                                className="input-text w-full"
                            />
                        </label>
                        {errorCode === "auth/invalid-email" && (
                            <p className="rounded-lg bg-white bg-opacity-30 py-2 px-4 text-center text-red-500">
                                There is no user with this email address
                            </p>
                        )}
                        {errorCode === "auth/wrong-password" && (
                            <p className="rounded-lg bg-white bg-opacity-30 py-2 px-4 text-center text-red-500">
                                The password for this email is wrong
                            </p>
                        )}
                        <button
                            onClick={login}
                            className="btn-primary-green w-full rounded py-2"
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
                    <div className="flex max-w-xl flex-col items-center justify-center gap-8">
                        <h1 className="text-center text-4xl font-bold">
                            Welcome to My Rapid Chef
                        </h1>
                        <h1 className="text-xl">Sign Up below</h1>
                        <label className="flex w-full flex-col items-center gap-2">
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
                                className="input-text w-full"
                            />
                        </label>
                        <label className="flex w-full flex-col items-center gap-2">
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
                                className="input-text w-full"
                            />
                        </label>
                        <label className="flex w-full flex-col items-center gap-2">
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
                                className="input-text w-full"
                            />
                        </label>
                        {errorCode === "register-error" && (
                            <p className="rounded-lg bg-white bg-opacity-30 py-2 px-4 text-center text-red-500">
                                There has been an error, please try again later.
                            </p>
                        )}
                        <button
                            onClick={registerUser}
                            className="btn-primary-green w-full rounded py-2"
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
