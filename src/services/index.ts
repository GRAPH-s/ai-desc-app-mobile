import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const apiUrl = process.env.EXPO_PUBLIC_API_URL;

const instance = axios.create({
    baseURL: apiUrl + "/api"
})

instance.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem("token")
    if(token) {
        config.headers.Authorization =  `Token ${token}`;
    } else {
        config.headers.Authorization = null
    }
    return config;
});

export default instance;
