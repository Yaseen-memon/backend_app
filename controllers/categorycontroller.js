const Category = require('../Models/category/category');

// Add New Category
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check if category already exists
        const existing = await Category.findOne({ name });
        if (existing) {
            return res.status(400).json({ message: 'Category already exists' });
        }

        const category = new Category({ name, description });
        await category.save();

        // res.status(201).json({ message: 'Category added successfully', category.['_id'] });
        res.status(200).json({
            message: 'Category added successfully',
            ID: category._id,           // 👈 This is what you want
            // user: newUser                  // Optional: you can remove this if not needed
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    addCategory,
};
