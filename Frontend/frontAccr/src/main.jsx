import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Login} from "./login.jsx";
import {DmdAccreditation} from "./soumettreAccre.jsx";
import {Dashboard} from "./Inspecteur/dashboard.jsx";
import {Demandes} from "./Inspecteur/demandes.jsx";
import {Evaluation} from "./Inspecteur/evaluation.jsx";


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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
