const Product = require('./product');
const Tag = require('./tag');
const ProductTag = require('./producttag');
const Category = require('./category');

Product.belongsTo(Category, {
    foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
Category.hasMany(Product, {
    foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'product_id',
  });
  Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id',
  });
  
  


module.exports = { Product, Tag, ProductTag, Category };
