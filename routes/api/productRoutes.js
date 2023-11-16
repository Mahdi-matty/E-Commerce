const router = require('express').Router();
const { Category, Product, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const productData = await Product.findAll();
      res.status(200).json(productData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const productData = await Product.findByPk(req.params.id, {
        // JOIN with travellers, using the Trip through table
        include: [Tag]
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
      const productData = await Product.create(req.body);
      res.status(200).json(productData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  router.put("/:id", async (req, res) => {
    try {
      const updatedProduct = await Product.update(
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
      );
  
      console.log("updatedProduct: ", updatedProduct);
  
      if (updatedProduct[0]) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ msg: "No such product to update" });
      }
    } catch (err) {
      res.status(500).json({
        msg: "Oh no, an error!",
        err,
      });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const productData = await Product.destroy({
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