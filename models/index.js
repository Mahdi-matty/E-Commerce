const product = require('./product');
const tag = require('./tag');
const productTag = require('./producttag');
const Category = require('./category');

product.belongsto(Category, {
    foreignKey: 'category_id',
  onDelete: 'CASCADE',
});
Category.hasMany(product, {
    foreignKey: 'category_id',
});

product.belongsToMany(tag, {
    through: productTag,
    foreignKey: 'product_id',
  });
  tag.belongsToMany(product, {
    through: productTag,
    foreignKey: 'tag_id',
  });
  
  


module.exports = { product, tag, productTag, Category };
