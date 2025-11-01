const Button = ({id, text, type, action}) => {
    return(
        <button id={id} type={type} onClick={action}>{text}</button>
    )
}

export default Button;