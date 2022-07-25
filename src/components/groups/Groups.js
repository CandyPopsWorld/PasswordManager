
import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import {doc, getDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import AlertMessage from '../alertMessage/AlertMessage';
import './Groups.scss';
const Groups = () => {
    const {auth, db} = useContext(Context);

    const [group, setGroup] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [variant, setVariant] = useState('success');
    const [alertText, setAlertText] = useState('');

    const [databaseData, setDatabaseData] = useState(null);

    useEffect(() => {
        getDataByDatabase();
    }, [])

    const updateDatabase = () => {
        if(group.length > 2){
            if(auth.currentUser.emailVerified === false){
                setShowAlert(true);
                setGroup('');
                setVariant('danger');
                setAlertText('Для того чтобы использовать данный функционал подвтердите электронную почту!');
                return;
            }
            setShowAlert(true);
            setVariant('success');
            setAlertText(`Группа ${group} добавлена`);
            addGroup();
            getDataByDatabase();
        }
        setGroup('');
    }

    const addGroup = async () => {
        if(group.length > 2){
            const docRef = doc(db, 'users', auth.currentUser.uid);

            await updateDoc(docRef, {
                groups: arrayUnion({group: group})
            })
        }
        setGroup('');
    }

    const getDataByDatabase = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        await setDatabaseData(docSnap.data());
        // console.log(docSnap.data());
    }

    const deleteDataGroups = (group) => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const groupObject = {group: group};
        updateDoc(userRef, {
            groups: arrayRemove(groupObject)
        })
        getDataByDatabase();
    }

    let groups_item = null;
    if(databaseData !== null){
        groups_item = databaseData.groups.map((item, i) => {
            if(item.group !== 'default'){
                return (
                    <div className="groups_section_item_list_item" key={i}>
                        <div className="groups_section_item_list_item_name">
                            {item.group}
                        </div>
                        <button 
                        className='delete_groups'
                        onClick={() => deleteDataGroups(item.group)}>Удалить</button>
                    </div>
                )
            }
            return (
            <div className="groups_section_item_list_item" key={i}>
                <div className="groups_section_item_list_item_name">
                    {item.group}<span style={{color: 'red'}}>(Эту группу удалить нельзя)</span>
                </div>
            </div>
            )
        })
    }

    return (
        <div className="groups_section">
            <div className="groups_section_item">
                <div className="groups_section_item_header">
                    <h2>Groups Password</h2>
                </div>
            </div>

            <div className="groups_section_item groups_section_item_form">
                <label htmlFor="group">Введите название группы</label>
                <input 
                type="text" 
                name='group'
                id='group'
                value={group}
                onChange={(e) => setGroup(e.target.value)}/>
                <button onClick={updateDatabase} className='change_btn_groups'>Добавить</button>
            </div>

            <div className="groups_section_item groups_section_item_list">
                {groups_item}
            </div>

            <div className="groups_section_item_alert">
                {showAlert === true ? <AlertMessage setShow={setShowAlert} errorText={alertText} variant={variant}/> : null}
            </div>
        </div>
    )
}

export default Groups;