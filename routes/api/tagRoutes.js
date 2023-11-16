const router = require('express').Router();
const { Category, product, tag, productTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
      const tagData = await tag.findAll();
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const tagData = await tag.findByPk(req.params.id, {
        // JOIN with travellers, using the Trip through table
        include: [{ model: Traveller, through: Trip, as: 'location_travellers' }]
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post('/', async (req, res) => {
    try {
      const tagData = await tag.create(req.body);
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  router.put("/:id", (req, res) => {
    tag.update(
      {
        tag_name: req.body.tag_name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTag) => {
        console.log("updatedTag: ", updatedTag);
        if (updatedTag[0]) {
          res.json(updatedTag);
        } else {
          res.status(404).json({ msg: "no such tag to update" });
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
      const tagData = await tag.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!tagData) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });







module.exports = router;