export const UserDetails = ({user, oncclick}) => {
    return (
        <div className={"user"} id={user.id} onClick={oncclick}>
            <div className={"round-user"}></div>
            <div className={"identity"} id={user.id} onClick={oncclick}>
                <h3 id={user.id} onClick={oncclick}>{user.prenom} {user.nom}</h3>
                <p id={user.id} onClick={oncclick}> <span id={user.id} onClick={oncclick}>{user.Departement.nom} {user.CategorieUser.nom}</span> </p>
            </div>
            <div className={"round-notif"}></div>
        </div>
    )
}
