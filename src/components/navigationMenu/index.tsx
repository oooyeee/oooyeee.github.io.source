
import style from "./index.sv.gen.json"

function NavigationMenu() {
    return (<>
        <nav className={style.navigationMenu}>
            <a href="#projects">projects</a>
            <a href="#about">about</a>
            <a href="#contacts">contacts</a>
        </nav>
        <label htmlFor="checkbox--nav" id={style.navigationBurger}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" style={{stroke: "white", strokeWidth: 5, strokeLinecap: "round"}} >
                <path d="M 8,17.5 L 92,17.5"></path>
                <path d="M 8,50 L 92,50"></path>
                <path d="M 8,82.5 L 92,82.5"></path>
            </svg>
        </label>
    </>)
}

export default NavigationMenu