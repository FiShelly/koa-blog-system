const serverConfig = {
    prot: 3200,
    host: 'http://fishelly.top',
    log: {
        appenders: {
            out: {
                type: 'console'
            },
            http: {
                type: 'dateFile',
                filename: './logs/http',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            error: {
                type: 'dateFile',
                filename: './logs/error',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            app: {
                'type': 'dateFile',
                'filename': './logs/app',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            startup: {
                'type': 'dateFile',
                'filename': './logs/startup',
                pattern: '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            default: {
                type: 'dateFile',
                filename: './logs/default',
                'pattern': '-yyyy-MM-dd.log',
                alwaysIncludePattern: true
            },
            mysql: {
                type: 'dateFile',
                filename: './logs/mysql',
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