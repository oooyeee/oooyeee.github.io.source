// declare module "*.sass" {
//     interface Sass {
//         [property: string]: any
//     }

//     let SassModule: Sass = {}

//     export default SassModule
// }


// declare module "*.css" {
//     interface Css {
//         [property: string]: any
//     }

//     let CssModule: Sass = {}

//     export default CssModule
// }

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.styl' {
    const classes: { [key: string]: string };
    export default classes;
}