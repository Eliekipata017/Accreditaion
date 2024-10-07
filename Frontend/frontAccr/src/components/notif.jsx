import './notif.css'
import {useEffect, useState} from "react";
export const Notif = ({text,visible, onclick}) => {

    const [classAnother,setclassAnother] = useState("")
    useEffect(()=>{
        let v =  visible ? "notifVisible" : ""
        setclassAnother(v)
        console.log(classAnother)
    },[visible,classAnother])
    return (
        <div className={`barreNotif ${classAnother}`}>
            <div className={`barreNotifContent ${classAnother}`}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="28"
                                         height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none"
                                         stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M5 12l5 5l10 -10"/>
                    </svg>
                </span>

                <p>{text}</p>
                <svg onClick={onclick} xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="28"
                     height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#00b341" fill="none"
                     stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M18 6l-12 12"/>
                    <path d="M6 6l12 12"/>
                </svg>
            </div>
        </div>
    )
}
