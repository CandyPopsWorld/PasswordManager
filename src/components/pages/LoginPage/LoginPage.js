
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../../index';

import { Link, Route } from 'react-router-dom';
import { SIGNUP_ROUTE, errorsUserSignUpAndLogin} from '../../../utils/consts';
import {signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

import AlertMessage from '../../alertMessage/AlertMessage';

import './LoginPage.scss';

const LoginPage = () => {

    const {auth} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser]  = useState('');

    // Внутренние состояния комопнента
    const [showAlert, setShowAlert] = useState(false);
    const [variantAlert, setVariantAlert] = useState('danger');
    const [textAlert, setTextAlert] = useState('');

    //
    const [visibleContent, setVisibleContent]  = useState(true);

    const signInUser = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user);
            console.log(userCredential.user);
        })
        .catch((error) => {
            let message = 'Произошла ошибка! Попробуйте еще раз!';
            errorsUserSignUpAndLogin.forEach(item => {
                if(error.code === item.code){
                    message = item.message;
                }
            })
            setTextAlert(message);
            setShowAlert(true);
            console.log(error);
        })
    }

    const forgotPassword = (email) => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setTextAlert('На вашу электронную почту отправлена ссылка на сброс пароля!');
            setVariantAlert('success');
            setShowAlert(true);
        })
        .catch((error) => {
            setTextAlert('Произошла ошибка! Попробуйте позднее!');
            setVariantAlert('danger');
            setShowAlert(true);
        })
    }


    return (
        <div className="wrapper_login">
            <div className="logo_password">
                <Link to={'/'}>PASSWORD</Link>
            </div>
            <div className="login_container">
                <div className="login_container_item login_container_item_alert">
                    {showAlert ? <AlertMessage errorText={textAlert} variant={variantAlert} setShow={setShowAlert}/> : null}
                </div>
                {visibleContent ? 
                <LoginMain 
                email={email} 
                setEmail={setEmail} 
                password={password} 
                setPassword={setPassword} 
                forgotPassword={forgotPassword} 
                signInUser={signInUser}
                setShowAlert={setShowAlert}
                setVisibleContent = {setVisibleContent}/> 
                : 
                <ForgotLogin setVisibleContent={setVisibleContent} forgotPassword={forgotPassword} setShowAlert={setShowAlert}/>
                }
            </div>
        </div>
    )
}

const ForgotLogin = ({setVisibleContent, forgotPassword, setShowAlert}) => {
    const [forgotEmail, setForgotEmail] = useState('');

    useEffect(() => {
        setShowAlert(false);
    }, [])

    const getForgotPassword = () => {
        forgotPassword(forgotEmail);
        setTimeout(() => {
            console.log('lox');
            setShowAlert(false);
            setVisibleContent(true);
        }, 4000)
    }

    return (
        <>
            <p>Введите почту для сброса пароля!</p>
            <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)}/>
            <button style={{marginTop: '20px'}} onClick={getForgotPassword}>Сбросить</button>

            <button style={{textDecoration: 'underline', border: 'none'}} onClick={() => setVisibleContent(true)}>Вернуться назад</button>
        </>
    )
}

const LoginMain = ({email, password, setEmail, setPassword, forgotPassword, signInUser, setShowAlert, setVisibleContent}) => {

    useEffect(() => {
        setShowAlert(false);
    }, [])

    return (
        <>
                <div className="login_container_item">
                    <div className="login_header">
                        <h1>ВХОД</h1>
                    </div>
            
                    <div className="login_input_list">
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
            
                        <div className="forgot_password">
                            <button onClick={() => setVisibleContent(false)} style={{border: 'none', textDecoration: 'underline'}}>Забыли пароль?</button>
                        </div>
            
                        <div className="login_button">
                            <button onClick={signInUser} id="login">Войти</button>
                        </div>
                    </div>
                </div>
        
                <div className="login_container_item item_two">
                    <div className="text_or_sign_up">
                        <span>Зарегистрироваться</span>
                    </div>
                    <div className="sign_up_link_page">
                        <Link to={SIGNUP_ROUTE}>Регистрация</Link>
                    </div>
                </div>
        </>
    )
}

export default LoginPage;