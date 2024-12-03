/**
 * @param {function} h 渲染函数
 * @param params
 * @param fn
 * @return {any}
 */
const renderButton = function (h, params, fn) {
    let cb = () => {
        fn && fn();
    };
    let btn = (cb) => {
        return (
            <Button
                size="small"
                class="ml4 mr4"
                disabled={params.disabled}
                ghost={params.ghost}
                loading={params.loading}
                onClick={cb}
                style={params.style}
                type={params.type ? params.type : 'default'}
            >
                {params.text}
            </Button>
        );
    };

    let btnWithCfm = (cb) => {
        return (
            <Poptip confirm transfer title={params.confirmText ? params.confirmText : '确定删除吗?'} onOn-ok={cb}>
                {btn(() => {})}
            </Poptip>
        );
    };
    if (params.confirm) {
        return btnWithCfm(cb);
    }
    return btn(cb);
};

export { renderButton };
