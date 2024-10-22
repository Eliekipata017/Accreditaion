import '../css/output/tasks.css'
import '../css/output/dash.css'
import {SideInsPector} from "./sideInsPector.jsx";
import {Cardstate} from "../components/dashboard/cardstate.jsx";
import {Cardoption} from "../components/dashboard/cardoption.jsx";
import cours from "../img/demande-de-citation.png";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {dataForma} from "../hooks/utils.js";
import Inputs from "../components/Forms/inputs.jsx";
import {useForm} from "react-hook-form";


export const DemandesIns = () => {
    const userId = localStorage.getItem("inspUser")
    const navigate = useNavigate()

    if (!(userId) || userId == "undefined"){
        navigate('/')
    }
    const [visible,setVisible] = useState(false)

    const [detailsDmd,setDetailsDmd] = useState(false)
    const [inspecteur,setInspecteur] = useState(false)
    const [dmd, setDmd] = useState(false)
    const [idDmd, setIdDmd] = useState(false)
    const {register,handleSubmit} = useForm()

    const fetchData = async ()=>{
        const demandes = await axios.post('http://localhost:3000/getinsp', {id : userId})
        const array_dmd = demandes.data.data
        setDmd(array_dmd)
    }

    const setDetails = (idDmd)=>{
        console.log(dmd)
        const detailDmd = dmd.filter((dm)=> dm.id_demande == idDmd)
        console.log(detailDmd)
        setDetailsDmd(detailDmd)
    }

    const submittAffect = async (data)=>{
        const inspData = []
        for (let [cle ,valeur] of Object.entries(data)){
            if (!(cle == "dateInsp")){
                if (valeur){
                    inspData.push(parseInt(valeur))
                }
            }
        }
        const Ndata = {...data, inspecteurs : inspData,demande:parseInt(idDmd),type_inspection:"e"}
        try {
            const response = await axios.post('http://localhost:3000/ajouterInspection',Ndata)
            console.log(response.data.Success)
        }catch (e) {
            console.log(e)
        }
    }

    useEffect( ()=>{
        if (!(userId)){
            navigate("/")
        }
        try {
            fetchData()
        }catch (e) {
            alert(e)
        }
    },[])
    useEffect(()=>{
        if (idDmd){
            setDetails(idDmd)
        }
        if (visible){
            let body = document.querySelector('body')
            body.classList.add('body-visible')
        }
        else{
            let body = document.querySelector('body')
            body.classList.remove('body-visible')
        }
    },[visible,dmd,inspecteur])

    const handleClick = (e)=>{
        const id = e.target.getAttribute('name')
        setIdDmd(id)
        setVisible(true)
    }
    const close = () =>{
        setVisible(false)
    }

    return (
        <>
            <div className={"dash-container"}>
                <SideInsPector/>
                <Link to={""}></Link>
                <div className={"dash-content"}>
                    <div className={"div-tasks"}>
                        <div className={"div-task-title"}>
                            <h3>Demandes</h3>
                            <div className={"div-filter"}>
                                <select name="" id="">
                                    <option value="">selectionner une option</option>
                                </select>
                            </div>
                        </div>
                        <div className={"div-task-content"}>
                            <table>
                                <thead>
                                <tr>
                                    <td>Date inspection</td>
                                    <td>Adresse</td>
                                    <td>tour</td>
                                    <td>Etat</td>
                                    <td>Action</td>
                                </tr>
                                </thead>
                                <tbody>
                                {console.log(dmd)}
                                {
                                    dmd && dmd.inspections.map((dm)=>
                                        <tr>
                                            <td>{dm.inspection.date_inspection}</td>
                                            <td>{dm.inspection.demandes[0].adresse}</td>
                                            <td><span>{
                                                dm.inspection.statut == "0" ? 1 : 2
                                            }/2</span></td>
                                            <td><span>{dm.inspection.statut == "0" ? <span>NON ENCOURS</span> : dm.inspection.statut == "1" ?
                                                <span>EN COURS</span> : <span>TERMINE</span>}</span>
                                            </td>
                                            <td>
                                                {dm.inspection.statut <= 2 &&
                                                    <Link to={`/inspecteur/evaluer/${dm.inspection.demandes[0].id_demande}`}>Evaluer</Link>}
                                            </td>
                                        </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className={"card-details"}>
                            <div className={"card-head"}>
                                <h3>Details</h3>
                                <span onClick={close}></span>
                            </div>
                            <div className={"d-card-body"}>
                                <div className={"d-list"}>
                                    <form onSubmit={handleSubmit(submittAffect)}>
                                        {
                                            detailsDmd && <h5>{dataForma(detailsDmd[0].date_demande)}</h5>
                                        }
                                        {
                                            detailsDmd && detailsDmd[0].statut == 0 ?
                                                <div className={""}>
                                                    <h4>Affecter inspecteur</h4>
                                                    <form onSubmit={handleClick}>
                                                        <div className={"d-ins"}>
                                                            {
                                                                inspecteur.map((insp,i)=> <li key={i}>
                                                                    <input type="checkbox"
                                                                           value={insp.id_inspecteur} name={"list"+i}
                                                                           {...register("list"+i)} id={i}/>

                                                                    <label htmlFor={i}>{insp.nom}</label>
                                                                </li>)
                                                            }
                                                        </div>
                                                        <Inputs register={register}
                                                                type={"date"} name={"dateInsp"} placeholder={""}/>
                                                    </form>
                                                </div> : ""
                                        }
                                        <input type="submit" value={"Envoyer"}/>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
