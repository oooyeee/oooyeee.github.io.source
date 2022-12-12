import hi from "../index.hydration.json"

type HelloWorld = {
    hello: string,
    world: string
}

let helloworld: HelloWorld = {
     hello: "Henloo ",
     world: "WorlD"
}

const another = "_const_another_"
console.log(another);


console.log(["HW", helloworld, hi.hello]);
