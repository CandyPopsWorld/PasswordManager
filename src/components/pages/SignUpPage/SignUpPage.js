
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, errorsUserSignUpAndLogin} from '../../../utils/consts';
import {Context} from '../../../index';

import {createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile} from 'firebase/auth';

import AlertMessage from '../../alertMessage/AlertMessage';

import './SignUpPage.scss';

const SignUpPage = () => {
    // Состояния для регистрации
    const {auth} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [user, setUser] = useState('');
    // Внутренние состояния комопнента
    const [showAlert, setShowAlert] = useState(false);
    const [errorSignUp, setErrorSignUp] = useState('');
    
    const registerUser = () => {
        if(username.length > 5){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                mailVerefication();
                addDataUser();
                console.log(userCredential.user);
            })
            .catch((error) => {
                let message = 'Произошла ошибка! Попробуйте еще раз!';
                errorsUserSignUpAndLogin.forEach(item => {
                    if(error.code === item.code){
                        message = item.message;
                    }
                })
                setErrorSignUp(message);
                setShowAlert(true);
                // console.dir(error);
                // console.log('code:', error.code);
                // console.log(error);
            })
        }
    }

    const mailVerefication = () => {
        sendEmailVerification(auth.currrentUser)
        .then(() => {

        })
        .catch(() => {

        })
    }


    const addDataUser = () => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
            displayName: username
        })
    }

    return (
        <div className="wrapper_login">
            <div className="login_container">
                <div className="login_container_item login_container_item_alert">
                    {showAlert ? <AlertMessage errorText={errorSignUp} setShow={setShowAlert}/> : null}
                </div>
                <div className="login_container_item">
                    <div className="login_header">
                        <h1>Регистрация</h1>
                    </div>
            
                    <div className="login_input_list">

                        <div className="login_input_item">
                            <label htmlFor="username">Username</label>
                            <input 
                            type="text" 
                            name='username'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="login_input_item">
                            <label htmlFor="email">Email</label>
                            <input 
                            type="email" 
                            name="email" 
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                        </div>
            
                        <div className="login_input_item">
                            <label htmlFor="password">Password</label>
                            <input 
                            type="password" 
                            name="password" 
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        </div>
            
                        <div className="login_button">
                            <button 
                            id="login"
                            onClick={registerUser}>Регистрация</button>
                        </div>
                    </div>
                </div>
        
                <div className="login_container_item item_two">
                    <div className="text_or_sign_up">
                        <span>Войдите</span>
                    </div>
                    <div className="sign_up_link_page">
                        <Link to={LOGIN_ROUTE}>Войти</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage;