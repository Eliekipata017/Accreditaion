import React from 'react';
const Inputs = ({type, placeholder,name,register,multiple}) => {
    const objectConfig = name == "email" ? {required:true,maxLength :100} : {required: true,maxLength: 200}
    return (
        <>
            <input
                type = {type} placeholder={placeholder}
                {...register(name, objectConfig)} multiple={false}
            />

        </>
    );
}

export default Inputs;
