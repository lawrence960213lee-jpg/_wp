const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('./db');

const app = express();
app.set('view engine', 'ejs');

const uploadDir = './public/uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false
}));

function isAuthenticated(req, res, next) {
  if (req.session.userId) return next();
  res.redirect('/login');
}

app.get('/', (req, res) => {
  const publicPosts = db.prepare('SELECT * FROM posts WHERE is_public = 1 ORDER BY created_at DESC').all();
  if (req.session.userId) {
    const personalPosts = db.prepare('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC').all(req.session.userId);
    return res.render('index', { user: req.session.username, publicPosts, personalPosts });
  }
  res.render('index', { publicPosts, user: null });
});

app.get('/public', (req, res) => {
  const posts = db.prepare('SELECT * FROM posts WHERE is_public = 1 ORDER BY created_at DESC').all();
  res.render('public', { posts, user: req.session.username });
});

app.get('/post/:id', (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  if (!post) return res.redirect('/');
  const canView = post.is_public || (req.session.userId && post.user_id === req.session.userId);
  if (!canView) return res.redirect('/');
  const author = db.prepare('SELECT username FROM users WHERE id = ?').get(post.user_id);
  res.render('post', { post, user: req.session.username, userId: req.session.userId, author: author?.username });
});

app.get('/new', isAuthenticated, (req, res) => {
  res.render('new', { user: req.session.username });
});

app.post('/posts', isAuthenticated, (req, res) => {
  const { title, content, is_public } = req.body;
  if (!title || !content) return res.redirect('/new');
  const isPublic = is_public ? 1 : 0;
  db.prepare('INSERT INTO posts (user_id, title, content, is_public) VALUES (?, ?, ?, ?)').run(req.session.userId, title, content, isPublic);
  res.redirect('/');
});

app.get('/delete/:id', isAuthenticated, (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id);
  if (!post || post.user_id !== req.session.userId) return res.redirect('/');
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  res.redirect('/');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.redirect('/register');
  const hashed = await bcrypt.hash(password, 10);
  try {
    db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashed);
    res.redirect('/login');
  } catch (e) {
    res.redirect('/register');
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user.id;
    req.session.username = username;
    return res.redirect('/');
  }
  res.redirect('/login');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/profile', isAuthenticated, (req, res) => {
  const userData = db.prepare('SELECT * FROM users WHERE id = ?').get(req.session.userId);
  const posts = db.prepare('SELECT * FROM posts WHERE user_id = ? ORDER BY created_at DESC').all(req.session.userId);
  res.render('profile', { user: req.session.username, userData, posts });
});

app.post('/profile', isAuthenticated, (req, res) => {
  const { bio } = req.body;
  db.prepare('UPDATE users SET bio = ? WHERE id = ?').run(bio || '', req.session.userId);
  res.redirect('/profile');
});

app.get('/search', isAuthenticated, (req, res) => {
  console.log('Search route hit', req.session.userId);
  const { q } = req.query;
  let users = [];
  if (q) {
    users = db.prepare('SELECT id, username, bio FROM users WHERE username LIKE ? AND id != ?').all(`%${q}%`, req.session.userId);
  }
  const friends = db.prepare(`
    SELECT u.id, u.username, u.bio FROM users u
    JOIN friends f ON (f.friend_id = u.id AND f.user_id = ?) OR (f.user_id = u.id AND f.friend_id = ?)
  `).all(req.session.userId, req.session.userId);
  res.render('search', { user: req.session.username, users, friends, q });
});

app.post('/add-friend/:id', isAuthenticated, (req, res) => {
  const friendId = parseInt(req.params.id);
  if (friendId === req.session.userId) return res.redirect('/search');
  const existing = db.prepare('SELECT * FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)').get(req.session.userId, friendId, friendId, req.session.userId);
  if (!existing) {
    db.prepare('INSERT INTO friends (user_id, friend_id) VALUES (?, ?)').run(req.session.userId, friendId);
  }
  res.redirect('/search');
});

app.post('/remove-friend/:id', isAuthenticated, (req, res) => {
  const friendId = parseInt(req.params.id);
  db.prepare('DELETE FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)').run(req.session.userId, friendId, friendId, req.session.userId);
  res.redirect('/search');
});

app.get('/test', (req, res) => res.send('OK'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));