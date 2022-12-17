const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number, 
            required: true
        }, 
        size: {
            type: Array, 
            required: true
        },
        color: {
            type: Array, 
            required: true
        }, 
        description: {
            type: Object,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        classify: {
            type: String,
            required: true,
        },
        imageUrl: {
            type: Object,
            required: true,
        },
        comment: {
            type: Array,
            required: true,
        },
        newArrival: {
            type: Boolean,
            required: true,
        },
    },
    { timestamps: true },
    { collection: "products" }
);

module.exports = mongoose.model("Product", productSchema);
