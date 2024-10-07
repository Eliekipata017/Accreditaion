export const Select = ({name,register,options,label}) => {
    return (
        <>
            <select {...register(name,{required:true})} style={{padding:"1em",border:"2px solid #5f5f5f",borderRadius:"5px"}}>
                <option value="" disabled={true}>Séléctionner une option</option>
                {
                    options.map((option,i)=> <option key={i} value={option}>{option}</option>)
                }
            </select>
        </>

    )
}
