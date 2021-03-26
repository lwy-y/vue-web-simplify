import axios from 'axios';
import { total } from './message'
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    timeout: 5000
});

/**
 * 发送前拦截
 */
service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);
/**
 * 响应拦截
 */
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            total.error(response.data.retCode, response.data.message);
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        total.fail(error.response.status);
        return Promise.reject();
    }
);

export default service;
