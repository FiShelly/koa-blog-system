const dbConfig = {
    username: 'root',
    password: 'root',
    dbname: 'koa-blog',
    options: {
        'host': 'localhost',
        'port': 3306,
        'dialect': 'mysql',
        'timezone': '+08:00',
        'pool': {
            'max': 15,
            'min': 0,
            'idle': 10000
        }
    }
};