const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll({});
      res.status(200).json(commentData)
    } catch (err) {
      res.status(500).json(err)
    }
});

router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id,{});
    
        if (!commentData) {
          res.status(404).json({message: 'There is no comment associated with this id, please try again!'})
        }
        res.status(200).json(commentData) 
      } catch (err) {
        res.status(500).json(err);
      }
})

router.post('/', withAuth, async (req, res) => {
    try{
        const createComment = await Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });
        res.status(200).json(createComment)
     } catch (err) {
        res.status(500).json(err)
     }   
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const updateComment = Comment.update({
            text: req.body.text
        }, {
            where: {id: req.params.id}
        }) 
    if (!updateComment) {
            res.status(404).json ({ message: 'There is no comment associated with this id, please try again!'});
            return;
        }
        res.json(updateComment);
    } catch(err) {
    res.status(500).json(err)
}});
router.delete('/:id', withAuth, async (req, res) => {
    try {const deleteComment = Comment.destroy({
        where: {
            id: req.params.id
        }
    });
    if (!deleteComment) {
        res.status(404).json({ message: 'There is no comment associated with this id, please try again!' });
        return;
    };
        res.json(deleteComment);
    } catch(err) {
        res.status(500).json(err)
    };
    });
    
module.exports = router;