export const reset = ()=>{
    const inputs = document.querySelectorAll('input')
    const selects = document.querySelectorAll('select')
    const textarea = document.querySelectorAll('textarea')
    inputs.forEach((element)=>{
        if (element.getAttribute("type") != "submit"){
            element.value = ""
            if (element.getAttribute('type') == "checkbox"){
                element.checked = false
            }
        }
    })
    selects.forEach((element)=>{
        element.value = ""
    })
    textarea.forEach((element)=>{
        element.value = ""
    })
}

const options = {
    year: 'numeric',
    month: 'long', // Peut être 'numeric' ou 'short' pour un autre format
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit', // Supprimer cette ligne si tu ne veux pas afficher le fuseau horaire
};
export const dataForma = (dataString)=>{
    const NewData= new Date(dataString)
    return NewData.toLocaleDateString('fr-FR', options)
}