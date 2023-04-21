import type { CatalogItemProps } from "../components/catalogItem"

type Index_Hydration_Json = {
    title: string
    catalog: CatalogItemProps[]
}

let hydration: Index_Hydration_Json = {
    title: "yaro.pt",
    catalog: [
        {
            json: {
                title: "TBA",
                image: "/assets/asd.jpg",
                header: "tba",
                text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi laborum vero quaerat quam delectus dolore sed dolorum quibusdam laudantium ullam nobis deserunt, deleniti consequatur corporis? asdasd asdasd asdasdasd sad sad asdasdasd asdasd asdasd",
                links: {
                    live: "https://oooyeee.github.io",
                    source: "https://github.com/oooyeee"
                }
            }
        }
    ]
}

export default hydration