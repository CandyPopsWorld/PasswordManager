
import {Link} from 'react-router-dom';
import {LOGIN_ROUTE, SIGNUP_ROUTE} from '../../utils/consts';

const FooterHomePage = () => {
    return (
        <footer className="footer_homepage">
                <div className="footer_homepage_text">
                    <h2>Готовы защитить свои пароли?</h2>
                </div>
                <div className="footer_homepage_buttons">
                    <div className="footer_homepage_btn">
                        <Link to={LOGIN_ROUTE}>Войти</Link>
                    </div>

                    <div className="footer_homepage_btn">
                        <Link to={SIGNUP_ROUTE}>Регистрация</Link>
                    </div>
                </div>
        </footer>
    )
}

export default FooterHomePage;