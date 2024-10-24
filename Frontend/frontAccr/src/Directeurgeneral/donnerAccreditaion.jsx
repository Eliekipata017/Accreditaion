import '../css/output/tasks.css'
import '../css/output/dash.css'
import {SideDG} from "./sideDG.jsx";
import {Cardstate} from "../components/dashboard/cardstate.jsx";
import {Cardoption} from "../components/dashboard/cardoption.jsx";
import cours from "../img/demande-de-citation.png";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {dataForma, reset} from "../hooks/utils.js";
import Inputs from "../components/Forms/inputs.jsx";
import {useForm} from "react-hook-form";
import * as http2 from "node:http2";


export const DonnerAccreditaion = () => {

    const userId = localStorage.getItem("inspGen")
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
        const demandes = await axios.get('http://localhost:3000/getDemandes')
        const inspecteurs = await axios.get('http://localhost:3000/getInspeceur')
        console.log(demandes)
        const array_dmd = demandes.data
        const inspec = inspecteurs.data
        setInspecteur(inspec.data)
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
        const Ndata = {...data, inspecteurs : inspData,demande:parseInt(idDmd),type_inspection:"demande"}
        try {
            const response = await axios.post('http://localhost:3000/ajouterInspection',Ndata)
            console.log(response.data)
            if (response.data.Success){
                alert(response.data.Success)
            }else{
                alert(response.data.Error)
            }
        }catch (e) {
            alert(e.message)
        }
        reset()
    }

    useEffect( ()=>{
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

    const onClickSubmit = async (e)=>{
        const id = e.target.getAttribute("data-value")
        const action = e.target.getAttribute("data-value-action")

        const response = await axios.post(`http://localhost:3000/donnerAccreditation`,{idDemande : parseInt(id),action:action})
        console.log(response)
    }
    const close = () =>{
        setVisible(false)
    }

    return (
        <>
            <div className={"dash-container"}>
                <SideDG/>
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
                                    <td>Resp Etb</td>
                                    <td>Email</td>
                                    <td>tour</td>
                                    <td>Etat</td>
                                    <td>Action</td>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    dmd && dmd.map((dm)=>
                                        <tr>
                                            <td>{dm.nom}</td>
                                            <td>{dm.email}</td>
                                            <td><span>{dm.inspection == null ? 0: dm.inspection.evaluations.length }/2</span></td>
                                            <td><span>{dm.statut == 0 ? <span>NON ENCOURS</span> : dm.statut == 1 || dm.statut == 2 ?
                                                <span>EN COURS</span> : <span>TERMINE</span>}</span>
                                            </td>
                                            <td>
                                                <button onClick={handleClick} name={dm.id_demande}>Details</button>
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
                                {
                                    detailsDmd && <h4>Demande soumis le {dataForma(detailsDmd[0].date_demande)}</h4>
                                }
                                {
                                    detailsDmd && detailsDmd[0].statut > 1 && detailsDmd[0].statut <= 3
                                        ?
                                        <div className={"div-resultat"}>
                                            {
                                                detailsDmd && detailsDmd[0].inspections.map((inps, i) =>
                                                    <div>
                                                        {inps.evaluations.map((evl,key) =>
                                                            <div>
                                                                <h4>Resultat </h4>
                                                                <ul>
                                                                    <li>note obtenue {evl.note}/15</li>
                                                                    <h4>inspecteurs</h4>
                                                                    {inps.inspecteurs.map((inps) => <li
                                                                        key={i}>{inps.nom}</li>)}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                            {
                                                console.log(detailsDmd)
                                            }
                                            <div>
                                                <button data-value={detailsDmd[0].id_demande}
                                                        onClick={onClickSubmit} data-value-action={1}>Donner accreditation</button>
                                                <button data-value={detailsDmd[0].id_demande}
                                                        onClick={onClickSubmit} data-value-action={2}>Refuser accreditation</button>
                                            </div>

                                        </div>
                                        :
                                        <form onSubmit={handleSubmit(submittAffect)}>
                                            <h4>Affecter un agent</h4>
                                            <div>
                                                {inspecteur && inspecteur.map((insp) =>
                                                    <div>
                                                        <input type={"checkbox"} value={insp.id_inspecteur}
                                                               id={insp.id_inspecteur} {...register("inspect" + insp.id_inspecteur)}/>
                                                        <label htmlFor={insp.id_inspecteur}>{insp.nom}</label>
                                                    </div>)}
                                                <Inputs register={register} type={"date"}
                                                        name={"dateInsp"} placeholder={""}/>
                                            </div>
                                            <input type="submit"/>
                                        </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
