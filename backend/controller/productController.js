const Product = require('../model/product');

// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// Get Product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            res.status(404).json({ msg: "Product Not Found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// Create Product
const createProduct = async (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      
      // Log received data for debugging
      console.log("Request Body:", req.body);
  
      const newProduct = new Product({ name, price, description, category });
      
      // Log the product being saved
      console.log("New Product:", newProduct);
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      // Log the error for debugging
      console.error("Error Creating Product:", error);
  
      res.status(500).json({ msg: "Server Error" });
    }
  };
  
// Update Product
const updateProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, price, description, category }, { new: true })
        if (!updatedProduct) {
            res.status(404).json({ msg: "Product Not Found" });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ msg: "Product Not Found" });
        }
        res.status(200).json(deletedProduct);
    } catch (error) {
        res.status(500).json({ msg: "Server Error" });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
