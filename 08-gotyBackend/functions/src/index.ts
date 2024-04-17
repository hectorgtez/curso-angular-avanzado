import {onRequest} from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

export const helloWorld = onRequest((request, response) => {
  response.json({
    message: "Hello from Firebase!",
  });
});

export const getGOTY = onRequest( async (request, response) => {
  // const name = request.query.name || "Unnamed";
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const games = docsSnap.docs.map( (doc) => doc.data() );

  response.json(games);
});

// Express
const app = express();
app.use(cors({origin: true}));

app.get("/goty", async (req, res) => {
  const gotyRef = db.collection("goty");
  const docsSnap = await gotyRef.get();
  const games = docsSnap.docs.map( (doc) => doc.data() );

  res.json(games);
});

app.post("/goty/:id", async (req, res) => {
  const id = req.params.id;
  const gameRef = db.collection("goty").doc(id);
  const gameSnap = await gameRef.get();

  if (!gameSnap.exists) {
    res.status(404).json({
      ok: false,
      message: `No existe un juego con el ID ${id}`,
    });
  } else {
    const before = gameSnap.data() || {votes: 0};
    await gameRef.update({
      votes: before.votes + 1,
    });
    res.json({
      ok: true,
      message: `Gracias por tu voto a ${before.name}`,
    });
  }
});

export const api = onRequest(app);
