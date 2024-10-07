export const Cardstate = ({number,name,svg}) => {
    return (
        <div className={"card-state"}>
            <div className={"card-icone"}>
                {svg}
            </div>
            <div className={"card-info"}>
                <h3>{number}</h3>
                <p>{name}</p>
            </div>
        </div>
    )
}
