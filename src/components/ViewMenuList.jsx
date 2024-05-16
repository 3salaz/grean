import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMenu } from "../context/MenuContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase.config";
import { toast } from "react-toastify";

function ViewMenuList() {
  const containerRef = useRef(null);
  const [currentCategory, setCurrentCategory] = useState("lasagnas");
  const [currentView, setCurrentView] = useState(0);
  const { menu, loading, editMenuItem, error, deleteItem, editItem } =
    useMenu();
  const [editingItem, setEditingItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    description: "",
    dietaryIcons: [],
    imageUrls: [], // Stores existing image URLs
    newImages: [], // Stores new image files
  });

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentView(0); // Resetting current view
    containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  const handleEditClick = (item) => {
    setEditingItem(item.id);
    setEditFormData({
      name: item.name,
      price: item.price,
      description: item.description,
      dietaryIcons: item.dietaryIcons || [],
      imageUrls: item.imageUrls || [],
      newImages: [],
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDietaryIconChange = (icon) => {
    setEditFormData((prevData) => {
      const updatedIcons = prevData.dietaryIcons.includes(icon)
        ? prevData.dietaryIcons.filter((i) => i !== icon)
        : [...prevData.dietaryIcons, icon];
      return {
        ...prevData,
        dietaryIcons: updatedIcons,
      };
    });
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const remainingSlots = 4 - editFormData.imageUrls.length;
    const newImagesToAdd = files.slice(0, remainingSlots);
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      newImages: [...prevFormData.newImages, ...newImagesToAdd],
    }));
  };

  const handleEditSubmit = async (id) => {
    await editMenuItem(editingItem, editFormData);
    setEditingItem(null);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  const filteredMenuItems = menu.filter(
    (item) => item.category === currentCategory
  );

  if (loading) {
    return <div className="loading">Loading menu items...</div>;
  }

  if (error) {
    return <div className="error">Error loading menu items: {error}</div>;
  }

  const handleRemoveImage = (url, index) => {
    setEditFormData((prevFormData) => ({
      ...prevFormData,
      imageUrls: prevFormData.imageUrls.filter((_, idx) => idx !== index),
    }));
  };

  return (
    <div className="h-full relative snap-start container">
      <div className="h-full w-full relative flex  bg-mRed text-white p-2">
          <div className="h-full w-full flex flex-col gap-3">
            <h1 className="text-xl font-bold uppercase">
              {currentCategory || "Menu Items"}
            </h1>
            <p className="text-sm">
              Currently {menu.length} items in the menu.
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2 text-white bg-mGreen drop-shadow-lg rounded-full aspect-square flex items-center justify-center px-1"
            >
              <ion-icon size="large" name="cog-outline"></ion-icon>
            </motion.button>
            <ul
              ref={containerRef}
              className="flex items-center justify-start gap-2 overflow-auto snap-x snap-mandatory hide-scroll overscroll-none w-full px-2 py-2"
            >
              {filteredMenuItems.map((item) => (
                <li
                  key={item.id}
                  className={`bg-white rounded-md text-mGreen min-w-[80%] snap-center drop-shadow-xl`}
                >
                  {editingItem === item.id ? (
                    <div className="px-2 basis-full">
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditChange}
                        className="mb-2 p-1 w-full"
                        placeholder="Item Name"
                      />
                      <input
                        type="number"
                        name="price"
                        value={editFormData.price}
                        onChange={handleEditChange}
                        className="mb-2 p-1 w-full"
                        placeholder="Price"
                      />
                      <textarea
                        name="description"
                        value={editFormData.description}
                        onChange={handleEditChange}
                        className="mb-2 p-1 w-full line-clamp-1"
                        placeholder="Description"
                      />
                      <div className="flex flex-wrap gap-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={editFormData.dietaryIcons.includes(
                              "vegetarian"
                            )}
                            onChange={() =>
                              handleDietaryIconChange("vegetarian")
                            }
                            className="mr-2"
                          />
                          Vegetarian
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={editFormData.dietaryIcons.includes(
                              "special"
                            )}
                            onChange={() => handleDietaryIconChange("special")}
                            className="mr-2"
                          />
                          Special
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={editFormData.dietaryIcons.includes(
                              "topRated"
                            )}
                            onChange={() => handleDietaryIconChange("topRated")}
                            className="mr-2"
                          />
                          Top Rated
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={editFormData.dietaryIcons.includes(
                              "g'sFavorite"
                            )}
                            onChange={() =>
                              handleDietaryIconChange("g'sFavorite")
                            }
                            className="mr-2"
                          />
                          G's Favorite
                        </label>
                      </div>
                      <div>
                        {editFormData.imageUrls.map((url, index) => (
                          <div key={index}>
                            <img
                              src={url}
                              alt="Uploaded"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <button
                              onClick={() => handleRemoveImage(url, index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <input
                          type="file"
                          multiple
                          onChange={handleImageChange}
                        />
                      </div>
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleEditSubmit(item.id)}
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="px-2">
                      <strong>{item.name}</strong> - ${item.price} <br />
                      <em className="line-clamp-2">{item.description}</em>
                      <div className="w-full aspect-[3/2] bg-white">
                        <img
                          className=" object-cover h-full w-full"
                          src={item.imageUrls[0]}
                          alt={"photo of " + item.name}
                        />
                      </div>
                      <div className="w-full items-center justify-center flex p-2 text-white">
                        <button
                          className="rounded-md bg-green-600 px-2"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="rounded-md bg-red-600 px-2 ml-2"
                          onClick={() => deleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex container mx-auto items-center justify-center gap-4 h-[10%] bg-mRed px-6">
              <motion.button
                className="rounded-md bg-white text-mGreen px-3 py-2 basis-1/3"
                onClick={() => handleCategoryChange("")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                All
              </motion.button>
              <motion.button
                className="rounded-md bg-white text-mGreen px-3 py-2 basis-1/3"
                onClick={() => handleCategoryChange("Lasagna")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Lasagnas
              </motion.button>
              <motion.button
                className="rounded-md bg-white text-mGreen px-3 py-2 basis-1/3"
                onClick={() => handleCategoryChange("Panini")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Paninis
              </motion.button>
              <motion.button
                className="rounded-md bg-white text-mGreen px-3 py-2 basis-1/3"
                onClick={() => handleCategoryChange("Pasta")}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Pastas
              </motion.button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default ViewMenuList;
