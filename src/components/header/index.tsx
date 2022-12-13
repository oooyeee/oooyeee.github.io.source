import styles from "./index.sv.gen.json"

function Header(){
    return (
        <>
            <div className={styles.button}>
                <p>Hello from header !!!</p>
                <button></button>
            </div>
        </>
    )
}


export default Header