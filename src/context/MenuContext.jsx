import React, { createContext, useState, useEffect, useContext } from 'react';
import { db, storage } from '../firebase.config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [cateringMenu, setCateringMenu] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the regular menu
  const fetchMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const menuCollection = collection(db, 'menu');
      const menuSnapshot = await getDocs(menuCollection);
      const menuList = menuSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        imageUrls: doc.data().imageUrls || [], // Ensure imageUrls is always an array
      }));
      setMenu(menuList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the catering menu
  const fetchCateringMenu = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const menuCategories = ['salads', 'appetizer', 'lasagnas', 'pasta', 'desserts'];
      const cateringMenuData = {};
  
      // Loop through each category to fetch the corresponding items
      for (const category of menuCategories) {
        // Reference the document for each category
        const categoryDocRef = doc(db, 'cateringMenu', category);
        
        // Fetch the document data
        const categoryDocSnap = await getDoc(categoryDocRef);
        
        if (categoryDocSnap.exists()) {
          // Store the 'items' array within the corresponding category in the cateringMenuData object
          cateringMenuData[category] = categoryDocSnap.data().items || [];
        } else {
          console.error(`No such document for category: ${category}`);
        }
      }
  
      // console.log('Fetched Catering Menu Data:', cateringMenuData);
      setCateringMenu(cateringMenuData);
  
    } catch (err) {
      setError(err.message);
      console.error("Error fetching catering menu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCateringMenu(); // Fetch the catering menu when the component mounts
  }, []);

  // Editing a regular menu item
  const editMenuItem = async (id, editFormData) => {
    setLoading(true);
    setError(null);
    try {
      const newImageUrls = await Promise.all(
        editFormData.newImages.map(async (file) => {
          const imageRef = ref(storage, `images/${file.name}_${new Date().getTime()}`);
          await uploadBytes(imageRef, file);
          return getDownloadURL(imageRef);
        })
      );

      const allImageUrls = [...editFormData.imageUrls, ...newImageUrls];
      const updatedItem = { ...editFormData, imageUrls: allImageUrls };
      delete updatedItem.newImages; // Prepare object for Firestore

      await updateDoc(doc(db, 'menu', id), updatedItem);

      setMenu(prevMenu => prevMenu.map(item => item.id === id ? { ...item, ...updatedItem } : item));

      toast.success('Item updated successfully!');
    } catch (error) {
      console.error('Error updating menu item:', error);
      setError(error.message);
      toast.error('Error updating menu item: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Adding a new regular menu item
  const addItem = async (item) => {
    setError(null);
    try {
      const menuCollection = collection(db, 'menu');
      await addDoc(menuCollection, item);
      fetchMenu(); // Re-fetch menu after adding item
    } catch (err) {
      setError(err.message);
    }
  };
  // Deleting a regular menu item
  const deleteItem = async (id) => {
    setError(null);
    try {
      const itemDoc = doc(db, 'menu', id);
      await deleteDoc(itemDoc);
      fetchMenu(); // Re-fetch menu after deleting item
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMenu();
    fetchCateringMenu(); // Fetch catering menu as well
  }, []);

  return (
    <MenuContext.Provider value={{
      menu,
      cateringMenu, // Provide cateringMenu data
      loading,
      setLoading,
      error,
      setError,
      addItem,
      editMenuItem,
      deleteItem
    }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};