import type { NextPage } from "next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Admin from "./admin"

import { firebaseConfig } from "../firebase/client"
import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously } from "firebase/auth"

import { Toaster } from "react-hot-toast"

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const Home: NextPage = () => {
    const router = useRouter()
    const { device_id } =
        process.env.NODE_ENV === "development"
            ? { device_id: "gorkavillara@gmail.com" }
            : router.query

    useEffect(() => {
        signInAnonymously(auth)
            .then((r) => r)
            .catch((e) => console.error(e))
    }, [])

    return device_id ? (
        <div className="h-screen w-screen bg-red-100">
            <Head>
                <title>My Rapid Chef</title>
                <meta
                    name="description"
                    content="High Level Culinary Software"
                />
                <link rel="icon" href="/favicon_256x256.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>
            <Admin auth={auth} device_id={device_id} />
            <Toaster />
        </div>
    ) : null
}

export default Home
