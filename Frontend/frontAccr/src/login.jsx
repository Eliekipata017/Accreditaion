//import imgCall from "../img/Call.jpg";
import { useEffect, useState } from 'react';
import "./css/output/style.css"
import {Link, useNavigate} from "react-router-dom";
import Inputs from "./components/Forms/inputs.jsx";
import {useForm} from "react-hook-form";

export const Login = () => {
    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()


    const onSubmit = (data)=>{

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
