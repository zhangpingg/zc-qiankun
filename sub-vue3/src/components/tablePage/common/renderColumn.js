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
                                    console.log(11);
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

export { badgeRenderColumn, tagsRenderColumn };
