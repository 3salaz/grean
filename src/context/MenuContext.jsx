import React, { createContext, useState, useEffect, useContext } from 'react';
import { db, storage } from '../firebase.config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const editMenuItem = async (id, editFormData) => {
    setLoading(true);
    setError(null);
    try {
        // Assume editFormData.newImages contains File objects needing upload
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

        // Here you'd call Firestore to update the item
        await updateDoc(doc(db, "menu", id), updatedItem);

        // Optionally update local state if you manage menu items locally
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

  useEffect(() => {
    fetchMenu();
  }, []);

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

  return (
    <MenuContext.Provider value={{ menu, loading,setLoading, error, setError, addItem, editMenuItem, deleteItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  return useContext(MenuContext);
};
