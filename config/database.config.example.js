const dbConfig = {
    username: 'root',
    password: 'root',
    dbname: 'koa-blog',
    options: {
        logging: true,
        'host': 'localhost',
        'port': 3306,
        'dialect': 'mysql',
        'timezone': '+08:00',
        'pool': {
            'max': 3,
            'min': 0,
            'idle': 10000
        }
    }
};

module.exports = dbConfig;