
import Carousel from "../carousel/Carousel";
import {Link} from 'react-router-dom';
import {LOGIN_ROUTE, SIGNUP_ROUTE} from '../../utils/consts';

const MainHomePage = () => {
    return (
        <main className="main_homepage">
            <div className="block_start">
                <div className="block_start_item block_start_item_img">
                    <img src="https://d38muu3h4xeqr1.cloudfront.net/website/static/DG-6249/static/eb9166e3274c2e52230e8e3560afabde/84993/homepage-hero-clay-pink.webp" alt=""/>
                </div>
                <div className="block_start_item block_start_item_text">
                    <div className="block_start_header">
                        <h1>ВАШ МЕНЕДЖЕР ПАРОЛЕЙ И МНОГОЕ ДРУГОЕ</h1>
                    </div>
                    <div className="block_start_text">
                        От паролей до личной информации, PASSWORD - это простое решение для защиты всех ваших данных. Начните свой судебный процесс уже сегодня.
                    </div>
                    <div className="block_start_btns">
                        <div className="block_start_btn">
                            <Link to={LOGIN_ROUTE}>Войти</Link>
                        </div>

                        <div className="block_start_btn">
                            <Link to={SIGNUP_ROUTE}>Регистрация</Link>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="nas_vuburaut">Нас Выбирают</h2>
            <Carousel/>
        </main>
    )
}

export default MainHomePage;