// import axios from 'axios'; // Потрібно розкоментувати для VARIANT 2.

import { axiosGuest, axiosUser } from './axiosCreateInstance';

// Створюємо функцію, у якій робимо запит на реєстрацію нового користувача.
export const signupReq = async (data) => {
    try {
        // VARIANT 1 - з використанням попередньо створеного генератора інстансів від axios.
        const res = await axiosGuest().post('/signup', data);
        return res.data;

        // // VARIANT 2 - звичайний підхід. 
        // const res = await axios.post('http://localhost:5000/api/signup', data);
        // return res.data;
    } catch (err) {
        console.error(err);
    };
};

// Створюємо функцію, у якій робимо запит на авторизацію у системі вже зареєстрованого користувача.
export const signinReq = async (data) => {
    try {
        // VARIANT 1 - з використанням попередньо створеного генератора інстансів від axios.
        const res = await axiosGuest().post('/signin', data);
        return res.data;

        // // VARIANT 2 - звичайний підхід. 
        // const res = await axios.post('http://localhost:5000/api/signin', data);
        // return res.data;
    } catch (err) {
        console.error(err);
    };
};

// Створюємо функцію, у якій робимо запит на дані зареєстрованого користувача.
export const getUserReq = async (token) => {
    try {
        // VARIANT 1 - з використанням попередньо створеного генератора інстансів від axios. 
        const res = await axiosUser(token).get('/user');
        return res.data;

        // // VARIANT 2 - звичайний підхід. 
        // const res = await axios.get('http://localhost:5000/api/user', {
        //     headers: {
        //         Authorization: token,
        //     }
        // });
        // return res.data;
    } catch (err) {
        console.error(err);
    };
};