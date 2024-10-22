import Inputs from "../components/Forms/inputs.jsx";

export const Temps = () => {
    return (
        <>
            detailsDmd && detailsDmd[0].statut >= 0 && detailsDmd[0].statut <= 2 ?
            <div className={"d-form-resul"}>
                <form onSubmit={handleSubmit(submittAffect)}>
                    <h4>Affecter inspecteur</h4>
                    <div className={"d-ins"}>
                        {
                            inspecteur.map((insp, i) => <li key={i}>
                                <input type="checkbox"
                                       value={insp.id_inspecteur} name={"list" + i}
                                       {...register("list" + i)} id={i}/>

                                <label htmlFor={i}>{insp.nom}</label>
                            </li>)
                        }
                    </div>
                    <Inputs register={register}
                            type={"date"} name={"dateInsp"} placeholder={""}/>
                    <input type="submit" value={"Envoyer"}/>
                </form>
                {detailsDmd && detailsDmd[0].statut >= 1 || detailsDmd[0].statut <= 2 ?
                    <div className={"d-insp-aff"}>
                        <h4>Inspecteur affecter
                            du {detailsDmd[0].inspection.evaluations.length + 1} ère tour</h4>
                        <ul>
                            {detailsDmd[0].inspection.inspecteurs.map((insp) =>
                                <li>{insp.nom}</li>)}
                        </ul>
                    </div>
                    : ""
                }
            </div> : ""
        </>
    )
}
