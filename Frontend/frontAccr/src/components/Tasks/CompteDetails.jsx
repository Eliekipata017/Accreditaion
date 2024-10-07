export const CompteDetails = ({compte,oncclick}) => {
    let classN = null
    if (compte.password){
        classN = ""
    }else{
        classN = "nonEnCours"
    }

    return (
        <div className={`div-card ${classN}`} >
                <div className={"div-info"}>
                    <div className={"codeTicket"}>
                        <h3>{compte.id}</h3>
                    </div>
                    <h4>Nom : {compte.nom} {compte.prenom}</h4>
                    <h4>Departement : {compte.Departement.nom}</h4>
                    <h4>Poste :  {compte.CategorieUser.nom}</h4>

                    <div className={"footer-div"}>
                        {!(compte.password) ?
                            <div className={"option"} style={{display:"flex",justifyContent:"space-between"}}>
                                <div className={"div-Agent"}>
                                    <button className={"valider"} onClick={oncclick} value={compte.id} style={{color:"red"}}>VALIDER</button>
                                </div>
                                <div className={"div-Agent"} style={{marginLeft:"4em"}}>
                                    <button className={"annuler"} onClick={oncclick} value={compte.id} style={{color:"red"}}>ANULLER</button>
                                </div>
                            </div>
                            : ""
                        }
                    </div>
                </div>
        </div  >
    )
}
