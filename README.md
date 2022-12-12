# oooyeee.github.io.source  
    source for my github page

```
.
├── build                                   // generated static files for use in web root
├── dist                                    // SSR .js files ready for generating html
├── scripts
│   ├── ssg_build.js                        // generates html (SSG) from files in ./dist
│   └── start_local_express_server.js       // runs local express server (./build/ as web root)
├── src                                     // jsx templates source
└── ssgroot                                 // vite root directory
```


## Usage  
1) run:  
    ```
    npm run build
    ```
2) copy files from this directory to a static servers web root
    ```
    └─── build
    ```