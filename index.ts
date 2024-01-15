import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);



dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());


interface FormInputs {
    email: string,
    password: string
}

// Array of example users for testing purposes
const users = [
    {
        id: 1,
        name: 'Maria Doe',
        email: 'maria@example.com',
        password: 'maria123'
    },
    {
        id: 2,
        name: 'Juan Doe',
        email: 'juan@example.com',
        password: 'juan123'
    }
];

// route login
app.post('/login', (req: Request, res: Response) => {
    const { email, password }:FormInputs = req.body;

    const user = users.find(user => {
        return user.email === email && user.password === password
    });

    if (!user) {
        return res.status(404).send('User Not Found!')
    }

    return res.status(200).json(user)
});



app.get('/', (req: Request, res: Response) => {
    res.send('Hello World From the Typescript Server!')
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
