// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const pre_path = 'http://localhost:3200';

export const environment = {
    production: false,
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
        'editor': 'assets/editor.md/lib/'
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
