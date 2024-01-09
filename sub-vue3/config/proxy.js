const envApi = {
    dev: {
        // api: "http://dtapi.zhilun-k8s.com/api/puxian"
        //api: "http://px.zhilun-k8s.com",
        api: 'http://dtra.zhilun-k8s.com',
    },
    uat: {
        api: 'https://dtapi-t.zcrubber.com/api/puxian',
    },
    prod: {
        api: 'https://dtapi.zcrubber.com/api/puxian',
    },
    environment: 'dev',
};

export default {
    '/api': {
        target: envApi[envApi.environment].api,
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
    },
};
