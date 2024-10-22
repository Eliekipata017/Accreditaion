import {SideBarre} from "../components/dashboard/sideBarre.jsx";
import "../css/output/dash.css"
import {Cardstate} from "../components/dashboard/cardstate.jsx";
import {Cardoption} from "../components/dashboard/cardoption.jsx";
import cours from "../img/demande-de-citation.png"
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {SideInspecteur} from "./sideBarre.jsx";
import axios from "axios";


export const Dashboard =  ()  => {
    const userId = localStorage.getItem("inspGen")
    const navigate = useNavigate()

    if (!(userId) || userId == "undefined"){
        navigate('/')
    }
    const [dmd, setDmd] = useState(false)
    const [user, setUser] = useState(false)
    const [dmdNonEncours, setDmdNonEncours] = useState(false)
    const [dmdEnCours, setDmdEnCours] = useState(false)
    const [dmdFinis, setDmdFinis] = useState(false)


    const fetchData = async ()=>{
        const demandes = await axios.get('http://localhost:3000/getDemandes')
        const user = await axios.post(`http://localhost:3000/getInspecteur`, {id: parseInt(userId)})

        const array_dmd = demandes.data
        const user_data = user.data.data
        setDmd(array_dmd)
        setUser(user_data)

    }

    useEffect( ()=>{
        try {
            fetchData()
        }catch (e) {
            alert(e)
        }
    },[])

    useEffect(() => {

        if (dmd){
            const DnonNenCours = dmd.filter((dm)=> dm.statut == 0)
            const DnonEncours = dmd.filter((dm)=> dm.statut == 1)
            const DFinis = dmd.filter((dm)=> dm.statut == 2)
            setDmdNonEncours(DnonNenCours)
            setDmdEnCours(DnonEncours)
            setDmdFinis(DFinis)
        }
    }, [dmd]);

    const Filters = ()=>{

    }

    const states = [
        {
            number : dmdFinis && dmdFinis.length,
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
            number : dmdEnCours && dmdEnCours.length,
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
            number : dmdNonEncours && dmdNonEncours.length,
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

    const textOption = {href: "/inspecteur/generale/demandes", text:'Gerer les demandes'}
    return (
        <div className={"dash-container"}>
            <SideInspecteur/>
            <div className={"dash-content"}>
                <div className={"text-title"}>
                    <h3>Bienvenue <br/>
                        vous Mr. {user && user.nom}</h3>
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
