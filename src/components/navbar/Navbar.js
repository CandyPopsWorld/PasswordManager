import { useContext, useState } from 'react';
import { signOut } from 'firebase/auth';
import { Context } from '../..';

import './Navbar.scss';

const btns = [
    {active: false, icon: 'https://cdn-icons-png.flaticon.com/512/481/481270.png', label: 'Dashboard', id: 1},
    {active: false, icon: 'https://cdn-icons.flaticon.com/png/512/2886/premium/2886699.png?token=exp=1658593885~hmac=72ac6ee212b558be5b75791f8c163500', label: 'Passwords', id: 2},
    {active: false, icon: 'https://cdn-icons-png.flaticon.com/512/681/681443.png', label: 'Groups', id: 3},
    {active: false, icon: 'https://cdn-icons-png.flaticon.com/512/3524/3524636.png', label: 'Settings', id: 4},
    {active: false, icon: 'https://cdn-icons-png.flaticon.com/512/1828/1828945.png', label: 'Quit', id: 5},
];




const Navbar = ({onSlideSection}) => {
    const {auth} = useContext(Context);
    const [activeBtn, setActiveBtn] = useState(1);

    const Button = ({label, icon, clazz, idKey}) => {
        const clickBtn = () => {
            if(label === 'Quit'){
                signOut(auth);
                return;
            }
            onSlideSection(idKey);
            setActiveBtn(idKey);
        }

        return (
            <button onClick={clickBtn} className={clazz}><img className="manager_icon_btn" src={icon} alt=""/>{label}</button>
        )
    }

    const elemetsBtns = btns.map(item => {
        const clazz = activeBtn === item.id ? 'active' : '';
        return (
            <div className="navbar_manager_btn" key={item.id}>
                <Button clazz={clazz} label={item.label} icon={item.icon} key={item.id} idKey={item.id}/>
                {/* <button onClick={item.label === 'Quit' ? () => signOut(auth) : null} className={activeClass}><img className="manager_icon_btn" src={item.icon} alt=""/>{item.label}</button> */}
            </div>
        )
    });

    return (
        <nav className="navbar_manager">
            <div className="navbar_manager_item navbar_manager_item_logo">
                <a href='' className="navbar_manager_logo">PASSWORD</a>
            </div>
            <hr/>
            <div className="navbar_manager_list_btns">
                {elemetsBtns}
            </div>
        </nav>
    )
}


export default Navbar;