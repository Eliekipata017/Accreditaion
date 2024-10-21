import { useEffect } from 'react';
import "../css/output/style.css"
import { Link, useNavigate } from "react-router-dom";
import Inputs from "../components/Forms/inputs.jsx";
import { useForm } from "react-hook-form";
import axios from "axios";

export const AjouterInspteur = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    // Redirection si l'utilisateur est déjà connecté
    useEffect(() => {
        if (userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/addInspecteur", data);
           if (response.data.error){
               alert(response.data.error)
           }else{
               alert(response.data.success)
           }
        } catch (error) {
            console.error("Erreur lors de l'ajout de l'inspecteur :", error);
        }
    };

    return (
        <div className={"container"}>
            <div className={"div-content"}>
                <div className={"div-form"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3>Remplissez le formulaire <span>pour ajouter un inspecteur</span></h3>
                        <div className={"div-1"}>
                            <label>Nom complet</label>
                            <Inputs register={register}
                                    type={"text"}
                                    name={"nomComplet"}
                                    placeholder={"Nom complet"}
                            />
                        </div>
                        <div className={"div-2"}>
                            <label>Email</label>
                            <Inputs register={register}
                                    type={"email"}
                                    name={"email"}
                                    placeholder={"Email"}
                            />
                        </div>
                        <input type={"submit"} />
                    </form>
                </div>
            </div>
        </div>
    );
};
