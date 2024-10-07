import {SideBarre} from "../components/dashboard/sideBarre.jsx";
import "../css/output/dash.css"
import {Cardstate} from "../components/dashboard/cardstate.jsx";
import {Cardoption} from "../components/dashboard/cardoption.jsx";
import cours from "../img/demande-de-citation.png"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {SideInspecteur} from "./sideBarre.jsx";


export const Dashboard =  ()  => {
    const userId = localStorage.getItem("User")
    const navigate = useNavigate()
    if (!(userId)){
        navigate("/")
    }
    const Filters = ()=>{

    }

    const states = [
        {
            number : 5,
            name : "Taches terminées",
            svg : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-area-line"
                       width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 19l4 -6l4 2l4 -5l4 4l0 5l-16 0"/>
                <path d="M4 12l3 -4l4 2l5 -6l4 4"/>
            </svg>

        },
        {
            number : 0,
            name : "Taches en cours",
            svg : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-area-line"
                       width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 19l4 -6l4 2l4 -5l4 4l0 5l-16 0"/>
                <path d="M4 12l3 -4l4 2l5 -6l4 4"/>
            </svg>
        },
        {
            number : 3,
            name : "Taches non traitées",
            svg : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chart-area-line"
                       width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 19l4 -6l4 2l4 -5l4 4l0 5l-16 0"/>
                <path d="M4 12l3 -4l4 2l5 -6l4 4"/>
            </svg>
        }
    ]


    const textOption = {href: "/employe/soumettre", text:'Gerer les demandes'}
    return (
        <div className={"dash-container"}>
            <SideInspecteur/>
            <div className={"dash-content"}>
                <div className={"text-title"}>
                    <h3>Bienvenue <br/>
                        vous Mr. Mwadi Lumbi</h3>
                </div>
                <div className={"dash-body"}>
                    <div className={"div-state"}>
                        {states.map((state,i) => <Cardstate number={state.number} name={state.name} svg={state.svg}/>)}
                    </div>
                    <Cardoption text={textOption.text} img={cours} href={textOption.href}/>
                </div>
            </div>
        </div>
    )
}
