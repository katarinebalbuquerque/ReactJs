const Input = ({text, htmlFor,type,name,placeholder,onChange, defaultValue}) => {
    return(
        <>
        <label htmlFor={htmlFor}>{text}</label><br />
        <input required autoComplete="off" defaultValue={defaultValue} type={type} name={name} onChange={onChange} placeholder={placeholder}/>
        </>
    )
}

export default Input;