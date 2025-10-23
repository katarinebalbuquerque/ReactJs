import { useState } from "react";
import "./Footer.css";

const Footer = () => {

    const [ano] = useState(new Date().getFullYear());

    return(
        <footer className="footer">
            <h4>FeriadosNacionais@{ano}</h4>
        </footer>
    )
}

export default Footer;