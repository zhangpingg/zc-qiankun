import { resolveComponent } from 'vue';
import { isValidVal } from '@/libs/util.tool';
import { getLabelByValue } from '@/dicts.js';

/**
 * 状态Badge
 * 示例1：badgeRenderColumn(null, aduitStatusDict)
 * 示例2：badgeRenderColumn({ title: '审核状态', key: 'ii' }, aduitStatusDict)
 */
const badgeRenderColumn = (options, dict) => {
    return {
        title: '状态',
        minWidth: 120,
        render: (h, p) => {
            const value = p.row[options?.key || 'status'];
            const badge = h(resolveComponent('Badge'), {
                color: getLabelByValue(dict, value, 'color'),
                text: getLabelByValue(dict, value),
            });
            return h('div', [isValidVal(value) ? badge : '-']);
        },
        ...options,
    };
};

/**
 * Tags标签列表 支持删除单个标签
 * onClose(row:表格行, tagItem:所删除的标签) 删除单个标签的方法
 * 示例1：tagsRenderColumn(null, (row, item) => deleteTag(row, item))
 * 示例2：tagsRenderColumn({ title: '某种标签', key: 'jj' }, (row, item) => deleteTag(row, item))
 */
const tagsRenderColumn = (options, onClose) => {
    return {
        title: '标签',
        minWidth: 250,
        render: (h, p) => {
            const list = p.row[options?.key || 'tagList'];
            if (list?.length > 0) {
                return h('div', [
                    list.map((item) => {
                        return h(
                            resolveComponent('Tag'),
                            {
                                type: 'border',
                                color: 'primary',
                                closable: true,
                                onOnClose: () => {
                                    onClose?.(p.row, item);
                                },
                            },
                            () => item.label
                        );
                    }),
                ]);
            } else {
                return h(resolveComponent('Badge'), {
                    color: 'red',
                    text: '暂无标签',
                });
            }
        },
        ...options,
    };
};

const previewImgRenderColumn = (options) => {
    return {
        title: '图片',
        minWidth: 220,
        key: 'kk',
        render: (h, p) => {
            if (!p.row.kk || p.row.kk.length === 0) {
                return h('div', '-');
            }
            let imgList = (p.row.kk || []).map((item) => {
                console.log(11, item);
                return h(
                    'div',
                    {
                        class: 'mr-5 mt-2 mb-2',
                        style: {
                            position: 'relative',
                            width: '60px',
                            height: '40px',
                            display: 'inline-block',
                        },
                    },
                    [
                        h('img', {
                            attrs: {
                                src: item,
                                key: item,
                                alert: item,
                            },
                            style: {
                                width: '60px',
                                height: '40px',
                            },
                        }),
                        h(resolveComponent('Icon'), {
                            attrs: { type: 'ios-add-circle-outline' },
                            style: {
                                'z-index': 1,
                                position: 'absolute',
                                bottom: '2px',
                                right: '2px',
                                color: '#fff',
                            },
                        }),
                    ]
                );
            });
            return h(
                'div',
                {
                    class: 'pt-2',
                    directives: [
                        {
                            name: 'viewer',
                            value: { movable: false },
                            expression: '{ movable: false }',
                        },
                    ],
                    style: {
                        width: '220px',
                    },
                },
                imgList
            );
        },
    };
};

export { badgeRenderColumn, tagsRenderColumn, previewImgRenderColumn };
