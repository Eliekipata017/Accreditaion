import express from 'express';
import cors from 'cors';
import {PrismaClient} from "@prisma/client";
import nodemailer from 'nodemailer';

const app = express();
const port = 3000;
const corsOptions = {
    origin: ['http://localhost:5173'], // Liste des domaines autorisés
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    exposedHeaders: ['Authorization'], // En-têtes accessibles côté client
    credentials: true, // Autoriser l'envoi des cookies (sessions, JWT)
    optionsSuccessStatus: 200, // Réponse de succès pour les requêtes preflight
};

const transporter = nodemailer.createTransport({
    service: 'gmail', // Vous pouvez utiliser différents services comme 'hotmail', 'yahoo', etc.
    auth: {
        user: 'eliekipata006@gmail.com', // votre email Gmail
        pass: 'siwg eqku grcv ksic' // votre mot de passe Gmail
    }
});

// Fonction pour envoyer un email
const sendEmailToResponsable = async (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erreur lors de l\'envoi de l\'email :', error);
            return true
        } else {
            console.log('Email envoyé : ' + info.response);
            return true
        }
    });
};

const prisma = new PrismaClient()
// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors(corsOptions));
// Middleware pour parser les JSON dans les requêtes
app.use(express.json());
// Route de test
app.post('/creercompte', async (req,res)=>{
    const {nom,email,password,role} = req.body
    let id = null

    try {
        const cpt = await prisma.compte.findFirst({
            where : {
                email : email,
                password : password
            }
        })

        if (cpt){
            return res.json({"error": "le compte existe deja !!!"})
        }

        if (role == "insp"){
            const insp = await prisma.inspecteur.create({
                data :{
                    nom : nom,
                    type : 2
                }
            })
            const lastInspecteur = await prisma.inspecteur.findFirst({
                orderBy: {
                    id_inspecteur: 'desc' // ou un autre champ de date
                }
            });
            id = lastInspecteur.id_inspecteur

            const comptes = await prisma.compte.create({
                data :{
                    email : email,
                    role : role,
                    password : password,
                    inspecteur: {
                        connect : {id_inspecteur : id}
                    }
                }
            })

        }
        else if(role == "inspGen"){
            const insp = await prisma.inspecteur.create({
                data :{
                    nom : nom,
                    type: 1,
                }
            })
            const lastInspecteur = await prisma.inspecteur.findFirst({
                orderBy: {
                    id_inspecteur: 'desc' // ou un autre champ de date
                }
            });
            id = lastInspecteur.id_inspecteur
            console.log(lastInspecteur)
            const comptes = await prisma.compte.create({
                data :{
                    email : email,
                    role : role,
                    password : password,
                    inspecteur: {
                        connect : {id_inspecteur : id}
                    }
                }
            })
        }
        else{
            const dirGeneral = await prisma.directeur_General.create({
                data :{
                    nom : nom
                }
            })
            const dirG = await prisma.directeur_General.findFirst({
                orderBy: {
                    id_directeur: 'desc' // ou un autre champ de date
                }
            })

            id = dirG.id_directeur
            const comptes = await prisma.compte.create({
                data :{
                    email : email,
                    role : role,
                    password : pwd,
                    directeur_general: {
                        connect : {id_directeur : id}
                    }
                }
            })
        }

        return res.json({"success" : "utilisateur creer avec succes"})
    }catch (e) {
        console.log(e)
        return res.json({"error":e })
    }
})
app.post('/connexion', async (req,res)=>{
    const {email,pwd} = req.body

    try {
        const comptes = await prisma.compte.findFirst({
            where : {
                email : email, password : pwd
            }
        })
        if (!(comptes)){
            return  res.json({"error": "Aucun compte trouvé !! Contactez l'admin"})
        }
        return res.json({data : comptes})
    }catch (e) {
        return res.json({"error":e })
    }
})
/*
app.post('/saveDemande', async (req,res)=>{
    const {nomEtablissement,adresse,typeEtablissement,email} = req.body

    try {
        const Ndmd = await prisma.demande.create({
            data :{
                date_demande :    new Date(),
                nom_etablissement   :  nomEtablissement,
                adresse             :  adresse,
                type_etablissement  :  typeEtablissement,
                statut              :  0,
                email               :  email
            }
        })
        return res.json({Success : "La demande a été ajouté avec succés"})
    }catch (error){
        return res.json({Error : "Error : "+error})
    }
})
app.post('/CreateinspectionDemande', async (req,res)=>{
    const {type_inspection,demande,inspecteurs} = req.body


    try {
        const newInspection = await prisma.inspection.create({
            data: {
                date_inspection: new Date(),
                type_inspection: type_inspection,
                statut: '0',
                inspecteurs: inspecteurs.map(id_inspecteur => ({
                    inspecteur: { connect: { id_inspecteur } }  // Associer chaque inspecteur existant
                })),
                demande: {
                    connect: { id_demande: demande.id_demande },  // Associer la demande
                },
            },
        });
        return res.json({Success : "La demande a été ajouté avec succés"})
    }catch (error){
        return res.json({Error : "Error : "+error})
    }


})
 */
app.post('/demande', async (req, res) => {
    try {
        const {
            nom_etablissement,
            adresse,
            type_etablissement,
            email,
            nom_responsable

        } = req.body;

        const nouvelleDemande = await prisma.demande.create({
            data: {
                nom_etablissement : nom_etablissement,
                adresse : adresse,
                type_etablissement : type_etablissement,
                statut: 0, // EN_ATTENTE
                email : email,
                date_demande: new Date(),
                nom : nom_responsable
            },
        });

        res.status(201).json({
            message: "Demande d'accréditation créée avec succès",
            demande: nouvelleDemande,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la demande', error });
    }
});
//  Assigner des inspecteurs à une inspection
app.post('/inspection', async (req, res) => {
    try {
        const { id_demande, date_inspection, type_inspection, statut, inspecteurIds } = req.body;

        // Vérifier si la demande existe
        const demande = await prisma.demande.findUnique({
            where: { id_demande },
            include: { etablissement: true }, // Récupérer les détails de l'établissement
        });

        if (!demande) {
            return res.status(404).json({ message: "La demande spécifiée n'existe pas" });
        }

        // Créer l'inspection
        const nouvelleInspection = await prisma.inspection.create({
            data: {
                date_inspection,
                type_inspection,
                statut,
                id_etablissement: demande.id_etablissement,
            },
        });

        // Affecter les inspecteurs à l'inspection
        const assignInspecteurs = inspecteurIds.map(id_inspecteur =>
            prisma.inspectionInspecteur.create({
                data: {
                    inspectionId: nouvelleInspection.id_inspection,
                    inspecteurId: id_inspecteur,
                },
            })
        );
        await Promise.all(assignInspecteurs);

        // Récupérer les inspecteurs pour l'email
        const inspecteurs = await prisma.inspecteur.findMany({
            where: { id_inspecteur: { in: inspecteurIds } },
        });

        const inspecteurNoms = inspecteurs.map(inspecteur => `${inspecteur.nom} ${inspecteur.prenom}`);

        // Envoyer un email au responsable de l'établissement
        await sendEmailToResponsable(demande.email, {
            date_inspection,
            type_inspection,
            inspecteurs: inspecteurNoms,
        });

        res.status(201).json({
            message: "Inspection créée avec succès et inspecteurs affectés. Un email a été envoyé au responsable de l'établissement.",
            inspection: nouvelleInspection,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'inspection", error });
    }
});
app.post('/evaluation', async (req, res) => {
    try {
        const { id_inspection, note, observation, recommandation } = req.body;
        // Vérifier si l'inspection existe

        const inspection = await prisma.inspection.findUnique({
            where: { id_inspection },
        });

        if (!inspection) {
            return res.status(404).json({ message: "L'inspection spécifiée n'existe pas" });
        }

        // Créer l'évaluation
        const nouvelleEvaluation = await prisma.evaluation.create({
            data: {
                note,
                observation,
                recommandation,
                id_inspection, // Associer l'évaluation à l'inspection
            },
        });

        res.status(201).json({
            message: "Évaluation soumise avec succès",
            evaluation: nouvelleEvaluation,
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la soumission de l'évaluation", error });
    }
});
app.post('/ajouterInspection', async (req, res) => {
    const { type_inspection, demande, inspecteurs, dateInsp } = req.body;

    try {
        const nouvelleInspection = await prisma.inspection.create({
            data: {
                date_inspection: new Date(dateInsp),
                type_inspection: type_inspection,
                statut: '0',
                inspecteurs: {
                    create: inspecteurs.map(id_inspecteur => ({
                        inspecteur: {
                            connect: { id_inspecteur }  // Associer chaque inspecteur existant
                        }
                    }))
                },
                demande: {
                    connect: { id_demande: demande }  // Associer la demande via id_demande
                },
            }
        });

        const dmd = await prisma.demande.findFirst({
            where: { id_demande: demande }
        });

        const inspect = await prisma.inspection.findFirst({
            where: {
                demandeId: demande,  // Utiliser demandeId pour rechercher les inspections liées à la demande
            },
            include: {
                inspecteurs: {
                    include: {
                        inspecteur: true  // Inclut les détails des inspecteurs associés
                    }
                }
            }
        });

        const updateDmd = await prisma.demande.update({
            where: { id_demande: demande },
            data: {
                statut: dmd.statut == 1 ? 2 : 1
            }
        });

        const optionDmd = {
            from: process.env.EMAIL_USER,
            to: dmd.email,
            subject: 'Inspection Programmée',
            text: `Bonjour ${dmd.nom},\n\nUne nouvelle inspection a été programmée pour votre établissement.\n\nDétails de l'inspection:\n- Date: ${dateInsp}\n- Inspecteurs assignés: ${inspect.inspecteurs.map((inp) => inp.inspecteur.nom).join(", ")}\n\nCordialement,\nL'équipe de gestion des inspections.`,
        };

        const send = await sendEmailToResponsable(optionDmd);

        return res.json({ Success: "La demande a été ajoutée avec succès" });

    } catch (error) {
        return res.json({ Error: "Erreur : " + error });
    }
});
app.post('/evaluer',async (req,res)=>{
    const {note,observation,inspection,recommandation} = req.body

    try {
        const newEva = await prisma.evaluation.create({
            data :{
                note : note,
                observation : observation,
                inspection: {
                    connect: { id_inspection: inspection }  // Remplacez `inspection` par l'ID de l'inspection que vous souhaitez associer
                },
                recommandation : recommandation
            }
        })
        return  res.json({success : "Evaluation save"})
    }catch (e) {
        return res.json({error : "Error"+e})
    }
})

app.post('/donnerAccreditation',async  (req,res)=>{
    const {idDemande,action} = req.body

    try {
            const demande = await prisma.demande.findFirst({where : { id_demande : idDemande}})
            try {
            if (demande){
                if (action == "1"){
                    const updDmd = await prisma.demande.update({
                        where :{
                            id_demande : demande.id_demande
                        },
                        statut : 4
                    })
                    const NChefEtabl = await prisma.chef_Etablissement.create({
                        data :{
                            email : demande.email,
                            nom : demande.nom,
                        }
                    })
                    const etabs = await  prisma.etablissement.findMany()
                    const etab = tab[-1]
                    const Netab = await prisma.etablissement.create({
                        data :{
                            adresse : demande.adresse,
                            type_etablissement : demande.type_etablissement,
                            nom_etablissement : demande.nom_etablissement,
                            chef_etablissement : {
                                connect : {id_chef:etab.id_etablissement}
                            }
                        }
                    })
                    const optionDmd = {
                        from: process.env.EMAIL_USER,
                        to: dmd.email,
                        subject: 'Resultat inspection',
                        text: `Bonjour ${dmd.nom},\n\n Bravo votre demande d'inspection a reussi. \n\nCordialement,\nL'équipe de gestion des inspections.`,
                    };

                    const send = await sendEmailToResponsable(optionDmd);
                    return  res.json({success : "Accreditation effectue"})
                }else{
                    const optionDmd = {
                        from: process.env.EMAIL_USER,
                        to: dmd.email,
                        subject: 'Resulta inspection',
                        text: `Bonjour ${dmd.nom},\n\n desole votre demande d'inspection a echoué. \n\nCordialement,\nL'équipe de gestion des inspections.`,
                    };

                    const send = await sendEmailToResponsable(optionDmd);
                    const updDmd = await prisma.demande.update({
                        where :{
                            id_demande : demande.id_demande
                        },
                        statut : 4
                    })
                }

            }
            else{
                return res.json({error: "Error : Aucune demande n'a été trouvée"})
            }
        }catch (e) {

        }
    }catch (e) {
            console.log(e)
            return res.json({error: "Error : "+e})
    }
})
app.post('/getDemandesAccreditaions', async (req,res)=>{
    try {
        // Récupérer toutes les demandes incluant les inspections et inspecteurs
        const demandes = await prisma.demande.findMany({
            where : {
                statut : 3
            },
            include: {
                inspections: { // Note: correction ici, 'inspections' au lieu de 'inspection'
                    include: {
                        inspecteurs: {
                            include: {
                                inspecteur: true // Inclut les détails de l'inspecteur
                            }
                        },
                        evaluations: true // Inclut les évaluations directement
                    }
                }
            }
        });

        // Reformater les résultats pour inclure les inspecteurs et les évaluations dans chaque inspection
        const demandesCompletes = demandes.map(demande => ({
            id_demande: demande.id_demande,
            nom_etablissement: demande.nom_etablissement,
            adresse: demande.adresse,
            statut: demande.statut,
            date_demande: demande.date_demande,
            email: demande.email,
            nom: demande.nom,
            inspections: demande.inspections.map(inspection => ({
                id_inspection: inspection.id_inspection,
                date_inspection: inspection.date_inspection,
                type_inspection: inspection.type_inspection,
                statut_inspection: inspection.statut,
                inspecteurs: inspection.inspecteurs.map(inspectionInspecteur => ({
                    id_inspecteur: inspectionInspecteur.inspecteur.id_inspecteur,
                    nom: inspectionInspecteur.inspecteur.nom,
                    prenom: inspectionInspecteur.inspecteur.prenom,
                    statut: inspectionInspecteur.inspecteur.statut
                })),
                evaluations: inspection.evaluations.map(evaluation => ({
                    id_evaluation: evaluation.id_evaluation,
                    note: evaluation.note,
                    observation: evaluation.observation,
                    recommandation: evaluation.recommandation
                })) // Inclut les évaluations
            }))
        }));

        res.status(200).json(demandesCompletes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des demandes complètes", error });
    }
})

app.post("/addInspecteur", async (req,res)=>{
    const { nomComplet,email}= req.body

    try {
        const inspec = await prisma.inspecteur.findFirst({
            where : { email : email }
        })
        if (!(inspec)){
            const inspector = await prisma.inspecteur.create(
                {
                    data: {
                        nom: nomComplet,
                        email : email
                    }
                })
            return res.json({"success" : "Inspecteur ajouter avec succes"})
        }
        return res.json({"error" : "Inspecteur existe deja"})

    }catch (e) {
        console.log(e)
        return res.json({"error": e})
    }
})
app.get('/testApp', async (req,res)=>{
    const dmd = await prisma.demande.findFirst({
        where : {id_demande : 3}
    })

    const inspectionAvecInspecteurs = await prisma.inspection.findFirst({
        where: {
            demandes: {
                some: {
                    id_demande: 3  // Condition pour lier l'inspection à la demande ayant id_demande = 3
                }
            }
        },
        include: {
            inspecteurs: {
                include: {
                    inspecteur: true  // Inclut les détails des inspecteurs associés à l'inspection
                }
            }
        }
    });




    return res.json({dmd : dmd, inspect : inspectionAvecInspecteurs})

})

app.get('/getDemandes', async (req, res) => {
    try {
        // Récupérer toutes les demandes incluant les inspections et inspecteurs
        const demandes = await prisma.demande.findMany({
            include: {
                inspections: { // Note: correction ici, 'inspections' au lieu de 'inspection'
                    include: {
                        inspecteurs: {
                            include: {
                                inspecteur: true // Inclut les détails de l'inspecteur
                            }
                        },
                        evaluations: true // Inclut les évaluations directement
                    }
                }
            }
        });

        // Reformater les résultats pour inclure les inspecteurs et les évaluations dans chaque inspection
        const demandesCompletes = demandes.map(demande => ({
            id_demande: demande.id_demande,
            nom_etablissement: demande.nom_etablissement,
            adresse: demande.adresse,
            statut: demande.statut,
            date_demande: demande.date_demande,
            email: demande.email,
            nom: demande.nom,
            inspections: demande.inspections.map(inspection => ({
                id_inspection: inspection.id_inspection,
                date_inspection: inspection.date_inspection,
                type_inspection: inspection.type_inspection,
                statut_inspection: inspection.statut,
                inspecteurs: inspection.inspecteurs.map(inspectionInspecteur => ({
                    id_inspecteur: inspectionInspecteur.inspecteur.id_inspecteur,
                    nom: inspectionInspecteur.inspecteur.nom,
                    prenom: inspectionInspecteur.inspecteur.prenom,
                    statut: inspectionInspecteur.inspecteur.statut
                })),
                evaluations: inspection.evaluations.map(evaluation => ({
                    id_evaluation: evaluation.id_evaluation,
                    note: evaluation.note,
                    observation: evaluation.observation,
                    recommandation: evaluation.recommandation
                })) // Inclut les évaluations
            }))
        }));

        res.status(200).json(demandesCompletes);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des demandes complètes", error });
    }
});
app.post('/getinsp', async (req, res) => {
    const { id } = req.body;
    console.log(id);

    try {
        const inspInsption = await prisma.inspecteur.findUnique({
            where: {
                id_inspecteur: parseInt(id),
            },
            include: {
                inspections: { // Le modèle intermédiaire entre l'inspecteur et l'inspection
                    include: {
                        inspection: { // Le modèle d'inspection, qui contient peut-être la relation avec demande
                            include: {
                                demande: true, // Assure-toi que la relation est correcte dans ton schéma, peut-être "demande"
                            },
                        },
                    },
                },
            },
        });

        res.json({ "data": inspInsption });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue' });
    }
});

app.post('/getDemande',async (req,res)=>{
    const {id} = req.body
    const demande = await prisma.demande.findFirst({
        where : { id_demande : id}
    })
    return res.json({data:demande})
})
app.post('/getCritere',async (req,res)=>{
    const {type} = req.body

    const critere = await prisma.critere.findMany({
        where : { type_critere : type}
    })
    return res.json({data:critere})
})

app.get('/getInspections', async (req,res)=>{
    const inspecteur = await  prisma.inspecteur.findMany()
    try {
        return res.json({data : demandes})
    }catch (e) {
        return res.json({Error : "Error : "+e})
    }
})
app.get('/getInspeceur', async (req,res)=>{
    const inspecteurs = await prisma.inspecteur.findMany({
        include :{
            inspections : true
        }
    })
    return res.json({data : inspecteurs})
})
app.post(('/getInspecteur'), async (req,res)=>{
    const {id} = req.body
    const insp = await prisma.inspecteur.findFirst({
        where :{
            id_inspecteur : id
        }
    })
    return res.json({data : insp})
})

app.post(('/getDirecteur'), async (req,res)=>{
    const {id} = req.body
    const insp = await prisma.directeur_General.findFirst({
        where :{
            id_directeur : id
        }
    })
    return res.json({data : insp})
})

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
