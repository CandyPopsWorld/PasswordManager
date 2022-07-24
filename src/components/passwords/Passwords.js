
import { useContext, useEffect, useState } from 'react';
import { doc, updateDoc, arrayUnion, getDoc, arrayRemove } from "firebase/firestore";
import {Context} from '../../index';
import './Passwords.scss';
const Passwords = () => {
    const {auth,db} = useContext(Context);
    const [resource, setResource] = useState('');
    const [passwordResource, setPasswordResource] = useState('');

    const [databaseData, setDatabaseData] = useState(null);

    const updateDatabase = () => {
        // console.log('click');
        if(resource.length > 0 && passwordResource.length > 0){
            const passwordObject = {resource: resource, password: passwordResource};
            const userRf = doc(db, 'users', auth.currentUser.uid);
            updateDoc(userRf, {
                passwords: arrayUnion(passwordObject)
            })

            setResource('');
            setPasswordResource('');
            getDataByDatabase();
        }
    }

    useEffect(() => {
        getDataByDatabase();
    }, [])

    const getDataByDatabase = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setDatabaseData(docSnap.data());
        // console.log(docSnap.data());
    }

    const deleteDataPassword = (resource, password) => {
        const userRf = doc(db, 'users', auth.currentUser.uid);
        const passwordObject = {resource: resource, password: password};
        updateDoc(userRf, {
            passwords: arrayRemove(passwordObject)
        })
        getDataByDatabase();
    }

    let list_elements = null;
    if(databaseData !== null) {
        list_elements = databaseData.passwords.map(item => {
            return (
                <div className="passwords_list_item">
                    <div className="passwords_list_item_source">
                        {item.resource}
                    </div>
                    <div className="passwords_list_item_password">
                        {item.password}
                    </div>
                    <div className="passwords_list_item_delete">
                        <button onClick={() => deleteDataPassword(item.resource, item.password)}>Удалить</button>
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
                        <label htmlFor="">Название ресурса</label>
                        <input 
                        type="text"
                        value={resource}
                        onChange={(e) => setResource(e.target.value)}/>
                    </div>

                    <div className="passwords_section_add_password_form_item">
                        <label htmlFor="">Пароль для этого ресурса</label>
                        <input 
                        type="text"
                        value={passwordResource}
                        onChange={(e) => setPasswordResource(e.target.value)}/>
                    </div>
                    <button onClick={updateDatabase}>Добавить</button>
                </div>
            </div>
        </div>
    )
}

export default Passwords;