import { Router } from "express";
const authsRouter = Router();
import db from "../databases/connection.js";
import session from "express-session";
import bcrypt from "bcrypt";


authsRouter.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

authsRouter.get("/users", async (req, res) => {
  res.send({ data: await db.all("SELECT * FROM users;") });
});

authsRouter.post("/registration", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const hashedPassword = await bcrypt.hash(password, 8);

  res.send({
    data: await db.run(`INSERT INTO users (username, password, email) VALUES (?, ?, ?)`,
      [username, hashedPassword, email])
  });
});



authsRouter.post('/login', async (req, res) => {
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

authsRouter.get('/api/auth/check', (req, res) => {
  let isAuthenticated = req.session.user ? true : false;
  res.send({ data: isAuthenticated });
});

authsRouter.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).send('Logged out');
});

export default authsRouter;




