import API from "./index"
import {RequestHistoryItem} from "../share/types";

class HistoryService {
    static getAll() {
        return API.get<RequestHistoryItem[]>("/ai_requests/requests_history")
    }

    static post(uri: string, description?: string) {
        let data = new FormData();
        const form = {
            uri,
            name: Date.now()+".jpg",
            type: 'image/jpg'
        }
        description && data.append("user_description", description)
        data.append("image", form as any)
        console.log(data)
        return API.post<RequestHistoryItem>("/ai_requests/requests_history", data, {headers: { "Content-Type": "multipart/form-data" }})
    }
}

export default HistoryService;
