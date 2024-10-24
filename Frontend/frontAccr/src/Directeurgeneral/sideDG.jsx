import {SideBarre} from "../components/dashboard/sideBarre.jsx";

export const SideDG = () => {
    const links = [
        {
            link : "Dashboard",
            svg : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard"
                       width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 4h6v8h-6z"/>
                <path d="M4 16h6v4h-6z"/>
                <path d="M14 12h6v8h-6z"/>
                <path d="M14 4h6v4h-6z"/>
            </svg>,
            href: "/inspecteur/dashboard"
        },
        {
            link : "accreditation",
            svg : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-layout-dashboard"
                       width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M4 4h6v8h-6z"/>
                <path d="M4 16h6v4h-6z"/>
                <path d="M14 12h6v8h-6z"/>
                <path d="M14 4h6v4h-6z"/>
            </svg>,
            href: "/directeur/accorder/accreditation"
        },

    ]
    return (
        <>
            <SideBarre links={links}/>
        </>
    )
}
