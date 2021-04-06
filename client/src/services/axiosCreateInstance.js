import axios from 'axios';

// Створюємо інстанс з передвстановленими значенями для авторизації користувача. 
// Не забуваємо передати у параметри функції токен, значення якого запишемо у хедер "Authorization".
export const axiosUser = (token) => {
    return axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            Authorization: token,
        }
    });
};

// У цьому інстансі для неавторизованого користувача просто прописуємо URL.
export const axiosGuest = () => {
    return axios.create({
        baseURL: 'http://localhost:5000/api',
    });
};