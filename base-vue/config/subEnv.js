const subApplyUrl = {
    local: {
        subVue2Url: '//localhost:8081',
        subVue3Url: '//localhost:8082',
    },
    dev: {
        subVue2Url: '//10.1.86.247:12023',
        subVue3Url: '//10.1.86.247:12022',
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
