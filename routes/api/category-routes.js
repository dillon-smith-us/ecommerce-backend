const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  // find all categories

  try {
    const dbCatData = await Category.findAll();
    res.status(200).json(dbCatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const dbCatData = await Category.findByPk(req.params.id, {
      include: [{model: Product,
      attributes: ['product_name', 'price', 'stock'],
    }]
    });

    if (!dbCatData) {
      res.status(404).json({message: 'No category found with this ID'});
      return;
    }

    res.status(200).json(dbCatData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const dbCatData = await Category.create(req.body);
    res.status(200).json(dbCatData); 
    } catch (err) {
      res.status(400).json(err);
    }
});

  
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const dbCatData = await Category.update(req.body, {
      where: { id: req.params.id}
    });
    if (!dbCatData) {
      res.status(404).json({message: 'No category found with this ID'});
      return;
    }

    res.status(200).json(dbCatData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  
  try {
    const dbCatData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!dbCatData) {
      res.status(404).json({message: 'No category found with this ID'});
      return;
    }

    res.status(200).json(dbCatData); 
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
