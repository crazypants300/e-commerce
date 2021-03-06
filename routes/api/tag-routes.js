const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name','price','stock','category_id'],
        through: ProductTag,
        as: 'tag_info'
      }
    ]
  })
  .then(tags => res.json(tags))
  .catch(err => res.json(err));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['product_name','price','stock','category_id'],
        through: ProductTag,
        as: 'tag_info'
      }
    ]
  }).then(tag => {
    if (!tag) {
      res.status(404).json({ error: "No tag found with that id"});
      return;
    }
    res.json(tag);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  }).then(newTag => res.json({message: 'New tag created', newTag}))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
  {
    where: {
      id: req.params.id
    }
  }).then(updatedTag => {
    if(!updatedTag) {
      res.status(404).json({ message: 'no tag with that id found'});
      return;
    }
    res.json({message: 'Tag updated', updatedTag})
  }).catch(err => res.status(500).json({ message: 'error', err}));
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(deletedTag => {
      if (!deletedTag) {
        res.status(404).json({message: 'no tag with that id found'});
        return;
      }
      res.json({message: 'tag deleted', deletedTag});
    }).catch(err => res.status(500).json({message: 'error'}))
});


module.exports = router;
