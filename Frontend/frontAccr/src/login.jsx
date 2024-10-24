import { useEffect } from 'react';
import "./css/output/style.css";
import { Link, useNavigate } from "react-router-dom";
import Inputs from "./components/Forms/inputs.jsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { reset } from "./hooks/utils.js";

export const Login = () => {
    const userId = localStorage.getItem("adminUser");
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            navigate('/');
        }
    }, [userId, navigate]);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/connexion", data);

            if (response.data.error) {
                alert(response.data.error);
            } else {
                const userData = response.data.data;
                if (userData.role === "admin") {
                    localStorage.setItem("adminUser", userData.idAdmin);
                    console.log(userData.idAdmin)
                    alert('Connexion réussie');
                    navigate("/admin/creerCompte");
                } else if (userData.role === "insp") {
                    localStorage.setItem("inspUser", userData.inspecteurId);
                    navigate("/inspecteur/dashboard");
                } else if (userData.role === "inspGen") {
                    localStorage.setItem("inspGen", userData.inspecteurId);
                    console.log(userData.inspecteurId)
                    navigate("/inspecteur/generale/dashboard");
                } else {
                    localStorage.setItem("dirGUser", userData.directeurGeneralId);
                    navigate("/directeur/general/dashboard");
                }
            }
        } catch (e) {
            alert(e.message);
        }
        reset();
    };

    return (
        <div className={"container"}>
            <div className={"div-content"}>
                <div className={"div-form"}>
                    <form method="post" onSubmit={handleSubmit(onSubmit)}>
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
                        <input type={"submit"} />
                    </form>
                </div>
            </div>
        </div>
    );
};
