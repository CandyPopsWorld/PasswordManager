import {signOut} from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import {Context} from '../../../index';

import { onAuthStateChanged } from "firebase/auth";

const MainPage = () => {
    const [user, setUser] = useState({
        email: ''
    });

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser({
                email: user.email
            })
        })
    }, [])

    const {auth} = useContext(Context);
    return (
        <>
            <h1>MainPage</h1>
            <p>Привет {user.email}!</p>
            <button onClick={() => signOut(auth)}>Выйти из аккаунта</button>
        </>
    )
}

export default MainPage;