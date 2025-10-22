import "./Button.css";

const Button = ({id, texto, tipo, action}) => {
    return(
        <button onClick={action} id={id} type={tipo}>{texto}</button>
    )
}

export default Button;