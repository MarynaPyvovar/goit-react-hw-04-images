import axios from "axios";
const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '29177846-79ba9349bc407ca7d45dbb10e';
const PER_PAGE = 12;

const instance = axios.create({
    baseURL: BASE_URL,
    params: {
        key: API_KEY,
        per_page: PER_PAGE,
        image_type: 'photo',
        orientation: 'horizontal',
    }
});

export const searchImages = async(q, page = 1) => {
    const { data } = await instance.get("/", {
        params: {
            page,
            q,
        }
    });
    return data;
}