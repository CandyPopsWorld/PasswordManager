import { useContext, useEffect, useState } from 'react';
import { Context } from '../..';
import AlertMessage from '../alertMessage/AlertMessage';
import { doc, getDoc } from 'firebase/firestore';
import './Dashboard.scss';
const Dashboard = ({email, username}) => {
    const {auth, db} = useContext(Context);
    const [showAlert, setShowAlert] = useState(false);
    const [problems, setProblems] = useState([]);
    const [databaseData, setDatabaseData] = useState(null);
    // const [objectAlert, setObjectAlert] = useState({});

    const InitializeProblems = () => {
        if(auth.currentUser.emailVerified === false) {
            setProblems(problems => [...problems, {problems: 'Verificate Email', message: 'Пожалуйста подтвертите ваш адрес электронной почты!', variant: 'danger'}]);
            setShowAlert(true);
        }
    }

    useEffect(() => {
        InitializeProblems();
        getDataByDatabase();
    }, [])

    const getDataByDatabase = async () => {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);
        setDatabaseData(docSnap.data());
    }

    console.log(auth.currentUser);
    console.log('dashboardDb:', databaseData);

    return (
        <div className="dashboard_section">
            <div className="dashboard_section_item dashboard_section_item_blocks">
                <div className="list_dashboard_block">
                    <div className="dashboard_block">
                        <div className="dashboard_block_text">
                            Password Count
                        </div>
                        <div className="dashboard_block_value">
                            {databaseData !== null ? databaseData.passwords.length : 'Загрузка...'}
                        </div>
                    </div>

                    <div className="dashboard_block">
                        <div className="dashboard_block_text">
                            Password Groups
                        </div>
                        <div className="dashboard_block_value">
                            {databaseData !== null ? databaseData.groups.length : 'Загрузка...'}
                        </div>
                    </div>

                    <div className="dashboard_block">
                        <div className="dashboard_block_text">
                            Email account
                        </div>
                        <div className="dashboard_block_value">
                            {email}
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard_section_item dashboard_section_item_hello">
                <h3>Привет {auth.currentUser.displayName}, вы вошли в свой аккаунт.</h3>
            </div>

            <div className="dashboard_section_item dashboard_section_item_alert">
                {problems.length > 0 && showAlert === true ? <AlertMessage errorText={problems[0].message} variant={problems[0].variant} setShow={setShowAlert}/> : null}
            </div>
        </div>
    )
}

export default Dashboard;