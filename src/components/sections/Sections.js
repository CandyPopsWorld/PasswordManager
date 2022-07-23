import Dashboard from '../dashboard/Dashboard';
import Passwords from '../passwords/Passwords';
import SettingsSection from '../settingsSection/SettingsSection';
import Groups from '../groups/Groups';

import './Sections.scss';
const Sections = ({email, username, activeSlide}) => {
    let section = <Dashboard email={email} username={username}/>;

    if(activeSlide === 2) {
        section = <Passwords/>;
    } else if (activeSlide === 3){
        section = <Groups/>;
    } else if(activeSlide === 4) {
        section = <SettingsSection/>
    }

    return (
        <main className="sections_manager">
            <div className="section">
                {section}
                {/* <Dashboard email={email}/> */}
            </div>
        </main>
    )
}

export default Sections;