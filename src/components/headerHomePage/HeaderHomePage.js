
import {Link} from 'react-router-dom';
import {LOGIN_ROUTE, SIGNUP_ROUTE} from '../../utils/consts';
const HeaderHomePage = () => {
    return (
        <header className="header_homepage">
            <div className="header_homepage_item">
                <div className="header_homepage_logo">
                    PASSWORD
                </div>
            </div>

            <div className="header_homepage_item">
                <div className="header_btns">
                    <div className="header_sign_up_btn">
                        <Link to={LOGIN_ROUTE} className="header_btn">Вход</Link>
                    </div>
        
                    <div className="header_sign_in_btn">
                        <Link to={SIGNUP_ROUTE} className="header_btn">Регистрация</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderHomePage;