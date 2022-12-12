// This file is being used to fix CSS hot reload in development with vite
//import relative to 
// ├───src
// │   ├───pages
// │       └───css
// |            └───main.bundle.sass
// └───wwwroot
//     └───css  -- relative from this folder
import "../../src/pages/css/main.bundle.sass"

console.log(["LOADED CSS BUNDLE"]);