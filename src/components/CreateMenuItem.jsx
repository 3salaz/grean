import React, { useState, useRef } from "react";
import { storage } from "../firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { motion } from "framer-motion";
import { useMenu } from "../context/MenuContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateMenuItem() {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [dietaryIcons, setDietaryIcons] = useState([]);
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const fileInputRef = useRef(null);

  const { addItem } = useMenu();

  const handleDietaryIconChange = (icon) => {
    if (dietaryIcons.includes(icon)) {
      setDietaryIcons(dietaryIcons.filter((i) => i !== icon));
    } else {
      setDietaryIcons([...dietaryIcons, icon]);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === "Lasagna") {
      setPrice("22.00");
    } else if (selectedCategory === "Pasta") {
      setPrice("21.00");
    } else if (selectedCategory === "Panini") {
      setPrice("19.50");
    } else {
      setPrice("");
    }
  };

  const handleAddItem = async () => {
    if (loading) return; // Prevent multiple submissions

    try {
      if (!images || images.length === 0) {
        toast.error("Please upload at least one image for the item.");
        return;
      }

      setLoading(true); // Set loading state to true

      const imageUrls = await Promise.all(
        images.map(async (image, index) => {
          const imageRef = ref(storage, `images/${itemName}_${index}`);
          const snapshot = await uploadBytes(imageRef, image);
          return getDownloadURL(snapshot.ref);
        })
      );

      const itemData = {
        name: itemName,
        price: parseFloat(price),
        description,
        dietaryIcons,
        imageUrls,
        category,
      };

      await addItem(itemData);
      resetForm();
      toast.success("Item added successfully!");
    } catch (error) {
      console.error("Failed to add item or upload images:", error);
      toast.error("Failed to perform the operation: " + error.message);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleImageChange = (e) => {
    const fileArray = Array.from(e.target.files);
    setImages((prevImages) => {
      const updatedImages = Array.isArray(prevImages) ? [...prevImages] : [];
      return [...updatedImages, ...fileArray].slice(0, 4);
    });
  };

  const resetForm = () => {
    setCategory("");
    setItemName("");
    setPrice("");
    setDescription("");
    setDietaryIcons([]);
    setImages([]);
    fileInputRef.current.value = null; // Reset file input
  };

  return (
    <div className="h-full relative snap-start container">
      <div className="flex flex-col items-center justify-center italic w-full box-border gap-2 h-full">
        <div className="h-full flex flex-col gap-2 items-center justify-center px-2">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="p-2 border rounded"
          >
            <option value="">Select a Category</option>
            <option value="Panini">Panini</option>
            <option value="Special">Special</option>
            <option value="Pasta">Pasta</option>
            <option value="Lasagna">Lasagna</option>
            <option value="Salads">Salads</option>
            <option value="Drinks">Drinks</option>
            <option value="Alcohol">Alcohol</option>
          </select>
          <div className="flex gap-2 w-full">
            <div className="basis-2/3">
              <label className="w-full">Item Name</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Item Name"
                className="p-2 border rounded w-full"
              />
            </div>

            <div className="basis-1/3">
              <label className="w-full">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="p-2 border rounded w-full"
              />
            </div>
          </div>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="p-2 border rounded w-full"
          />

          <div className="flex flex-wrap gap-2 bg-orange-300 px-4 items-center justify-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={dietaryIcons.includes("vegetarian")}
                onChange={() => handleDietaryIconChange("vegetarian")}
                className="mr-2"
              />{" "}
              Vegetarian
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={dietaryIcons.includes("special")}
                onChange={() => handleDietaryIconChange("special")}
                className="mr-2"
              />{" "}
              Special
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={dietaryIcons.includes("topRated")}
                onChange={() => handleDietaryIconChange("topRated")}
                className="mr-2"
              />{" "}
              Top Rated
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={dietaryIcons.includes("g'sFavorite")}
                onChange={() => handleDietaryIconChange("g'sFavorite")}
                className="mr-2"
              />{" "}
              G's Favorite
            </label>
          </div>
          <div className="w-full flex items-center justify-center bg-orange-300 p-4">
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              className="flex flex-col items-center"
            />
          </div>

          <motion.button
            onClick={handleAddItem}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Adding Item..." : "Add Item"}
          </motion.button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default CreateMenuItem;
