const router = require('express').Router();
const { Category, product, tag, productTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const productTagData = await ProductTag.findAll();
      res.status(200).json(productTagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const productTagData = await productTag.findByPk(req.params.id, {
        // JOIN with travellers, using the Trip through table
        include: [{ model: Traveller, through: Trip, as: 'location_travellers' }]
      });
  
      if (!productTagData) {
        res.status(404).json({ message: 'No productTag found with this id!' });
        return;
      }
  
      res.status(200).json(productTagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const productTagData = await productTag.create(req.body);
      res.status(200).json(productTagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  router.put("/:id", (req, res) => {
    productTag.update(
      {
        product_id: req.body.product_id,
        tag_id: req.body.tag_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedproductTag) => {
        console.log("updatedproductTag: ", updatedproductTag);
        if (updatedproductTag[0]) {
          res.json(updatedproductTag);
        } else {
          res.status(404).json({ msg: "no such producttag to update" });
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
      const productTagData = await productTag.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!productTagData) {
        res.status(404).json({ message: 'No productTag found with this id!' });
        return;
      }
  
      res.status(200).json(productTagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });









module.exports = router;