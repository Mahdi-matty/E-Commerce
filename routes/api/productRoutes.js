const router = require('express').Router();
const { Category, product, tag, productTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const productData = await product.findAll();
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const productData = await product.findByPk(req.params.id, {
        // JOIN with travellers, using the Trip through table
        include: [{ model: Traveller, through: Trip, as: 'location_travellers' }]
      });
  
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
  
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const productData = await product.create(req.body);
      res.status(200).json(productData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  router.put("/:id", (req, res) => {
    product.update(
      {
        product_name: req.body.product_name,
        price: req.body.price,
        stock: req.body.stock,
        category_id: req.body.category_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedproduct) => {
        console.log("updatedproduct: ", updatedproduct);
        if (updatedproduct[0]) {
          res.json(updatedproduct);
        } else {
          res.status(404).json({ msg: "no such product to update" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: "oh no an error!",
          err,
        });
      });
  });

  router.delete('/:id', async (req, res) => {
    try {
      const productData = await product.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!productData) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
  
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });







module.exports = router;