import { Notice } from 'view-ui-plus';
import log from './util.log';
import Setting from '@/setting';

const throwLogError = (msg) => {
    const err = new Error(msg);
    log.error('>>>>>> Error >>>>>>');
    throwNoticeError(err);
    throw err;
};

const throwNoticeError = (err) => {
    Notice.error({
        title: '提示',
        desc: err.message,
        duration: Setting.noticeDuration,
    });
};

export { throwLogError, throwNoticeError };
