
let  b =
    { _id: '5d79d39eba4a7d2368f90e47',
        title: 'TestArticle_100 Chenged',
        author: 'Djoan Rouling',
        description: 'Very interesting book',
        images:
            [ { kind: 'thumbnail', url: 'http://picsum.photos/536/354' },
                { kind: 'detail', url: 'http://picsum.photos/200/300/?blur' } ] };


let a =
{ _id: '5d79d39eba4a7d2368f90e47',
    title: 'TestArticle_1',
    author: 'Djoan Rouling',
    description: 'Very interesting book',
    images:
    [ { _id: '5d79dea3bd65462368bef638',
        kind: 'thumbnail',
        url: 'http://picsum.photos/536/354' },
        { _id: '5d79dea3bd65462368bef637',
            kind: 'detail',
            url: 'http://picsum.photos/200/300/?blur' } ]
};


Object.keys(a).forEach(key => a[key] = b[key] || a[key]);

console.log(a)