import {SideBarre} from "../components/dashboard/sideBarre.jsx";

export const SideInspecteur = () => {
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
            href: "/employe/dashboard"
        },
        {
            link : "Gerer les demandes",
            svg : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clipboard-x"
                       width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/>
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/>
                <path d="M10 12l4 4m0 -4l-4 4"/>
            </svg>,
            href : "/employe/tasks"
        },
        {
            link : "Gerer les inspecteurs",
            svg : <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-clipboard-x"
                       width="28" height="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"/>
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"/>
                <path d="M10 12l4 4m0 -4l-4 4"/>
            </svg>,
            href : "/employe/tasks"
        },
    ]

    return (
        <SideBarre links={links}/>
    )
}
