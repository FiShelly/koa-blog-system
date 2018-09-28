# koa-blog-system
This is a blog system which use koa.js, mysql, js, html, css, angular6 to code it.

# the system directories
```
.
├── app // be source code
│   ├── controllers
│   ├── models
│   ├── routes
│   │   ├── api
│   │   ├── page
│   │   └── web
│   └── services
├── bin
├── config  // project config
├── front-end  // fe source code
│   ├── blog-admin // blog admin manager system
│   └── blog-index // blog index
├── logs
├── middleware  // koa middleware
├── public  // fe code build in there.
│   ├── blog-admin
│   ├── blog-index  // use ng6 ssr.
│   │   ├── browser
│   │   └── server
│   ├── error // error page style
│   │   └── css
│   ├── images
│   └── images-bg
├── test
├── uploads
├── utils
└── views  // error page.
    └── error
```

# how to use
before you use, you should copy database.config.example.js,server.config.exmaple.js in config dir.
```sh
$ cd confg
$ copy database.config.example.js database.config.js
$ copy server.config.example.js server.config.js
```
And then, according to your actual situation, you can modify these 2 config file.
- PS.  The config file is relatively simple, so I don't want to explain detail.
```sh
$ vim  config.file.
```

At last, you should do install lib, and run it.
```sh
$ npm install
// if your environment is dev, you should use:
$ npm run start:dev
// if your environment is production, you should make sure you had installed pm2.
// if your not installed pm2, you can use this command to installed it.
$ npm install -g pm2
// and then use this command to deploy system.
$ npm run start:prod
```

# how to build
Use blog-admin as example.
```sh
$ cd front-end/blog-admin
// dev environment
$ npm run build:dev
// prod environment
$ npm run build:prod

// all command you can see package.json
```

# Online
My blog is use this system, you can visit it.
- [Fishelly Idx. (https://www.fishelly.top)](https://www.fishelly.top)

# The last.
 If you have any question, you can submit issuse for me.

# License

[MIT](LICENSE)