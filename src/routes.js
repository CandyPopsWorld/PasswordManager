import LoginPage from './components/pages/LoginPage/LoginPage';
import SignUpPage from './components/pages/SignUpPage/SignUpPage';
import HomePage from "./components/pages/HomePage/HomePage";
import MainPage from './components/pages/MainPage/MainPage';
import { HOMEPAGE_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE, SIGNUP_ROUTE } from "./utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <LoginPage/>
    },

    {
        path: SIGNUP_ROUTE,
        Component: <SignUpPage/>
    },

    {
        path: HOMEPAGE_ROUTE,
        Component: <HomePage/>
    }
]

export const privateRoutes = [
    {
        path: MAIN_PAGE_ROUTE,
        Component: <MainPage/>
    }
]

export const accessibilityRoutes = [
    {
        path: HOMEPAGE_ROUTE,
        Component: <HomePage/>
    }
]