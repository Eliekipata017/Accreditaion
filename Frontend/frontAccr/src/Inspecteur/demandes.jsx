import '../css/output/tasks.css'
import '../css/output/dash.css'
import {SideInspecteur} from "./sideBarre.jsx";
import {Cardstate} from "../components/dashboard/cardstate.jsx";
import {Cardoption} from "../components/dashboard/cardoption.jsx";
import cours from "../img/demande-de-citation.png";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {dataForma} from "../hooks/utils.js";
import Inputs from "../components/Forms/inputs.jsx";
import {useForm} from "react-hook-form";


export const Demandes = () => {
    const [visible,setVisible] = useState(false)
    const [detailsDmd,setDetailsDmd] = useState(false)
    const [dmd, setDmd] = useState(false)
    const [idDmd, setIdDmd] = useState(false)
    const {register,handleSubmit} = useForm()

    const fetchData = async ()=>{
        const demandes = await axios.get('http://localhost:3000/getDemandes')
        console.log(demandes)
        const array_dmd = demandes.data
        setDmd(array_dmd)

    }
    const setDetails = (idDmd)=>{
        console.log(dmd)
        const detailDmd = dmd.filter((dm)=> dm.id_demande == idDmd)
        console.log(detailDmd)
        setDetailsDmd(detailDmd)
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
    },[visible,dmd])

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
                                                <td><span>{dm.inspection == null ? 0 : dm.inspection.length}/2</span></td>
                                                <td><span>{dm.statut == 0 ? <span>NON ENCOURS</span> : dm.statut == 1 ?
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
                                <div className={"d-list"}>
                                    <form onSubmit={""}>
                                        {
                                            detailsDmd && <h5>{dataForma(detailsDmd[0].date_demande)}</h5>
                                        }
                                        {
                                            detailsDmd && detailsDmd[0].statut == 0 ?
                                                <div className={""}>
                                                    <h4>Affecter inspecteur</h4>
                                                    <form onSubmit={handleClick}>
                                                        <div className={"d-ins"}>
                                                            <li><input type="checkbox" name="" id=""/> <label
                                                                htmlFor="">Nom</label>
                                                            </li>
                                                            <li><input type="checkbox" name="" id=""/> <label
                                                                htmlFor="">Nom</label>
                                                            </li>
                                                            <li><input type="checkbox" name="" id=""/> <label
                                                                htmlFor="">Nom</label>
                                                            </li>
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
