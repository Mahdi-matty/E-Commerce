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

ProductTag.belongsTo(Product, {
    foreignKey: 'product_id',
  });
  ProductTag.belongsTo(Tag, {
    foreignKey: 'tag_id',
  });
  
  


module.exports = { Product, Tag, ProductTag, Category };
