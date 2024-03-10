import axios from "axios";

const AxiosConfig = axios.create({
        baseURL: 'http://68.178.161.233:8080/', 
        headers: {
            "Content-Type": "application/json",
        }
    })

export {AxiosConfig};
