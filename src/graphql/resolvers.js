const Product = require("../model/product");

const resolvers = {
  Query: {
    getAllProducts: async () => {
      try {
        return await Product.findAll();
      } catch (error) {
        console.error("Error fetching products:", error);
        throw new Error("Failed to fetch products");
      }
    },
    getProductById: async (_, { id }) => {
      try {
        return await Product.findByPk(id);
      } catch (error) {
        console.error("Error fetching product:", error);
        throw new Error("Failed to fetch product");
      }
    },
  },

  Mutation: {
    addProduct: async (_, { title, description, price }) => {
      try {
        const product = await Product.create({ title, description, price });
        return product;
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error("Failed to create product");
      }
    },
    updateProduct: async (_, { id, title, description, price }) => {
      try {
        const product = await Product.findByPk(id);
        if (!product) throw new Error("Product not found");

        await product.update({ title, description, price });
        return product;
      } catch (error) {
        console.error("Error updating product:", error);
        throw new Error("Failed to update product");
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        const deleted = await Product.destroy({ where: { id } });
        if (!deleted) throw new Error("Product not found");
        return "Product deleted successfully";
      } catch (error) {
        console.error("Error deleting product:", error);
        throw new Error("Failed to delete product");
      }
    },
  },
};

module.exports = resolvers;
