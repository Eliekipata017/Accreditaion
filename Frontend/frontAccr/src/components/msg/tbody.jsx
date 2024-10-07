export const Tbody = ({user,oncclick}) => {

    return (
        <>
            <tbody>
               <tr>
                    <td>{user.nom} {user.prenom}</td>
                    <td>{user.Departement.nom}</td>
                    <td>{user.CategorieUser.nom}</td>
                    <td>
                        <button onClick={oncclick} value={user.id}>ENVOYER MESSAGE</button>
                    </td>
                </tr>
            </tbody>
        </>
    )
}
