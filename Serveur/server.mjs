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
    service: 'gmail', // ou un autre service email comme SMTP
    auth: {
        user: process.env.EMAIL_USER, // Utilisateur de l'email (met ton email)
        pass: process.env.EMAIL_PASS, // Mot de passe de l'email (ou un mot de passe d'application)
    },
});

// Fonction pour envoyer un email
const sendEmailToResponsable = async (email, inspectionDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Nouvelle Inspection Programmée',
        text: `Bonjour,\n\nUne nouvelle inspection a été programmée pour votre établissement
        .\n\nDétails de l'inspection:\n- Date: ${inspectionDetails.date_inspection}\n- Type: 
        ${inspectionDetails.type_inspection}\n- Inspecteurs assignés: 
        ${inspectionDetails.inspecteurs.join(', ')}\n\nCordialement,\nL'équipe de gestion des inspections.`,
    };

    await transporter.sendMail(mailOptions);
};

const prisma = new PrismaClient()
// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors(corsOptions));
// Middleware pour parser les JSON dans les requêtes
app.use(express.json());
// Route de test
app.post('/connexion', async (req,res)=>{
    const {email,pwd} = req.body


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

// Assigner des inspecteurs à une inspection
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


app.post('/ajouterInspection', async (req,res)=>{
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
app.post('/evaluation',async (req,res)=>{
    const {note,observation,inspection,recommandation} = req.body

    try {
        const newEva = await prisma.evaluation.create({
            data :{
                note : note,
                observation : observation,
                inspection : inspection,
                recommandation : recommandation
            }
        })
        return  res.json({succes : "Evaluation save"})
    }catch (e) {
        return res.json({error : "Error"+e})
    }
})
app.post('/donnerAccreditation',async  (req,res)=>{
    const {idDemande} = req.body

    try {
        const demande = await prisma.demande.findMany({where : { id_demande : idDemande}})
        try {
            if (demande){
                const Netab = await prisma.etablissement.create({
                    data :{
                        adresse : demande.adresse,
                        type_etablissement : demande.type_etablissement,
                        nom_etablissement : demande.nom_etablissement
                    }
                })
                const NChefEtabl = await prisma.chef_Etablissement.create({
                    data :{
                        email : "",
                        etablissements : "",
                        nom : "",
                    }
                })
            }
            else{
                return res.json({error: "Error : Aucune demande n'a été trouvée"})
            }
        }catch (e) {

        }
    }catch (e) {
        return res.json({error: "Error : "+e})
    }
})

app.get('/getDemandes', async (req, res) => {
    try {
        // Récupérer toutes les demandes incluant les inspections et inspecteurs
        const demandes = await prisma.demande.findMany({
            include: {
                inspection: {
                    include: {
                        inspecteurs: {
                            include: {
                                inspecteur: true
                            }
                        }
                    }
                }
            }
        });

        // Reformater les résultats pour inclure les inspecteurs dans chaque inspection
        const demandesCompletes = demandes.map(demande => ({
            id_demande: demande.id_demande,
            nom_etablissement: demande.nom_etablissement,
            adresse: demande.adresse,
            statut: demande.statut,
            date_demande: demande.date_demande,
            email : demande.email,
            nom : demande.nom,
            inspection: demande.inspection ? {
                id_inspection: demande.inspection.id_inspection,
                date_inspection: demande.inspection.date_inspection,
                type_inspection: demande.inspection.type_inspection,
                statut_inspection: demande.inspection.statut,
                inspecteurs: demande.inspection.inspecteurs.map(inspectionInspecteur => ({
                    id_inspecteur: inspectionInspecteur.inspecteur.id_inspecteur,
                    nom: inspectionInspecteur.inspecteur.nom,
                    prenom: inspectionInspecteur.inspecteur.prenom,
                    statut: inspectionInspecteur.inspecteur.statut
                }))
            } : null
        }));

        res.status(200).json(demandesCompletes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des demandes complètes", error });
    }
});
app.get('/getInspections', async (req,res)=>{
    const inspecteur = await  prisma.inspecteur.findMany()
    try {
        return res.json({data : demandes})
    }catch (e) {
        return res.json({Error : "Error : "+e})
    }
})

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
