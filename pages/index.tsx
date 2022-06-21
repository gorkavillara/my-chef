import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Admin from "./admin"
import LoginPage from "./admin/views/LoginPage"

import { firebaseConfig } from "../firebase/client"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import { Toaster } from "react-hot-toast"

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const Home: NextPage = () => {
    const router = useRouter()
    const { device_id } = router.query
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (us) => setUser(us))
    }, [])

    return device_id ? (
        <div className="bg-red-100 h-screen w-screen">
            <Head>
                <title>My Rapid Chef</title>
                <meta
                    name="description"
                    content="High Level Culinary Software"
                />
                <link rel="icon" href="/favicon_256x256.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            {user ? (
                <Admin user={user} auth={auth} device_id={device_id} />
            ) : (
                <LoginPage setUser={setUser} auth={auth} />
            )}
            <div><Toaster/></div>
        </div>
    ) : null
}

export default Home
