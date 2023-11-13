import API from "./index"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {User} from "../context/UserContext";


class AuthService {

    static async getMe() {
        return await API.get<User>("/users/me/")
    }

    static async register(data: { email: string, password: string }) {
        const response = await API.post("/users/", data)
        await this.login(data)
        return await this.getMe()
    }

    static async login(data: { email: string, password: string }) {
        const response = await API.post("/token/login/", data)
        const {auth_token} = response.data
        await AsyncStorage.setItem("token", auth_token)
        return await this.getMe()
    }

    static async logout() {
        return await API.post("/token/logout/", {})
    }
}

export default AuthService;
