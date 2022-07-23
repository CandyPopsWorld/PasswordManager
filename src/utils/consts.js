export const HOMEPAGE_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const SIGNUP_ROUTE = '/signup';
export const MAIN_PAGE_ROUTE = '/manager';


export const errorsUserSignUpAndLogin = [
    {code: 'auth/email-already-in-use', message: 'Пользователь с таким email зарегистрирован!'},
    {code: 'auth/invalid-email', message: 'Неккоректна введена почта!'},
    {code: 'auth/wrong-password', message: 'Неккорекно введен пароль!'},
    {code: 'auth/too-many-requests', message: 'Произошла ошибка! Слишком много запросов! Попробуйте позднее!'},
    {code: 'auth/weak-password', message: 'Ваш пароль очень слабый!'},
    {code: '"auth/user-not-found"', message: 'Пользователь не найден!'},
    {code: 'auth/email-already-in-use', message: 'Электронная почта уже используется!'},
    {code: '', message: ''},
    {code: '', message: ''},
    {code: '', message: ''},
];