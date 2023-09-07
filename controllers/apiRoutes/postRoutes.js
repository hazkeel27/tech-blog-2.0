const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create post based on req.session.user_id
router.post('/', async (req, res) => {
    try {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString(undefined, options);
        const postData = await Post.create({
            title: req.body.title,
            body: req.body.body,
            date_created: formattedDate,
            user_id: req.session.user_id,
        });
        res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(`Error creating new post: ${err}`);
    }
});

// update post based on post id
router.put('/:id', async (req, res) => {
    try {
      const postData = await Post.update({
        title: req.body.title,
        body: req.body.body,
      },
      {
        where: {
            id: req.params.id,
        }
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(`Error updating post: ${err}`);
    }
});

// delete post based on post id
router.delete('/:id', async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
            id: req.params.id,
        }
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      res.status(200).json(postData);
    } catch (err) {
      res.status(400).json(`Error deleting post: ${err}`);
    }
});

module.exports = router;