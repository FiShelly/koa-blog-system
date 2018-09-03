const pre_path = 'https://www.fishelly.top';
// const pre_path = 'http://localhost:3200';
export const environment = {
    production: true,
    loginPageInfo: {
        title: 'Fishelly Idx.',
        sub_title: 'Web Front End'
    },
    apiURL: {
        login: `${pre_path}/web/user/login`,
        logout: `${pre_path}/web/user/logout`,
        userResFul: `${pre_path}/web/user/`,
        materialResFul: `${pre_path}/web/image/`,
        materialView: `${pre_path}/web/image/view/`,
        typetagResFul: `${pre_path}/web/cattag/`,
        typetagListByType: `${pre_path}/web/cattag/list/`,
        typetagIncrement: `${pre_path}/web/cattag/increment/`,
        articleResFul: `${pre_path}/web/article/`,
        commentResFul: `${pre_path}/web/comment/`,
        cgiResFul: `${pre_path}/web/cgi/`
    },
    webURL: {
        'index': pre_path,
    },
    path: {
        'editor': 'public/blog-admin/assets/editor.md/lib/'
    }
};
