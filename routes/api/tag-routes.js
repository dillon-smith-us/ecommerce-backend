const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  
  try {
    const dbTagData = await Tag.findAll({
      include: [{
        model: Product, through: ProductTag,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }]
    });
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  
  try {
    const dbTagData = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product, through: ProductTag,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }]
    });
    if (!dbTagData) {
      res.status(404).json({
        message: 'No category found with this ID'
      });
      return;
    }
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag

  try {
    const dbTagData = await Category.create(req.body);
      res.status(200).json(dbTagData); 
    } catch (err) {
       res.status(400).json(err);
      }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  try {
    const dbTagData = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!dbTagData) {
      res.status(404).json({
        message: 'No category found with this ID'
      });
      return;
    }
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(400).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  try {
    const dbTagData = await Tag.destroy(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!dbTagData) {
      res.status(404).json({
        message: 'No category found with this ID'
      });
      return;
    }
    res.status(200).json(dbTagData);
  } catch (err) {
    res.status(400).json(err);
  };
});

module.exports = router;
