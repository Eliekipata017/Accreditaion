import '../css/output/tasks.css'
import '../css/output/dash.css'
import {SideInspecteur} from "./sideBarre.jsx";
import {Cardstate} from "../components/dashboard/cardstate.jsx";
import {Cardoption} from "../components/dashboard/cardoption.jsx";
import cours from "../img/demande-de-citation.png";
import {useEffect, useState} from "react";

export const Demandes = () => {
    const [visible,setVisible] = useState(false)
    useEffect(()=>{
        if (visible){
            let body = document.querySelector('body')
            body.classList.add('body-visible')
        }
        else{
            let body = document.querySelector('body')
            body.classList.remove('body-visible')
        }
    },[visible])
    const handleClick = (e)=>{
        setVisible(true)
    }
    const close = () =>{
        setVisible(false)
    }

    return (
        <>
            <div className={"dash-container"}>
                <SideInspecteur/>
                <div className={"dash-content"}>
                    <div className={"div-tasks"}>
                        <div className={"div-task-title"}>
                            <h3>Demandes</h3>
                            <div className={"div-filter"}>
                                <select name="" id="">
                                    <option value="">Elie</option>
                                </select>
                            </div>
                        </div>
                        <div className={"div-task-content"}>
                            <table>
                                <thead>
                                    <tr>
                                        <td>Resp Etb</td>
                                        <td>Email</td>
                                        <td>Etat</td>
                                        <td>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>Elie Lunda kajila</td>
                                    <td>lunga@gmail.com</td>
                                    <td><span>TERMINE</span></td>
                                    <td><button onClick={handleClick}>Details</button></td>
                                </tr>
                                <tr>
                                    <td>Elie Lunda kajila</td>
                                    <td>lunga@gmail.com</td>
                                    <td><span>TERMINE</span></td>
                                    <td><button>Details</button></td>
                                </tr>
                                <tr>
                                    <td>Elie Lunda kajila</td>
                                    <td>lunga@gmail.com</td>
                                    <td><span>TERMINE</span></td>
                                    <td><button>Details</button></td>
                                </tr>
                                <tr>
                                    <td>Elie Lunda kajila</td>
                                    <td>lunga@gmail.com</td>
                                    <td><span>TERMINE</span></td>
                                    <td><button>Details</button></td>
                                </tr>
                                <tr>
                                    <td>Elie Lunda kajila</td>
                                    <td>lunga@gmail.com</td>
                                    <td><span>TERMINE</span></td>
                                    <td><button>Details</button></td>
                                </tr>
                                <tr>
                                    <td>Elie Lunda kajila</td>
                                    <td>lunga@gmail.com</td>
                                    <td><span>TERMINE</span></td>
                                    <td><button>Details</button></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={"card-details"}>
                            <div className={"card-head"}>
                                <h3>Details</h3>
                                <span onClick={close}></span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
