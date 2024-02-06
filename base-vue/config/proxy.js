const envApi = {
    dev: {
        //api: 'http://dtra.zhilun-k8s.com', // 品牌商
        api: 'http://yd.zhilun-k8s.com', // 经销商-服务器地址（不带api）
        //api: 'http://192.168.1.231:8061', // 后台本地
        //api: 'http://192.168.1.231:8092', // 后台本地
        //api: 'http://dtapi.zhilun-k8s.com/api/yuding', // 经销商-网关地址（带api）
    },
    uat: {
        api: 'https://dtapi-t.zcrubber.com/api/puxian', // 品牌商
    },
    prod: {
        api: 'https://dtapi.zcrubber.com/api/puxian', // 品牌商
    },
    environment: 'dev',
};

export default {
    '/api': {
        target: envApi[envApi.environment].api,
        changeOrigin: true,
        rewrite: (path) => path.replace('/api', ''),
        bypass(req, res, options) {
            const realUrl = new URL(req.url.replace('/api', '') || '', options.target).href || '';
            res.setHeader('x-res-proxyUrl', realUrl);
        },
    },
};
