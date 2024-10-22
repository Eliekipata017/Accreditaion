import '../css/output/tasks.css'
import '../css/output/dash.css'
import {SideInspecteur} from "./sideBarre.jsx";
import {Cardstate} from "../components/dashboard/cardstate.jsx";
import {Cardoption} from "../components/dashboard/cardoption.jsx";
import cours from "../img/demande-de-citation.png";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {dataForma, reset} from "../hooks/utils.js";
import Inputs from "../components/Forms/inputs.jsx";
import {useForm} from "react-hook-form";


export const Demandes = () => {

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
        console.log(inspecteurs)
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
    const close = () =>{
        setVisible(false)
    }

    return (
        <>
            <div className={"dash-container"}>
                <SideInspecteur/>
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
                                    console.log(detailsDmd)
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
