import {useForm} from "react-hook-form";
import Inputs from "./components/Forms/inputs.jsx";

export const DmdAccreditation = () => {
    const {register, handleSubmit} = useForm()
    return (
        <div className={"container"}>
            <div className={"div-content"}>
                <div className={"div-form"}>
                    <form  method="post" className={"form-submit"} >
                        <h3>Demandez <br/>
                            <span>une accréditation</span></h3>
                        <div className={"div-1"}>
                            <div className={"div-input"}>
                                <Inputs name={"eli"} register={register} placeholder={"Nom etablissement"}/>
                            </div>
                            <div className={"div-input"}>
                                <Inputs name={"eli"} register={register} placeholder={"Adresse etablissement"}/>
                            </div>
                        </div>
                        <div className={"div-1"} style={{width:"100%", gridTemplateColumns:'repeat(2,1fr)',marginTop:'0.8em'}}>
                            <div className={"div-input"} style={{width:"100%"}}>
                                <Inputs name={"eli"} register={register} placeholder={"Type etablissement"}/>
                            </div>
                            <div className={"div-input"} style={{width:"100%"}}>
                                <Inputs name={"eli"} register={register} placeholder={"Email responsable"}/>
                            </div>
                        </div>
                        <div className={"div-2"}>
                            <div className={"div-input"} style={{width:"60%"}}>
                                <Inputs name={"eli"} register={register} placeholder={"Nom responsable"}/>
                            </div>
                        </div>

                        <input type={"submit"} value={"Soumettre"}/>
                    </form>
                </div>
            </div>
        </div>
    )
}
