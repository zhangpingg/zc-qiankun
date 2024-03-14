const subApplyUrl = {
    local: {
        subVue2Url: '//localhost:8081',
        subVue3Url: '//localhost:8082',
    },
    test: {
        subVue2Url: '//10.1.86.200:31038',
        subVue3Url: '//10.1.86.200:32421',
    },
    uat: {
        subVue2Url: '',
        subVue3Url: '',
    },
    prod: {
        subVue2Url: '',
        subVue3Url: '',
    },
    environment: 'local',
};

export { subApplyUrl };
