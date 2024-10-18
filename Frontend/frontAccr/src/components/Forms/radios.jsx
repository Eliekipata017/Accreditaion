import React from 'react';
const Radios = ({name,register,value,id,label}) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input
                type = {"radio"}
                value={value}
                id={id}
                {...register(name, {register:true})}
            />

        </div>
    );
}

export default Radios;
