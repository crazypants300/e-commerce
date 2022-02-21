// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'id'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'id'
})

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  as: 'tag_info',
  through: ProductTag,
  foreignKey: 'product_id'
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  as: 'tag_info',
  through: ProductTag,
  foreignKey: 'tag_id'
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
