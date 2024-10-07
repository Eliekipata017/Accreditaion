export const BoxMsg = ({oncllck,msg,user}) => {
    return (
        <div className={"msg"} onClick={oncllck} >
            <div className={"msg-info"} id={msg.emetteur}>
                <div className={"div-nom"} id={msg.emetteur}>
                    <h3 id={msg.emetteur}>{user && user.map((usr)=> usr.id == msg.emetteur && usr.prenom + " "+usr.nom )}</h3>
                </div>
            </div>
        </div>
    )
}
