import {signOut} from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import {Context} from '../../../index';

import { onAuthStateChanged } from "firebase/auth";

import Navbar from '../../navbar/Navbar';
import Sections from '../../sections/Sections';

import './MainPage.scss';

const MainPage = () => {
    const [user, setUser] = useState({
        email: '',
        username: ''
    });
    const [activeSlide, setActiveSlide] = useState(1);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser({
                email: user.email,
                username: user.displayName
            })
        })
    }, [])

    const {auth} = useContext(Context);


    const onSlideSection = (id) => {
        setActiveSlide(id);
        console.log(id);
    }

    return (
        <>
            {/* <h1>MainPage</h1>
            <p>Привет {user.email}!</p>
            <button onClick={() => signOut(auth)}>Выйти из аккаунта</button> */}

        <div className="wrapper_manager">
            <Navbar onSlideSection={onSlideSection}/>
            <Sections email={user.email} activeSlide={activeSlide} username={user.username}/>
        </div>
        </>
    )
}

export default MainPage;