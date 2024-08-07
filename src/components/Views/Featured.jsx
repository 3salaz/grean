import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMenu } from "../../context/MenuContext";
import { ClipLoader } from "react-spinners"; // Import the spinner

function Featured() {
  const containerRef = useRef(null);
  const [currentView, setCurrentView] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("Lasagna");
  const { menu, loading, error } = useMenu();
  const [imageLoaded, setImageLoaded] = useState({});

  const scrollToSection = (index) => {
    setCurrentView(index);
    const section = containerRef.current.children[index];
    section.scrollIntoView({ behavior: "smooth", inline: "start" });
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setCurrentView(0);
    containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
  };

  const handleImageLoad = (index) => {
    setImageLoaded((prevState) => ({ ...prevState, [index]: true }));
  };

  const filteredMenuItems = menu.filter(
    (item) => item.category.toLowerCase() === currentCategory.toLowerCase()
  );

  if (loading) {
    return <div>Loading menu items...</div>;
  }

  if (error) {
    return <div>Error loading menu items: {error}</div>;
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative container p-4 gap-6">
      <div className="w-full flex flex-col items-center justify-center relative overflow-hidden">
        <div
          className="flex items-center justify-start overflow-x-auto snap-x snap-mandatory w-full hide-scroll"
          ref={containerRef}
        >
          {filteredMenuItems.map((item, index) => (
            <section
              key={item.id}
              className="flex-none items-center my-auto w-[85%] md:w-[50%] h-full lg:w-1/4 snap-center hide-scroll box-border p-2"
            >
              <div className="h-full flex flex-col gap-4 justify-between drop-shadow-lg bg-white">
                <div className="grid grid-cols-4 gap-2 w-full p-2 bg-mYellow">
                  <div className="col-span-3 h-full flex items-center justify-center">
                    {!imageLoaded[index] && (
                      <div className="w-full h-full flex items-center justify-center">
                        <ClipLoader color={"#09f"} loading={!imageLoaded[index]} size={36} />
                      </div>
                    )}
                    <img
                      className={`object-cover h-full w-full rounded-lg ${
                        !imageLoaded[index] ? "hidden" : ""
                      }`}
                      src={item.imageUrls[0] || "default-image-url"}
                      alt={item.name}
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                  <div className="col-span-1 grid grid-rows-3 gap-2 h-full">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="row-span-1 h-full flex items-center justify-center"
                        >
                          {!imageLoaded[`${index}-${i}`] && (
                            <div className="w-full h-full flex items-center justify-center">
                              <ClipLoader color={"#09f"} loading={!imageLoaded[`${index}-${i}`]} size={36} />
                            </div>
                          )}
                          <img
                            className={`aspect-square object-cover h-full w-full rounded-lg shadow-4xl ${
                              !imageLoaded[`${index}-${i}`] ? "hidden" : ""
                            }`}
                            src={
                              item.imageUrls[i + 1] ||
                              item.imageUrls[0] ||
                              "default-image-url"
                            }
                            alt={item.name}
                            onLoad={() => handleImageLoad(`${index}-${i}`)}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div>
                  <div className="text-xl px-2 line-clamp-1 font-bold text-mRed">
                    {item.name}
                  </div>
                  <div className="text-sm px-2 leading-7 h-24 overflow-hidden text-ellipsis">
                    {item.description}
                  </div>
                </div>

                <div className="rounded-b-md bg-mGreen p-2">
                  {item ? (
                    item.dietaryIcons.includes("vegetarian") ||
                    item.dietaryIcons.includes("special") ||
                    item.dietaryIcons.includes("topRated") ||
                    item.dietaryIcons.includes("g'sFavorite") ? (
                      <div className="flex items-center justify-center">
                        <ul className="p-1 flex gap-2 rounded-md">
                          {item.dietaryIcons.includes("vegetarian") && (
                            <li className="text-mGreen border-2 border-mYellow bg-white rounded-full aspect-square w-8 flex items-center justify-center">
                              <ion-icon name="leaf-outline"></ion-icon>
                            </li>
                          )}
                          {item.dietaryIcons.includes("special") && (
                            <li className="text-mGreen bg-white rounded-full aspect-square w-8 flex items-center justify-center">
                              <ion-icon name="ribbon-outline"></ion-icon>
                            </li>
                          )}
                          {item.dietaryIcons.includes("topRated") && (
                            <li className="text-mYellow bg-white rounded-full aspect-square w-8 flex items-center justify-center">
                              <ion-icon name="star-outline"></ion-icon>
                            </li>
                          )}
                          {item.dietaryIcons.includes("g'sFavorite") && (
                            <li className="text-mGreen bg-white rounded-full aspect-square w-8 flex items-center justify-center">
                              <ion-icon name="heart-outline"></ion-icon>
                            </li>
                          )}
                        </ul>
                      </div>
                    ) : (
                      <div className="h-10"></div>
                    )
                  ) : (
                    <div className="h-10"></div>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-2 w-full">
        {filteredMenuItems.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-4 h-4 rounded-full ${
              index === currentView ? "bg-mGreen" : "bg-gray-300"
            }`}
            aria-label={`Go to section ${index + 1}`}
          ></button>
        ))}
      </div>

      <div className="flex container mx-auto items-center justify-center gap-4 px-6">
        <motion.button
          className="rounded-md bg-mRed text-white px-3 py-2 basis-1/3"
          onClick={() => handleCategoryChange("Lasagna")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Lasagnas
        </motion.button>
        <motion.button
          className="rounded-md bg-mRed text-white px-3 py-2 basis-1/3"
          onClick={() => handleCategoryChange("Panini")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Paninis
        </motion.button>
        <motion.button
          className="rounded-md bg-mRed text-white px-3 py-2 basis-1/3"
          onClick={() => handleCategoryChange("Pasta")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Pastas
        </motion.button>
      </div>
    </div>
  );
}

export default Featured;

