import axios from "axios";

const journalApi = axios.create({
    baseURL: 'https://vue-journalapp-6d676-default-rtdb.firebaseio.com'
})

export default journalApi