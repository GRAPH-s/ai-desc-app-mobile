import API from "./index"
import {RequestHistoryItem} from "../share/types";

class HistoryService {
    static getAll() {
        return API.get<RequestHistoryItem[]>("/ai_requests/requests_history")
    }
}

export default HistoryService;
