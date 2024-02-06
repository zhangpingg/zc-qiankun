import dayjs from 'dayjs';
import Setting from '@/setting';
import packageJson from '../../package.json';

// 以下是获取前缀，并在控制台打印相关信息
const hostname = window.location.hostname;
const testName = 'dtdealer.zhilun-k8s.com'; // 测试
const prodTName = 'dtdealer-t.zcrubber.com'; // 准生产
let titlePrefix = ''; // 网页标题前缀
if (process.env.NODE_ENV === 'development') {
    titlePrefix = '【开发】';
} else if (hostname.indexOf(testName) !== -1) {
    titlePrefix = '【测试】';
} else if (hostname.indexOf(prodTName) !== -1) {
    titlePrefix = '【准生产】';
}
console.log(
    `%c Environment %c ${titlePrefix || '【生产】'}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #42c02e'
);
console.log(
    `%c Version %c ${packageJson.version}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1475b2'
);
console.log(
    `%c BuildTime %c ${dayjs().format('YYYY-M-D HH:mm:ss')}`,
    'padding: 1px; border-radius: 3px 0 0 3px; color: #fff; background: #606060',
    'padding: 1px 5px 1px 1px; border-radius: 0 3px 3px 0; color: #fff; background: #1475b2'
);

/**
 * @description 修改网页标题
 * @param {Object} title-标题，count-消息数量
 */
const modifyTitle = ({ title, count }) => {
    let fullTitle = title ? `${title} - ${Setting.titleSuffix}` : Setting.titleSuffix;
    if (count) {
        fullTitle = `(${count}条消息)${fullTitle}`;
    }
    window.document.title = titlePrefix + fullTitle;
};

export { titlePrefix, modifyTitle };
