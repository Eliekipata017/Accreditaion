import Inputs from "../components/Forms/inputs.jsx";
import {useForm} from "react-hook-form";
import Radios from "../components/Forms/radios.jsx";
import  "../App.css"


export const Evaluation = () => {
    const { register, handleSubmit } = useForm();
    const Onsubmit =  async (data)=>{
        const attribut = Object.keys(data).length
        let note = 0

        for (let [cle ,valeur] of Object.entries(data)){
            note = note + parseInt(valeur)
        }
        const Ndata = { "critere" : data["critere1"], "new" : note}

        try {
            const send= await axios.post('https://localhost:3001/evaluation',Ndata)
        }catch (e) {

        }
    }
    return (
        <div className={"d-form-eval"}>
            <div className={"d-head-eval"}>
                <h2>Formulaire <span>d'évaluation</span></h2>
            </div>
            <div className={"d-form"}>
                <form onSubmit={handleSubmit(Onsubmit)}>
                    <label className={"l-title"}>Propriete centre</label>
                    <div className={"d-critere"}>
                        <Radios
                            label={"Essai 1"}
                            name={"critere2"}
                            register={register}
                            id={"5"}
                            value={"0"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                    </div>
                    <label className={"l-title"}>Propriete centre</label>
                    <div className={"d-critere"}>
                        <Radios
                            label={"Essai 1"}
                            name={"critere2"}
                            register={register}
                            id={"5"}
                            value={"0"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                    </div>
                    <label className={"l-title"}>Propriete centre</label>
                    <div className={"d-critere"}>
                        <Radios
                            label={"Essai 1"}
                            name={"critere2"}
                            register={register}
                            id={"5"}
                            value={"0"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                    </div>
                    <label className={"l-title"}>Propriete centre</label>
                    <div className={"d-critere"}>
                        <Radios
                            label={"Essai 1"}
                            name={"critere2"}
                            register={register}
                            id={"5"}
                            value={"0"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                    </div>
                    <label className={"l-title"}>Propriete centre</label>
                    <div className={"d-critere"}>
                        <Radios
                            label={"Essai 1"}
                            name={"critere2"}
                            register={register}
                            id={"5"}
                            value={"0"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                    </div>
                    <label className={"l-title"}>Propriete centre</label>
                    <div className={"d-critere"}>
                        <Radios
                            label={"Essai 1"}
                            name={"critere2"}
                            register={register}
                            id={"5"}
                            value={"0"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                        <Radios
                            label={"Essai 2"}
                            name={"critere2"}
                            register={register}
                            id={"6"}
                            value={"6"}
                        />
                    </div>
                    <input type="submit"/>
                </form>
            </div>
            <button >Retout</button>
        </div>
    )
}
