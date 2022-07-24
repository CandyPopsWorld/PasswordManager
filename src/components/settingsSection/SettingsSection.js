
import { useContext, useState } from 'react';
import { Context } from '../..';
import { updateProfile } from 'firebase/auth';
import './SettingsSection.scss';

const SettingsSection = () => {
    const {auth} = useContext(Context);
    const [usernameChange, setUsernameChange] = useState('');

    const changeDataUserSettings = () => {
        if(usernameChange.length > 5){
            updateProfile(auth.currentUser, {
                displayName: usernameChange
            })
            setUsernameChange('');
            refreshPage();
        }
    }

    const refreshPage = () => {
        window.location.reload(true);
    }


    return (
        <div className="settings_section">
            <div className="settings_section_item settings_section_item_header">
                <h2>Account Settings</h2>
            </div>
            <div className="settings_section_item settings_section_item_form">
                <div className="settings_form_items">
                    <div className="settings_form_item">
                        <label htmlFor="">Имя пользователя({auth.currentUser.displayName})</label>
                        <input 
                        type="text"
                        value={usernameChange}
                        onChange={(e) => setUsernameChange(e.target.value)}/>
                        <button onClick={changeDataUserSettings} className='change_btn_settings'>Изменить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsSection;