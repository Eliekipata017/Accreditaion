export const Thead = ({headers}) => {
    return (
        <thead>
            <tr>
                {headers.map((header,key)=> <td key={key}>{header}</td>)}
            </tr>
        </thead>
    )
}
