import axios from "axios";

const clientProxied = axios.create({
    baseURL: "https://link.samifying.com/api/proxy"
});

const client = axios.create({});

const AxiosService = {
    getProxied(url) {
        return clientProxied.post("", { "url": url }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(axiosError);
    },
    get(url, config = {}) {
        return clientProxied.get(url, config).catch(axiosError);
    }
}

function axiosError(e) {

}

export default AxiosService