import {Link} from "react-router-dom";
import {useEffect} from "react";

export const SideBarre = ({links}) => {
    const handleClick = (e)=>{
        const links = document.querySelectorAll('a')
        links.forEach((elemnt,i)=>{
                if (elemnt == e.target){
                    localStorage.setItem('pLink',i)
                }
        })
    }



    return (
        <div className={"sidebarre"}>
                <div className={"sidecontent"}>
                    <div className={"title-div"}>
                        <h3>Acccreditation</h3>
                    </div>
                    <div className={"side-barre-navigation"}>
                        {links.map((link,i) => <Link to={link.href} key={i} onClick={ handleClick}>
                            <div className={"link-div"}>
                                <span>{link.svg}</span>
                                <span>{link.link}</span>
                            </div>
                        </Link>)}
                    </div>
                </div>
        </div>
    )
}
