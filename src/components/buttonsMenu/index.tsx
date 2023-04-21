
import style from "./index.sv.gen.json"

function ButtonsMenu(){
    return (<div className={style.buttonsMenu}>
        <label id={style.animationSwitch} htmlFor="checkbox--animation-switch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="M 12.5,50 L 37.5,37.5"></path>
                <path d="M 37.5,37.5 L 50,12.5"></path>
                <path d="M 50,12.5 L 62.5,37.5"></path>
                <path d="M 62.5,37.5 L 87.5,50"></path>
                <path d="M 87.5,50 L 62.5,62.5"></path>
                <path d="M 62.5,62.5 L 50,87.5"></path>
                <path d="M 50,87.5 L 37.5,62.5"></path>
                <path d="M 37.5,62.5 L 12.5,50"></path>
            </svg>
        </label>
        <label id={style.fireworksSwitch} htmlFor="checkbox--fireworks-switch">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                <path d="M 56,56 L 90,90"></path>
                <path d="M 45,8 L 45,30"></path>
                <path d="M 8,45 L 30,45"></path>
                <path d="M 60,45 L 82,45"></path>
                <path d="M 45,60 L 45,82"></path>
                <path d="M 34,34 L 18,18"></path>
                <path d="M 56,34 L 72,18"></path>
                <path d="M 34,56 L 18,72"></path>
            </svg>
        </label>
    </div>)
}

export default ButtonsMenu