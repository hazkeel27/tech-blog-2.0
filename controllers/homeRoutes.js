const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
});
  
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, { // get all posts based on req.session.user_id
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
            });
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = userData.get({ plain: true });
        //res.status(200).json(user);
        res.render('dashboard', { 
            user, 
            logged_in: req.session.logged_in,
          });
    } catch (err) {
        res.status(500).json(`Error getting route /dashboard: ${err}`);
    }
});

router.get('/editPost/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id, // get post based on post id
            }
        }); 
        if (!postData) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const post = postData.get({ plain: true });
        //res.status(200).json(post);
        res.render('editPost', { 
            post, 
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(`Error getting route /editPost/${req.params.id}: ${err}`);
    }
});

router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll(); // find all posts
      const posts = postData.map((post) => post.get({ plain: true }));
      //res.status(200).json(posts);
      res.render('home', { 
        posts, 
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(`Error getting home route /: ${err}`);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        // get post and its comments based on post id
        const postData = await Post.findByPk(req.params.id, {
            include: [{
                    model: User,
                    attributes: { exclude: ['password'] },
                },
                {
                    model: Comment,
                    include: [
                        {
                        model: User, 
                        attributes: { exclude: ['password'] },
                        },
                    ],
                },
            ],
        });
        if (!postData) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const post = postData.get({ plain: true });
        //res.status(200).json(post);
        res.render('post', { 
            post, 
            logged_in: req.session.logged_in,
          });
    } catch (err) {
      res.status(500).json(`Error getting route /${req.params.id}: ${err}`);
    }
});

module.exports = router;