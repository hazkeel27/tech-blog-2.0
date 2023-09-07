const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create comment based on post id
router.post('/:id', withAuth, async (req, res) => {
    try {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString(undefined, options);
        const commentData = await Comment.create({
            body: req.body.body,
            date_created: formattedDate,
            user_id: req.session.user_id, // add req.session.user_id
            post_id: req.params.id
        });
        res.status(200).json(commentData);
    } catch (err) {
      res.status(400).json(`Error creating new comment: ${err}`);
    }
});

module.exports = router;