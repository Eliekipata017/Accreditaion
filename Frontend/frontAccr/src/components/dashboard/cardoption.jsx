import {Link} from "react-router-dom";

export const Cardoption = ({text, img,href}) => {
    return (
        <Link to={`${href}`}>
            <div className={"div-option"}>
                <div className={"div-option-content"}>
                    <h3>{text}</h3>
                    <div className={"div-img"}>
                        <img src={img}/>
                    </div>
                </div>
            </div>
        </Link>
    )
}
