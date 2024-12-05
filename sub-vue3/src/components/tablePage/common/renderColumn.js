import { resolveComponent } from 'vue';
import { isValidVal } from '@/libs/util.tool';

/**
 * 状态Badge 只有两种 => 0/false:error 1/true:success
 * 默认['禁用', '启用']，可适用['下架', '上架']['否','是']等
 */
const statusBadgeRenderColumn = (options, textArr = ['禁用', '启用']) => {
    return {
        title: '状态',
        minWidth: 100,
        render: (h, p) => {
            const value = p.row[options?.key || 'status'];
            const badge = h(resolveComponent('Badge'), {
                status: value ? 'success' : 'error',
                text: value ? textArr[1] : textArr[0],
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
                                onClose: () => onClose?.(p.row, tagItem),
                            },
                            tagItem.tagName
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

export { statusBadgeRenderColumn, tagsRenderColumn };

