import axios from "axios";

const clientProxied = axios.create({
    baseURL: "https://link.samifying.com/api/proxy"
});

const client = axios.create({});

const AxiosService = {
    get(url, config = {}) {
        return client.get(url, config);
    }
}

function axiosError(e) {

}

export default AxiosService