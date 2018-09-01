const serverConfig = {
    prot: 3200,
    host: 'http://fishelly.top',
    log: {
        'appenders': [
            {
                'type': 'console'
            },
            {
                'type': 'clustered',
                'appenders': [
                    {
                        'type': 'dateFile',
                        'filename': 'startup.log',
                        'pattern': '-yyyy-MM-dd',
                        'category': 'startup'
                    },
                    {
                        'type': 'dateFile',
                        'filename': 'http.log',
                        'pattern': '-yyyy-MM-dd',
                        'category': 'http'
                    },
                    {
                        'type': 'file',
                        'filename': 'app.log',
                        'maxLogSize': 10485760,
                        'numBackups': 5
                    },
                    {
                        'type': 'logLevelFilter',
                        'level': 'ERROR',
                        'appender': {
                            'type': 'file',
                            'filename': 'errors.log'
                        }
                    }
                ]
            }
        ]
    }
};

module.exports = serverConfig;