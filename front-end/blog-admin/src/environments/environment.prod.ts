// const pre_path = 'https://www.fishelly.top';
// const pre_path = 'http://localhost:3200';
const pre_path = '/';

export const environment = {
    production: true,
    loginPageInfo: {
        title: 'Fishelly Idx.',
        sub_title: 'Web Front End'
    },
    apiURL: {
        login: `/web/user/login`,
        logout: `/web/user/logout`,
        userResFul: `/web/user/`,
        materialResFul: `/web/image/`,
        materialView: `/web/image/view/`,
        typetagResFul: `/web/cattag/`,
        typetagListByType: `/web/cattag/list/`,
        typetagIncrement: `/web/cattag/increment/`,
        articleResFul: `/web/article/`,
        commentResFul: `/web/comment/`,
        cgiResFul: `/web/cgi/`
    },
    webURL: {
        'index': pre_path,
    },
    path: {
        'editor': 'public/blog-admin/assets/editor.md/lib/'
    }
};
