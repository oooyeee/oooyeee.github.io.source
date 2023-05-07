// This file is being used to fix CSS hot reload in development with vite
//import relative to 
// ├───src
// │   ├───pages
// │       └───css
// |            └───resume.bundle.sass
// └───wwwroot
//     └───css  -- relative from this folder
import "../../src/pages/css/resume.bundle.sass"

console.log(["LOADED CSS BUNDLE"]);