//import imgCall from "../img/Call.jpg";
import { useEffect, useState } from 'react';
import "./css/output/style.css"
import {Link, useNavigate} from "react-router-dom";
import Inputs from "./components/Forms/inputs.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";

export const Login = () => {
    const userId = localStorage.getItem("adminUser")
    const navigate = useNavigate()

    if (userId){
        navigate('/')
    }
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data)=>{
        try {
            const response = await axios.post("http://localhost:3000/connexion",data)
            if (response.data.error){
                console.log(response)
            }else{
                if (response.data.data.role == "admin"){
                    localStorage.setItem("adminUser",response.data.data.idAdmin)
                    alert('connexion reussie')
                    navigate("/admin/creerCompte")
                }else if (response.data.data.role == "insp"){
                    localStorage.setItem("inspUser",response.data.data.inspecteurId)
                    navigate("/inspecteur/dashboard")
                }else if (response.data.data.role == "inspGen"){
                    localStorage.setItem("inspGen",response.data.data.id_inspecteur)
                    navigate("/inspecteur/generale/dashboard")
                }
                else{
                    localStorage.setItem("dirGUser",response.data.data.idAdmin)
                    navigate("/admin/creerCompte")
                }
            }

        }catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className={"container"}>
                <div className={"div-content"}>
                    <div className={"div-form"}>
                        <form  method="post" onSubmit={handleSubmit(onSubmit)}>
                            <h3>Remplissez le formulaire <span>pour vous connecter</span></h3>
                            <div className={"div-1"}>
                                <label>Email</label>
                                <Inputs register={register}
                                        type={"text"}
                                        name={"email"}
                                        placeholder={"*******@.*****"}
                                />
                            </div>
                            <div className={"div-2"}>
                                <label>Password</label>
                                <Inputs register={register}
                                        type={"password"}
                                        name={"password"}
                                        placeholder={"Azerty111"}
                                />
                            </div>
                            <input type={"submit"} onClick={onSubmit}/>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
