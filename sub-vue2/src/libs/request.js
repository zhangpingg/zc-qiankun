// @ts-nocheck
import axios from "axios";
import cookies from "./util.cookies";
import router from "@/router";

// 创建一个 axios 实例
const service = axios.create({
    baseURL: "/api",
    timeout: 60000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = cookies.get("token");
        config.headers["supplier-domain"] = "dt";
        //console.log(22, config);
        return config;
    },
    (error) => {
        // 发送失败
        Promise.reject(error);
    },
);

// 响应拦截器
service.interceptors.response.use(
    (response) => {
        //console.log(33, response);
        //let config = response.config;
        //let { errorModalType = "Notice", handleError = true } = config;
        // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data;
        // 这个状态码是和后端约定的
        const { code } = dataAxios;
        // 根据 code 进行判断
        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口
            return dataAxios;
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
                case 200:
                    if (dataAxios.success) {
                        return dataAxios.data;
                    } else {
                        // [ 示例 ] code === 0 代表没有错误
                        return dataAxios;
                    }
                case 100009:
                case 520001:
                case 520005:
                case 520006:
                case 520009:
                case 100006:
                    cookies.set("token", "");
                    router.push({ path: "/login" });
                    //errorCreate(`身份认证失败`);
                    break;
                case 520000:
                    //errorCreate(`无访问权限`);
                    break;
                case 100003:
                    if (
                        window.location.pathname &&
                        window.location.pathname.indexOf("/login") === -1
                    ) {
                        //router.push({ name: "login" });
                    }
                    //errorCreate(`${dataAxios.message || "账号被禁用"}`);
                    // errorCreate(`账号不存在`);
                    break;
                // case 100013:
                //     errorCreate(`账号被禁用`);
                //     break;
                default:
                    // 不是正确的 code
                    //errorCreate(
                    //    `${dataAxios.message || "服务器内部错误"}`,
                    //    errorModalType,
                    //    handleError,
                    //);
                    break;
            }
        }
    },
    (error) => {
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = "请求错误";
                    break;
                case 401:
                    error.message = "未授权，请登录";
                    break;
                case 403:
                    error.message = "拒绝访问";
                    break;
                case 404:
                    error.message = `请求地址出错: ${error.response.config.url}`;
                    break;
                case 408:
                    error.message = "请求超时";
                    break;
                case 500:
                    error.message = error.response.data.message;
                    break; // '服务器内部错误'; break;
                case 501:
                    error.message = "服务未实现";
                    break;
                case 502:
                    error.message = "网关错误";
                    break;
                case 503:
                    error.message = "服务不可用";
                    break;
                case 504:
                    error.message = "网关超时";
                    break;
                case 505:
                    error.message = "HTTP版本不受支持";
                    break;
                default:
                    break;
            }
        }
        //errorCreate(error);
        Promise.reject(error);
    },
);

export default service;
