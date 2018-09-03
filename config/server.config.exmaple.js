const LOG_PATH = './logs/';

const serverConfig = {
    port: 3200,
    useHttps: false,
    host: 'http://localhost:3200/',
    ssl: {
        path: '',
        key: '',
        pem: ''
    },
    log: {
        appenders: {
            out: {
                type: 'console'
            },
            http: {
                type: 'dateFile',
                filename: `${LOG_PATH}http`,
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            error: {
                type: 'dateFile',
                filename: `${LOG_PATH}error`,
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            app: {
                'type': 'dateFile',
                filename: `${LOG_PATH}app`,
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            startup: {
                'type': 'dateFile',
                filename: `${LOG_PATH}startup`,
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            default: {
                type: 'dateFile',
                filename: `${LOG_PATH}default`,
                'pattern': '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            mysql: {
                type: 'dateFile',
                filename: `${LOG_PATH}mysql`,
                'pattern': '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            }
        },
        categories: {
            default: {appenders: ['out', 'default'], level: 'info'},
            http: {appenders: ['http'], level: 'info'},
            startup: {appenders: ['out', 'startup'], level: 'info'},
            error: {appenders: ['error'], level: 'error'},
            app: {appenders: ['app'], level: 'info'},
            mysql: {appenders: ['mysql'], level: 'info'}
        }
    }

};

module.exports = serverConfig;