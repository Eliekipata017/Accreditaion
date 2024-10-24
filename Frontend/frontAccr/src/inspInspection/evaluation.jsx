import Inputs from "../components/Forms/inputs.jsx";
import { useForm } from "react-hook-form";
import Radios from "../components/Forms/radios.jsx";
import "../App.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {reset} from "../hooks/utils.js";

export const Evaluation = () => {
    const { register, handleSubmit } = useForm();
    const [dmd, setDmd] = useState(false);
    const [critere, setCritere] = useState(false);
    const { id_demande,id_inspection } = useParams();

    const fetchData = async () => {
        try {
            const demande = await axios.post('http://localhost:3000/getDemande', { id: parseInt(id_demande) });
            const type_hopital = demande.data.data.type_etablissement;

            const criteres = await axios.post('http://localhost:3000/getCritere', { type: type_hopital });
            setDmd(demande.data.data);
            setCritere(criteres.data.data);
            console.log(criteres)
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    };
    console.log(dmd)
    const Onsubmit = async (data) => {

        const note = Object.entries(data).reduce((acc, [key, value]) => {
            if (key !== "recommandation" && key !== "observation") {
                return acc + parseInt(value);
            }
            return acc;
        }, 0);

        const Ndata = {
            "recommandation": data["recommandation"],
            "observation": data["observation"],
            "note": note,
            "inspection": parseInt(id_inspection)
        };
        console.log(Ndata)
        try {

            const send = await axios.post('http://localhost:3000/evaluer', Ndata);
            console.log(send)
            if (send.data.success){
                alert(send.data.success)
            }
        } catch (error) {
            alert("Error submitting evaluation:", error);
        }
        reset()
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className={"d-form-eval"}>
            <div className={"d-head-eval"}>
                <h2>Formulaire <span>d'évaluation</span></h2>
            </div>
            <div className={"d-form"}>
                <form onSubmit={handleSubmit(Onsubmit)}>
                    {critere && critere.map((ctr) =>
                        <div key={ctr.id_critere}>
                            <label htmlFor={ctr.id_critere} className={"l-title"}>{ctr.nom_critere}</label>
                            <div className={"d-critere"}>
                                <Radios
                                    label={"oui"}
                                    id={ctr.id_critere + '_oui'}
                                    register={register}
                                    name={"critere" + ctr.id_critere}
                                    value={5}
                                />
                                <Radios
                                    label={"Non"}
                                    id={ctr.id_critere + '_non'}
                                    register={register}
                                    name={"critere" + ctr.id_critere}
                                    value={1}
                                />
                                <Radios
                                    label={"Partiellement"}
                                    id={ctr.id_critere + '_partiellement'}
                                    register={register}
                                    name={"critere" + ctr.id_critere}
                                    value={3}
                                />
                            </div>
                        </div>
                    )}
                    <div className={"d-text"}>
                        <textarea {...register("recommandation", { required: true })} cols="30" rows="10"></textarea>
                    </div>
                    <div className={"d-text"}>
                        <textarea {...register("observation", { required: true })} cols="30" rows="10"></textarea>
                    </div>
                    <input type="submit" />
                </form>
            </div>
            <button>Retout</button>
        </div>
    );
};
