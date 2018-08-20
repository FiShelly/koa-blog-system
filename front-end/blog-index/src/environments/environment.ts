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
        userResFul: `${pre_path}/api/user/`,
        articleResFul: `${pre_path}/api/article/`,
        materialView: `${pre_path}/api/image/view/`,
        typetagResFul: `${pre_path}/api/cattag/`,
        commentResFul: `${pre_path}/api/comment`
    },
    webURL: {
        'index': pre_path
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
