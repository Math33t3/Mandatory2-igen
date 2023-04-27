import dotenv from "dotenv/config";
import express from "express"
import session from "express-session";
import db from "./databases/connection.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";



const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

import cors from "cors";
app.use(cors({
  credentials: true,
  origin: true
}));

import mailRouter from "./nodeMailer/nodemailer.js";
app.use(mailRouter);

app.get("/users", async (req, res) => {
  res.send({ data: await db.all("SELECT * FROM users;") });
});

app.post("/registration", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const hashedPassword = await bcrypt.hash(password, 8);

  res.send({
    data: await db.run(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
      [username, hashedPassword, email])
  });
});



app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.get("SELECT * FROM users WHERE username = ?", [username]);

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).send('Invalid credentials');
    } else {
      req.session.user = user;
      req.session.userId = user.id;
      req.session.save();

      console.log(req.session.user);
      return res.status(200).send('Logged in');
    }

  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server error');
  }
});

app.get('/api/auth/check', (req, res) => {
  let isAuthenticated = req.session.user ? true : false;
  res.send({ data: isAuthenticated });
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).send({ message:'Logged out' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port", PORT));