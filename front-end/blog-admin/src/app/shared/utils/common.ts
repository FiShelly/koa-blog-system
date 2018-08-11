import {MenuItem} from '../../models';


function createMenuData(): MenuItem[] {
    return MENUDATA.map(val => {
        return new MenuItem(val);
    });
}

const MENUDATA = [
    {
        icon: '&#xe60b;',
        text: '文章管理',
        isLink: false,
        type: 'post',
        link: ''
    },
    {
        icon: '',
        text: '文章列表',
        isLink: true,
        type: 'post-list',
        link: '/post/list'
    },
    {
        icon: '',
        text: '发布文章',
        isLink: true,
        type: 'post-publish',
        link: '/post/publish'
    },
    {
        icon: '&#xe66e;',
        text: '标签和类别',
        isLink: true,
        type: 'type-tag',
        link: '/typetag'
    },
    {
        icon: '&#xe73f;',
        text: '素材库',
        isLink: true,
        type: 'materials',
        link: '/materials'
    },
    {
        icon: '&#xe65d;',
        text: '评论管理',
        isLink: true,
        type: 'comments',
        link: '/comments'
    },
    {
        icon: '&#xe625;',
        text: '关于我',
        isLink: true,
        type: 'about-me',
        link: '/about'
    }
];

const common = {
    crcreateMenuDataeat: createMenuData
};

export {
    common
};
