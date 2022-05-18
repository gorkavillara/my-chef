import React, { useState, useEffect } from "react"
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth"
import { firebaseConfig } from "../../../firebase/client"
import { initializeApp } from "firebase/app"

initializeApp(firebaseConfig)
const auth = getAuth()

const emptyUser = {
    email: "",
    password: "",
    confirm_password: "",
}

const LoginPage = ({ setUser }) => {
    const [route, setRoute] = useState("login")
    const [newUser, setNewUser] = useState(emptyUser)
    const [loading, setLoading] = useState(false)
    const [errorCode, setErrorCode] = useState("")

    useEffect(() => {
        setErrorCode("")
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
            })
            .catch((error) => {
                console.log(error)
                setNewUser(emptyUser)
                setErrorCode(error.code)
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
                console.log(user)
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
        <div className="h-screen w-screen bg-gradient-to-br from-green-300 to-blue-600 flex flex-col justify-center text-white items-center gap-4">
            <img
                src="/logo_blanco_horizontal.png"
                className={`w-80 ${loading && "animate-bounce"}`}
                alt=""
            />
            {route === "login" && (
                <>
                    <h1 className="text-xl">Introduce tus datos</h1>
                    <input
                        type="text"
                        placeholder="Usuario/Email"
                        value={newUser.email}
                        onKeyPress={(e) =>
                            (e.code === "Enter" || e.code === "NumpadEnter") &&
                            login()
                        }
                        onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                        }
                        disabled={loading}
                        className="w-96 bg-transparent text-white placeholder-gray-200 px-2 py-2 border-white disabled:border-gray-400 disabled:text-gray-400 border-2 rounded outline-none focus:ring ring-gray-200"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={newUser.password}
                        onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                        }
                        onKeyPress={(e) =>
                            (e.code === "Enter" || e.code === "NumpadEnter") &&
                            login()
                        }
                        disabled={loading}
                        className="w-96 bg-transparent text-white placeholder-gray-200 px-2 py-2 border-white disabled:border-gray-400 disabled:text-gray-400 border-2 rounded outline-none focus:ring ring-gray-200"
                    />
                    {errorCode === "auth/invalid-email" && (
                        <p className="text-red-500 text-center bg-white bg-opacity-30 py-2 px-4 rounded-lg">
                            El email que has introducido no se encuentra
                            registrado
                        </p>
                    )}
                    {errorCode === "auth/wrong-password" && (
                        <p className="text-red-500 text-center bg-white bg-opacity-30 py-2 px-4 rounded-lg">
                            La contraseña es incorrecta
                        </p>
                    )}
                    <button
                        onClick={login}
                        className="w-96 bg-gray-200 text-gray-800 placeholder-gray-200 px-2 py-2 rounded outline-none"
                    >
                        Acceder
                    </button>
                    <button
                        onClick={() => setRoute("signup")}
                        className="italic"
                    >
                        ...o puedes hacer clic aquí para registrarte
                    </button>
                </>
            )}
            {route === "signup" && (
                <>
                    <h1 className="text-xl">Date de alta aquí</h1>
                    <input
                        type="text"
                        placeholder="Usuario/Email"
                        value={newUser.email}
                        onChange={(e) =>
                            setNewUser({ ...newUser, email: e.target.value })
                        }
                        onKeyPress={(e) =>
                            (e.code === "Enter" || e.code === "NumpadEnter") &&
                            registerUser()
                        }
                        disabled={loading}
                        className="w-96 bg-transparent text-white placeholder-gray-200 px-2 py-2 border-white disabled:border-gray-400 disabled:text-gray-400 border-2 rounded outline-none focus:ring ring-gray-200"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={newUser.password}
                        onChange={(e) =>
                            setNewUser({ ...newUser, password: e.target.value })
                        }
                        onKeyPress={(e) =>
                            (e.code === "Enter" || e.code === "NumpadEnter") &&
                            registerUser()
                        }
                        disabled={loading}
                        className="w-96 bg-transparent text-white placeholder-gray-200 px-2 py-2 border-white disabled:border-gray-400 disabled:text-gray-400 border-2 rounded outline-none focus:ring ring-gray-200"
                    />
                    <input
                        type="password"
                        placeholder="Repite la Contraseña"
                        value={newUser.confirm_password}
                        onChange={(e) =>
                            setNewUser({
                                ...newUser,
                                confirm_password: e.target.value,
                            })
                        }
                        onKeyPress={(e) =>
                            (e.code === "Enter" || e.code === "NumpadEnter") &&
                            registerUser()
                        }
                        disabled={loading}
                        className="w-96 bg-transparent text-white placeholder-gray-200 px-2 py-2 border-white disabled:border-gray-400 disabled:text-gray-400 border-2 rounded outline-none focus:ring ring-gray-200"
                    />
                    {errorCode === "register-error" && (
                        <p className="text-red-500 text-center bg-white bg-opacity-30 py-2 px-4 rounded-lg">
                            Ha ocurrido un problema. Por favor, inténtalo de
                            nuevo más tarde.
                        </p>
                    )}
                    <button
                        onClick={registerUser}
                        className="w-96 bg-gray-200 text-gray-800 placeholder-gray-200 px-2 py-2 rounded outline-none"
                    >
                        Crear nuevo usuario
                    </button>
                    <button
                        onClick={() => setRoute("login")}
                        className="italic"
                    >
                        ¿Ya tienes una cuenta? Haz clic aquí para iniciar sesión
                    </button>
                </>
            )}
            <p>Powered by Gorka Villar</p>
            <div className="absolute top-12 right-0 bg-gradient-to-r from-green-300 to-transparent w-80 h-24 mix-blend-overlay -skew-y-12 animate-pulse"></div>
            <div className="absolute hidden md:block top-40 left-0 bg-gradient-to-r from-transparent to-blue-400 w-96 h-12 mix-blend-overlay -skew-y-12 animate-pulse"></div>
            <div className="absolute hidden md:block -top-16 left-40 bg-gradient-to-r from-transparent to-blue-400 w-96 h-24 mix-blend-overlay -skew-y-12 animate-pulse"></div>
            <div className="absolute hidden md:block bottom-64 left-44 bg-gradient-to-t from-transparent to-green-400 w-112 h-24 mix-blend-overlay -skew-y-12 animate-pulse"></div>
            <div className="absolute hidden md:block bottom-44 right-0 bg-gradient-to-t from-transparent to-green-400 w-112 h-12 mix-blend-overlay -skew-y-12 animate-pulse"></div>
        </div>
    )
}

export default LoginPage
