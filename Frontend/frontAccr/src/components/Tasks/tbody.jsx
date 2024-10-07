import {dataForma} from "../../hooks/utils.js";

export const Tbody = ({rapport}) => {

    return (
        <>
            <tbody>
                <tr>
                    <td>{rapport.User.nom}</td>
                    <td>{rapport.User.postnom}</td>
                    <td>{rapport.User.prenom}</td>
                    <td> soumis le <br/> {dataForma(rapport.createdAt)}</td>
                    <td><a href={`http://localhost:3001/${rapport.file}`}>Telecharger le fichier</a></td>
                </tr>

            </tbody>
        </>
    )
}
