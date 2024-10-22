import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Inputs from '../components/Forms/inputs.jsx';
import { Select } from '../components/Forms/select.jsx';
import '../css/output/style.css';
import {reset} from "../hooks/utils.js";

export const CreerCompte = () => {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
           // navigate('/');
        }
    }, [userId, navigate]);

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/creercompte", data);

            if (response.data.success) {
                alert(response.data.success);
            }else{
                alert(response.data.error)
            }
        } catch (e) {
            alert(e); // Log error for debugging
        }
        reset()
    };

    return (
        <div className="container">
            <div className="div-content">
                <div className="div-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3>Creer un <span>compte</span></h3>
                        <div className="div-1">
                            <label>Nom</label>
                            <Inputs register={register} type="text" name="nom" placeholder="Nom complet" />
                        </div>
                        <div className="div-1">
                            <label>Email</label>
                            <Inputs register={register} type="email" name="email" placeholder="Email" />
                        </div>
                        <div className="div-2">
                            <label>Password</label>
                            <Inputs register={register} type="password" name="password" placeholder="Azerty111" />
                        </div>
                        <div className="div-2">
                            <Select
                                register={register}
                                name="role"
                                options={[
                                    { option: "inspecteur", value: "insp" },
                                    { option: "inspecteur général", value: "inspGen" },
                                    { option: "directeur général", value: "dg" },
                                ]}
                            />
                        </div>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};
