
import { useContext, useEffect, useState } from 'react';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import {Context} from '../../index';
import AlertMessage from '../alertMessage/AlertMessage';
import './Passwords.scss';
const Passwords = () => {
    const {auth,db} = useContext(Context);
    const [resource, setResource] = useState('');
    const [passwordResource, setPasswordResource] = useState('');
    const[groupsResource, setGroupsResource] = useState('');

    const [databaseData, setDatabaseData] = useState(null);

    const [showAlert, setShowAlert] = useState(false);

    const [groupSelect, setGroupSelect] = useState('default');
 
    const updateDatabase = () => {
        // console.log('click');
        if(resource.length > 0 && passwordResource.length > 0){
            if(auth.currentUser.emailVerified === false){
                setShowAlert(true);
                setResource('');
                setPasswordResource('');
                return;
            }
            const passwordObject = {resource: resource, password: passwordResource, group: groupSelect};
            const userRf = doc(db, 'users', auth.currentUser.uid);
            updateDoc(userRf, {
                passwords: arrayUnion(passwordObject)
            })

            getDataByDatabase();
        }
        setResource('');
        setPasswordResource('');
    }

    const checkEmailVerefication = () => {
        if(auth.currentUser.emailVerified === false){
            setShowAlert(true);
            return;
        }
    }

    useEffect(() => {
        getDataByDatabase();
        checkEmailVerefication();
    }, [])

    const getDataByDatabase = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        await setDatabaseData(docSnap.data());
        // console.log(docSnap.data());
    }

    const deleteDataPassword = (resource, password, group) => {
        const userRf = doc(db, 'users', auth.currentUser.uid);
        const passwordObject = {resource: resource, password: password, group: group};
        updateDoc(userRf, {
            passwords: arrayRemove(passwordObject)
        })
        getDataByDatabase();
    }

    let options_elements = null;
    if(databaseData !== null){
        options_elements = databaseData.groups.map((item, i) => {
            return <option key={i}>{item.group}</option>
        })
    }

    let list_elements = null;
    if(databaseData !== null) {
        list_elements = databaseData.passwords.map(item => {
            return (
                <div className="passwords_list_item">
                    <div className="passwords_list_item_source">
                        {item.resource}<span style={{color: 'green'}}>({item.group})</span>
                    </div>
                    <div className="passwords_list_item_password">
                        {item.password}
                    </div>
                    <div className="passwords_list_item_delete">
                        <button onClick={() => deleteDataPassword(item.resource, item.password, item.group)}>Удалить</button>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="passwords_section">
            <div className="passwords_section_item">
                <div className="passwords_section_header">
                    <h2>Ваши пароли</h2>
                </div>
            </div>

            <div className="passwords_section_item">
                <div className="passwords_list">
                    <div className="passwords_list_item">
                        <div className="passwords_list_item_name_source">
                            РЕСУРС
                        </div>
                        <div className="passwords_list_item_name_password">
                            ПАРОЛЬ
                        </div>
                    </div>
                    {list_elements}
                </div>
            </div>

            <div className="passwords_section_item">
                <div className="passwords_section_add_password_form">
                    <div className="passwords_section_add_password_form_item">
                        <label htmlFor="">Название ресурса*</label>
                        <input 
                        type="text"
                        value={resource}
                        onChange={(e) => setResource(e.target.value)}/>
                    </div>

                    <div className="passwords_section_add_password_form_item">
                        <label htmlFor="">Пароль для этого ресурса*</label>
                        <input 
                        type="text"
                        value={passwordResource}
                        onChange={(e) => setPasswordResource(e.target.value)}/>
                    </div>

                    <div className="passwords_section_add_password_form_item">
                        <label htmlFor="">Группа(по умолчанию default)</label>
                        <select name="" id="" onChange={(e) => setGroupSelect(e.target.value)}>
                            {options_elements ? options_elements : null}
                        </select>
                    </div>
                    <button className='add_password_btn' onClick={updateDatabase}>Добавить</button>
                </div>
            </div>

            <div className="password_section_item_alert">
                {auth.currentUser.emailVerified === false && showAlert === true ? <AlertMessage setShow={setShowAlert} errorText={'Для того чтобы использовать данный функционал подвтердите электронную почту!'} variant={'danger'}/> : null}
            </div>
        </div>
    )
}

export default Passwords;