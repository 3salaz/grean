import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const RatingSystem = ({ itemId }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  const handleRatingSubmit = async () => {
    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }

    try {
      const ratingData = {
        userId: user.uid,
        itemId: itemId,
        rating: rating,
        timestamp: new Date(),
      };

      await addDoc(collection(db, "ratings"), ratingData);
      toast.success("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating: ", error);
      toast.error("Failed to submit rating: " + error.message);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center bg-white py-4 rounded-md w-full h-60">
      <div className="text-xl font-bold">Rate This Item</div>
      <div className="flex items-center justify-center gap-2">
        {[...Array(5)].map((star, index) => {
          const ratingValue = index + 1;

          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: "none" }}
              />
              <FaStar
                size={30}
                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                onMouseEnter={() => setHover(ratingValue)}
                onMouseLeave={() => setHover(null)}
                style={{ cursor: "pointer" }}
              />
            </label>
          );
        })}
      </div>
      <motion.button
        onClick={handleRatingSubmit}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-2"
      >
        Submit Rating
      </motion.button>
    </div>
  );
};

export default RatingSystem;
