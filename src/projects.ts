import { Hydration } from "./constants"

type ProjectDetails = {
    name: string
    tech: string
    description: string
    urls: {
        image: string
        live: string
        source: string
    }
}

let projects: ProjectDetails[]  = [];

function addProject(projectDetails: ProjectDetails) {
    projects.push(projectDetails)
}

// @TODO fix text overflows in css
// function addDummyProject(){
//     addProject({
//         name: "Project D",
//         description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim.",
//         tech: "",
//         urls: {
//             image: "/assets/imgs/proj1.png",
//             live: "http://localhost:9999",
//             source: "https://oooyeee.github.io"
//         }
//     })
// }

addProject({
    name: "This website",
    description: "This is a first project entry of my projects catalog.",
    tech: "typescript reactjs sass ssg",
    urls: {
        image: "/assets/imgs/proj1.png",
        live: "http://localhost:9999",
        source: "https://oooyeee.github.io"
    }
})
// addProject({
//     name: "Project 2",
//     description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim. World",
//     tech: "html css javascript",
//     urls: {
//         image: "/assets/imgs/proj1.png",
//         live: "http://localhost:9999",
//         source: "https://oooyeee.github.io"
//     }
// })
// addProject({
//     name: "Project 3",
//     description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim. Filter",
//     tech: "html css javascript",
//     urls: {
//         image: "/assets/imgs/proj1.png",
//         live: "http://localhost:9999",
//         source: "https://oooyeee.github.io"
//     }
// })
// addProject({
//     name: "Project 4",
//     description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim. Filter",
//     tech: "html css javascript",
//     urls: {
//         image: "/assets/imgs/proj1.png",
//         live: "http://localhost:9999",
//         source: "https://oooyeee.github.io"
//     }
// })

// addProject({
//     name: "Project 5",
//     description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim. Filter",
//     tech: "html css javascript",
//     urls: {
//         image: "/assets/imgs/proj1.png",
//         live: "http://localhost:9999",
//         source: "https://oooyeee.github.io"
//     }
// })
// addProject({
//     name: "Project 6",
//     description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim. Filter",
//     tech: "html css javascript",
//     urls: {
//         image: "/assets/imgs/proj1.png",
//         live: "http://localhost:9999",
//         source: "https://oooyeee.github.io"
//     }
// })
// addProject({
//     name: "Project 7",
//     description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim. Filter",
//     tech: "html css javascript",
//     urls: {
//         image: "/assets/imgs/proj1.png",
//         live: "http://localhost:9999",
//         source: "https://oooyeee.github.io"
//     }
// })
// addProject({
//     name: "Project 8",
//     description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim. filter",
//     tech: "",
//     urls: {
//         image: "/assets/imgs/proj1.png",
//         live: "http://localhost:9999",
//         source: "https://oooyeee.github.io"
//     }
// })
// addProject({
//     name: "Project 9",
//     description: "This is a first project entry of my projects catalog. Dummy text: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a purus faucibus, ullamcorper libero sit amet, lobortis ex. Vivamus fringilla ullamcorper nisl, nec viverra mi dignissim vel. Vivamus dictum enim.",
//     tech: "",
//     urls: {
//         image: "/assets/imgs/proj1.png",
//         live: "http://localhost:9999",
//         source: "https://oooyeee.github.io"
//     }
// })
// addDummyProject()
// addDummyProject()
// addDummyProject()
// addDummyProject()
// addDummyProject()
// addDummyProject()
// addDummyProject()
// addDummyProject()
// addDummyProject()

// ====================================================
// adding projects to hydration
function addProjects(hydration: Hydration) {
    hydration.projectCatalog = projects
}

export {
    addProjects
}

export type {
    ProjectDetails
}