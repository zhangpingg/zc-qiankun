const getSubApplyUrl = () => {
    let urlObj = {};
    const hostname = window.location.host;
    switch (hostname) {
        case 'localhost:8080': // 本地
            urlObj.subVue2Url = 'http://localhost:8081';
            urlObj.subVue3Url = 'http://localhost:8082';
            break;
        case 'dtdealer.zhilun-k8s.com': // 测试
            urlObj.subVue2Url = 'http://12.123.123.80:8080';
            urlObj.subVue3Url = 'http://12.123.123.80:8081';
            break;
        case '47.115.203.84:123': // 准生产（只能通过ip访问：http://47.115.203.84:123）
            urlObj.subVue2Url = 'http://47.115.203.84:111';
            urlObj.subVue3Url = 'http://47.115.203.84:222';
            break;
        case 'dtdealer.zcrubber.com': // 生产
            urlObj.subVue2Url = 'https://vue2.z2.ltd';
            urlObj.subVue3Url = 'https://vue3.z2.ltd';
            break;
    }
    return urlObj;
};

export { getSubApplyUrl };
