import {Route, Routes, Navigate} from 'react-router-dom';
import { accessibilityRoutes, privateRoutes, publicRoutes } from '../../routes';
import { HOMEPAGE_ROUTE, MAIN_PAGE_ROUTE } from '../../utils/consts';
import MainPage from '../pages/MainPage/MainPage';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from '../..';


const AppRoutes = () => {
    const {auth} = useContext(Context);
    const [user] = useAuthState(auth);

    // console.log(user);

    return user ? 
    (
        <Routes>
            {privateRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={Component}/>
            })}
            <Route path='*' element={<Navigate to={'/manager'}/>}/>
            {/* {accessibilityRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={Component}/>
            })} */}
        </Routes>
    )
    :
    (
        <Routes>
            {publicRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={Component}/>
            })}
            <Route path='*' element={<Navigate to={'/'}/>}/>
        </Routes>
    )
}

export default AppRoutes;