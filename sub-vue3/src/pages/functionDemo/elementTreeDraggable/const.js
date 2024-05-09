const resData = [
    {
        id: 1,
        label: '一级 1',
        isFolder: true,
        children: [
            {
                id: 4,
                label: '二级 1-1',
                isFolder: true,
                fatherId: 1,
                children: [
                    {
                        id: 9,
                        label: '三级 1-1-1',
                        fatherId: 4,
                    },
                    {
                        id: 10,
                        label: '三级 1-1-2',
                        fatherId: 4,
                    },
                ],
            },
            {
                id: 2,
                label: '一级 2',
                isFolder: true,
                fatherId: 1,
                children: [
                    {
                        id: 5,
                        label: '二级 2-1',
                        fatherId: 2,
                    },
                    {
                        id: 6,
                        label: '二级 2-2',
                        fatherId: 2,
                    },
                ],
            },
            {
                id: 3,
                label: '一级 3',
                isFolder: true,
                children: [
                    {
                        id: 7,
                        label: '二级 3-1（不能拖拽）',
                        fatherId: 3,
                    },
                    {
                        id: 8,
                        label: '二级 3-2',
                        isFolder: true,
                        fatherId: 3,
                        children: [
                            {
                                id: 11,
                                label: '三级 3-2-1',
                                fatherId: 8,
                            },
                            {
                                id: 12,
                                label: '三级 3-2-2',
                                fatherId: 8,
                            },
                            {
                                id: 13,
                                label: '三级 3-2-3',
                                fatherId: 8,
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export { resData };
