import React, { createContext, useState, useEffect } from 'react';
import { signinReq, signupReq, getUserReq } from '../services/auth';

// Створюємо контекст.
export const AuthContext = createContext({});

// Допоміжна функція, що дістає токен з локального сховища браузера.
const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token doesn\'t exist');
    };
    return token;
};

///////////////////////////////////////////////////////////////////

const Auth = ({ children }) => {

    const [user, setUser] = useState();

    const [token, setToken] = useState();

    // Флаг перевірки відпрацювання функції перевірки авторизації юзера. За замовчанням - 'не виконано', значення "false".
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkAuth();
    }, []);

    // Функція перевірки авторизації користувача.
    const checkAuth = async () => {
        try {
            const token = getTokenFromLocalStorage();
            setToken(token);
            const user = await getUserReq(token);
            setUser(user);
            // Змінюємо флаг перевірки авторизації на 'виконано', значення "true".
            setIsAuthenticated(true);
        } catch (err) {
            console.error(err);
            // При невдалій авторизації видаляємо токен з локального сховища.
            localStorage.removeItem('token');
            console.log('Authorization process failed!');
            // Функція перевірки авторизації виконана. Змінюємо на "true", щоб прибрати індикатор виконання процесу (спінер).
            setIsAuthenticated(true);
        };
    };

    // Функція реєстрації.
    const signup = async (data) => {
        try {
            await signupReq(data);
        } catch (err) {
            throw err;
        };
    };

    // Функція авторизації.
    const signin = async (data) => {
        try {
            // Відсилаємо через сервіс запит на авторизацію юзера.
            const res = await signinReq(data);
            // Зберігаємо токен у local storage.
            localStorage.setItem('token', `Bearer ${res.signedToken}`);
            // Перевіряємо авторизацію користувача.
            checkAuth();
        } catch (err) {
            throw err;
        };
    };

    // Функція виходу з авторизованого профілю.
    const signout = async () => {
        try {
            // Обнуляємо усі змінні.
            setToken(null);
            setUser(null);
            localStorage.removeItem('token');
        } catch (err) {
            throw err;
        };
    };

    // Загортаємо у контекст.
    return (
        <AuthContext.Provider value={{ isAuthenticated, signin, signup, signout, user, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export default Auth;