import axios from "axios";

const AxiosConfig = axios.create({
        baseURL: 'https://dev.llca.in/', 
        headers: {
            "Content-Type": "application/json",
        }
    })

export {AxiosConfig};
