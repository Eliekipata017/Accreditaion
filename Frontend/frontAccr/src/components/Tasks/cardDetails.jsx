export const CardDetails = ({agtNonAffect,ticket,onclick}) => {
    let classN = null
    let text = ""
    console.log(ticket)
    if (ticket){
        if (ticket[0].statut == 1){
            classN = "nonEncours"
            text = "NON ENCOURS"
        }
        else if(ticket[0].statut == 2){
            classN = "enCours"
            text = "ENCOURS"
        }
        else{
            classN = "terminé"
            text = "TERMINE"
        }
    }

    return (
        <div className={"card-details"}>
            <div className={"card-head"}>
                <h3>Détails taches</h3>
                <span onClick={onclick}></span>
            </div>
            <div className={"card-content"}>
                <div className={"content-desc"}>
                    <div className={`statut ${classN}`}>
                        {text}
                    </div>
                    <h4>Agent affecté</h4>
                    {ticket[0].statut > 1 ?
                        <ul>
                            <li>Agent</li>
                            <li>Agent</li>
                        </ul> : "Vide"
                }
                </div>
            </div>
        </div>
    )
}
