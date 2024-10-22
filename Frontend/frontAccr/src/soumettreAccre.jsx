import {useForm} from "react-hook-form";
import Inputs from "./components/Forms/inputs.jsx";
import {Select} from "./components/Forms/select.jsx";
import axios from "axios";
import {useEffect, useState} from "react";
import {reset} from "./hooks/utils.js";

export const DmdAccreditation = () => {
    const {register, handleSubmit} = useForm()
    const [notif, setNotif] = useState(false)

    useEffect(()=>{
        if (notif){
            alert(notif)
            setNotif(false)
        }
    },[notif])
    const Options = [
        {
            value : "dispensaire",
            option : "dispensaire"
        },
        {
            value : "clinique",
            option : "Clinique"
        }
    ]
    const onSubmit = async (data)=>{
        try {
            const object_obj = await axios.post('http://localhost:3000/demande',data)
            setNotif(object_obj.data.message)
        }catch (e) {
            console.log(e)
        }
        reset()
    }
    return (
        <div className={"container"}>
            <div className={"div-content"}>
                <div className={"div-form"}>
                    <form  onSubmit={handleSubmit(onSubmit)} className={"form-submit"} >
                        <h3>Demandez <br/>
                            <span>une accréditation</span></h3>
                        <div className={"div-1"}>
                            <div className={"div-input"}>
                                <Inputs name={"nom_etablissement"} register={register} placeholder={"Nom etablissement"}/>
                            </div>
                            <div className={"div-input"}>
                                <Inputs name={"adresse"} register={register} placeholder={"Adresse etablissement"}/>
                            </div>
                        </div>
                        <div className={"div-1"} style={{width:"100%", gridTemplateColumns:'repeat(2,1fr)',marginTop:'0.8em'}}>
                            <div className={"div-input"} style={{width:"100%"}}>
                                <Select name={"type_etablissement"} register={register} options={Options}/>
                            </div>
                            <div className={"div-input"} style={{width:"100%"}}>
                                <Inputs name={"email"} register={register} placeholder={"Email responsable"}/>
                            </div>
                        </div>
                        <div className={"div-2"}>
                            <div className={"div-input"} style={{width:"60%"}}>
                                <Inputs name={"nom_responsable"} register={register} placeholder={"Nom responsable"}/>
                            </div>
                        </div>

                        <input type={"submit"} value={"Soumettre"}/>
                    </form>
                </div>
            </div>
        </div>
    )
}
