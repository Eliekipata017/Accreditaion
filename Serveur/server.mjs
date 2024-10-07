import express from 'express';
import cors from 'cors';

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

// Middleware CORS pour autoriser les requêtes cross-origin
app.use(cors(corsOptions));

// Middleware pour parser les JSON dans les requêtes
app.use(express.json());

// Route de test
app.get('/', (req, res) => {
    res.send('Hello from the backend with Express and CORS!');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
