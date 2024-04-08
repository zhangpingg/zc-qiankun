const getSubApplyUrl = () => {
    let urlObj = {};
    const hostname = window.location.host;
    switch (hostname) {
        case 'localhost:8080': // 本地
            urlObj.subVue2Url = 'http://localhost:8081';
            urlObj.subVue3Url = 'http://localhost:8082';
            break;
        case 'aaa.com': // 测试
            urlObj.subVue2Url = 'http://12.123.123.80:8080';
            urlObj.subVue3Url = 'http://12.123.123.80:8081';
            break;
        case 'bbb.com': // 准生产
            urlObj.subVue2Url = 'http://12.123.123.80:8080';
            urlObj.subVue3Url = 'http://12.123.123.80:8081';
            break;
        case 'dccc.com': // 生产
            urlObj.subVue2Url = 'https://vue2.z2.xxx';
            urlObj.subVue3Url = 'https://vue3.z2.yyy';
            break;
    }
    return urlObj;
};

export { getSubApplyUrl };
