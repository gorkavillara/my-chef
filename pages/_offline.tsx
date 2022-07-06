import type { NextPage } from "next"
import Head from "next/head"
import { useEffect, useState } from "react"
import Admin from "./admin"
import LoginPage from "./admin/views/LoginPage"

import { firebaseConfig } from "../firebase/client"
import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const Offline: NextPage = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (us) => setUser(us))
    }, [])

    return (
        <div>
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
                <Admin device_id="" user={user} auth={auth} />
            ) : (
                <LoginPage setUser={setUser} auth={auth} />
            )}
        </div>
    )
}

export default Offline
