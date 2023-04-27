import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);

function requireAuth(req, res, next) {
  console.log("waddup")
  if (!req.session.userId) {
    return res.status(401).send('Unauthorized');
  }
  next();
}
export default {requireAuth};