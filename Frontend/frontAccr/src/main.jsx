import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import {Login} from "./login.jsx";
import {DmdAccreditation} from "./soumettreAccre.jsx";
import {Dashboard} from "./Inspecteur/dashboard.jsx";
import {Demandes} from "./Inspecteur/demandes.jsx";
import {Evaluation} from "./inspInspection/evaluation.jsx";
import {AjouterInspteur} from "./Inspecteur/ajouterInspteur.jsx";
import {CreerCompte} from "./Admin/creerCompte.jsx";
import {DashboardInsp} from "./inspInspection/dashboardInsp.jsx";
import {DemandesIns} from "./inspInspection/demandesIns.jsx";
import {DashboardGeneral} from "./Directeurgeneral/dashboardGeneral.jsx";
import {DonnerAccreditaion} from "./Directeurgeneral/donnerAccreditaion.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/accreditation",
        element: <DmdAccreditation/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    {
        path: "/demandes",
        element: <Demandes/>,
    },
    {
        path: "/evaluation",
        element: <Evaluation/>,
    },
    {
        path: "/ajouter/inspecteur",
        element: <AjouterInspteur/>,
    },
    {
        path : "/admin/creerCompte",
        element : <CreerCompte/>
    },
    {
        path : "/inspecteur/",
        children : [
            {
                path : "generale/",
                element : <Outlet/>,
                children : [
                        {
                            path : "dashboard",
                            element : <Dashboard/>
                        },
                        {
                            path : "demandes",
                            element : <Demandes/>
                        }
                    ]
            },
            {
                path : "dashboard",
                element : <DashboardInsp/>
            },
            {
                path : `evaluer/:id_demande/:id_inspection`,
                element : <Evaluation/>
            },
            {
                path : "inspections",
                element : <DemandesIns/>
            }
        ]
    },
    {
        path : "/directeur/",
        children : [
            {
                path: 'general/dashboard',
                element: <DashboardGeneral/>
            },
            {
                path : "accorder/accreditation",
                element : <DonnerAccreditaion/>
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
