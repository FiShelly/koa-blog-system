const pre_path = 'http://localhost:3200';

export const environment = {
    production: false,
    loginPageInfo: {
        title: 'Fishelly Idx.',
        sub_title: 'Web Front End'
    },
    apiURL: {
        userResFul: `${pre_path}/api/user/`,
        articleResFul: `${pre_path}/api/article/`,
        materialView: `${pre_path}/api/image/view/`,
        typetagResFul: `${pre_path}/api/cattag/`,
        commentResFul: `${pre_path}/api/comment/`
    },
    webURL: {
        'index': pre_path
    }
};
