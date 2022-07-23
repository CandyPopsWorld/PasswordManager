
import { useContext } from 'react';
import { Context } from '../..';
import './SettingsSection.scss';
const SettingsSection = () => {
    const {auth} = useContext(Context);
    return (
        <div className="settings_section">
            <div className="settings_section_item settings_section_item_header">
                <h2>Account Settings</h2>
            </div>
            <div className="settings_section_item settings_section_item_form">
                <div className="settings_form_items">
                    <div className="settings_form_item">
                        <label htmlFor="">Имя пользователя({auth.currentUser.displayName})</label>
                        <input type="text"/>
                    </div>
{/* 
                    <div className="settings_form_item">
                        <label htmlFor="">Почта({auth.currentUser.email})</label>
                        <input type="text"/>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default SettingsSection;