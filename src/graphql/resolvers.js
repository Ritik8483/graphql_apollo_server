// const Product = require("../model/product");

// const resolvers = {
//   Query: {
//     getAllProducts: async () => {
//       try {
//         return await Product.findAll();
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         throw new Error("Failed to fetch products");
//       }
//     },
//     getProductById: async (_, { id }) => {
//       try {
//         return await Product.findByPk(id);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         throw new Error("Failed to fetch product");
//       }
//     },
//   },

//   Mutation: {
//     addProduct: async (_, { title, description, price }) => {
//       try {
//         const product = await Product.create({ title, description, price });
//         return product;
//       } catch (error) {
//         console.error("Error creating product:", error);
//         throw new Error("Failed to create product");
//       }
//     },
//     updateProduct: async (_, { id, title, description, price }) => {
//       try {
//         const product = await Product.findByPk(id);
//         if (!product) throw new Error("Product not found");

//         await product.update({ title, description, price });
//         return product;
//       } catch (error) {
//         console.error("Error updating product:", error);
//         throw new Error("Failed to update product");
//       }
//     },
//     deleteProduct: async (_, { id }) => {
//       try {
//         const deleted = await Product.destroy({ where: { id } });
//         if (!deleted) throw new Error("Product not found");
//         return "Product deleted successfully";
//       } catch (error) {
//         console.error("Error deleting product:", error);
//         throw new Error("Failed to delete product");
//       }
//     },
//   },
// };

// module.exports = resolvers;




// -----------------------------------------------------

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../model/product"); // your Product model
const User = require("../model/user");

const SECRET = "shhhhh"; // use env var in real projects

const resolvers = {
  Query: {
    getAllProducts: async (_, __, context) => {
        console.log("-----context",context);
        
    //   if (!context.user) throw new Error("Unauthorized");       //comment to remove middleware logic
      try {
        return await Product.findAll();
      } catch (error) {
        console.log("error",error);
      }
    },
    getProductById: async (_, { id }, context) => {
      if (!context.user) throw new Error("Unauthorized");
      return await Product.findByPk(id);
    },
    me: async (_, __, context) => {
      if (!context.user) throw new Error("Unauthorized");
      return context.user;
    },
  },

  Mutation: {
    signup: async (_, { name, email, password }) => {
      const existing = await User.findOne({ where: { email } });
      if (existing) throw new Error("User already exists");

      const hash = await bcrypt.hash(password, 10);
      const token = jwt.sign({ email }, SECRET);

      const user = await User.create({ name, email, password: hash, token });
      return user;
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("User not found");

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error("Invalid credentials");

      const token = jwt.sign({ email }, SECRET);
      await user.update({ token });

      return user;
    },

    addProduct: async (_, { title, description, price }, context) => {
      if (!context.user) throw new Error("Unauthorized");
      return await Product.create({ title, description, price });
    },

    updateProduct: async (_, { id, title, description, price }, context) => {
      if (!context.user) throw new Error("Unauthorized");
      const product = await Product.findByPk(id);
      if (!product) throw new Error("Product not found");
      await product.update({ title, description, price });
      return product;
    },

    deleteProduct: async (_, { id }, context) => {
      if (!context.user) throw new Error("Unauthorized");
      const product = await Product.findByPk(id);
      if (!product) throw new Error("Product not found");
      await product.destroy();
      return "Product deleted successfully";
    },
  },
};

module.exports = resolvers;
