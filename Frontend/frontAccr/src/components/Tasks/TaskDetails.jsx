export const TaskDetails = ({code,description,type,statut,page,oncclick,ticket}) => {
    let classN = null
    let text = null

    let priorite =  ticket.priorite == 1 ? "Basse" : ticket.priorite == 2 ? "Moyenne" : ticket.priorite == 3 ? "Haute" : ""
    const  classAgen =  ticket.statut == 2 && ticket.IsOuvert == null  ? "nonEnCours" :
        ticket.statut == 2 && ticket.IsOuvert == true ? "enCours" :
            ticket.statut == 3 && ticket.IsOuvert == true ? " " : ""
    if ((page == "agent")){
        if (ticket.statut == 2 && ticket.IsOuvert == false){
            classN = "nonEnCours"
            text = "NON TRAITE"
        }
        else if (ticket.statut == 2 && ticket.IsOuvert == true){
            classN = 'enCours'
            text = 'EN COURS'
        }
        else{
            classN = ''
            text = 'TERMINE'
        }
    }
    else{
        if (ticket){
            if (ticket.statut == 1 || ticket.AgentITs == 0 || ticket.IsOuvert == false || ticket.IsOuvert == null){
                text = 'NON TRAITE'
                classN = 'nonEnCours'
            }
            else if(ticket.statut == 2 && ticket.IsOuvert == true){
                classN = 'enCours'
                text = 'EN COURS'
            }
            else{
                classN = ""
                text = 'TERMINE'
            }
        }
    }

    return (
        <div className={`div-card ${classN} ${classAgen}`} >
            {
                page == "empl" && <div className={"div-info"}>
                    <div className={"codeTicket"}>
                        <h3>{code}</h3>
                    </div>
                    <h4>{type}</h4>
                    <div className={"description"}>
                        <p>
                            {description}
                        </p>
                    </div>
                    <div className={"footer-div"}>
                        <div className={"div-Agent end"}>
                            <button className={classN} onClick={oncclick} value={code}>VOIR DETAILS</button>
                        </div>
                    </div>
                </div>
            }
            {
                page == "agent" && <div className={"div-info "}>

                    <div className={`codeTicket ` }>
                        <h3>{ticket.code}</h3>
                    </div>
                    <h4>Priorité : {priorite}</h4>
                    <h4>Depaterment : {ticket.User.Departement && ticket.User.Departement.nom}</h4>
                    <h4>Titre : {ticket.User.CategorieUser && ticket.User.CategorieUser.nom}</h4>
                    <div className={"footer-div"}>
                        <div className={"div-Agent"}>
                            <button className={classN} onClick={oncclick} value={code}>VOIR DETAILS</button>
                        </div>
                    </div>
                </div>
            }
            {
                page == "admin" && <div className={"div-info"}>
                    <div className={"codeTicket"}>
                        <h3>{ticket.code}</h3>
                    </div>
                    <h4>Priorité : {priorite}</h4>
                    <h4>Depaterment : {ticket.User.Departement.nom}</h4>
                    <h4>Titre : {ticket.User.CategorieUser.nom}</h4>
                    {ticket.statut >= 1 && ticket.statut  <=2 && ticket.isLate != 1 && <h4>En retard {ticket.isLate} Jours</h4>}
                    <div className={"footer-div"}>
                        <div className={"div-Agent"}>
                            <button className={classN} onClick={oncclick} value={code}>VOIR DETAILS</button>
                        </div>
                    </div>
                </div>
            }
        </div  >
    )
}
