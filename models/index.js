const Product = require('./product');
const Tag = require('./tag');
const ProductTag = require('./producttag');
const Category = require('./category');

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});
Category.hasMany(Product, {
    foreignKey: 'category_id',
});
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },

})
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
})

ProductTag.belongsTo(Product, {
    foreignKey: 'product_id',
  });
  ProductTag.belongsTo(Tag, {
    foreignKey: 'tag_id',
  });
  
  


module.exports = { Product, Tag, ProductTag, Category };
