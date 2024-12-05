import { resolveComponent } from 'vue';
import { isValidVal } from '@/libs/util.tool';
import { getLabelByValue } from '@/dicts.js';

/**
 * 状态Badge
 * 示例：badgeRenderColumn({ title: '审核状态', key: 'ii' }, aduitStatusDict)
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
 */
const tagsRenderColumn = (options, onClose) => {
    return {
        title: '标签',
        minWidth: 250,
        render: (h, p) => {
            const value = p.row[options?.key || 'tagList'];
            if (value?.length > 0) {
                return h('div', [
                    value.map((tagItem) => {
                        return h(
                            resolveComponent('Tag'),
                            {
                                type: 'border',
                                color: 'primary',
                                closable: true,
                                onClose: () => {
                                    console.log(33);
                                    onClose?.(p.row, tagItem);
                                },
                            },
                            () => h('span', {}, tagItem.tagName)
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

export { badgeRenderColumn, tagsRenderColumn };
