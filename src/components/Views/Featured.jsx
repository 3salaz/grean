import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMenu } from "../../context/MenuContext";

function Featured() {
  const containerRef = useRef(null);
  const [currentView, setCurrentView] = useState(0);
  const [currentCategory, setCurrentCategory] = useState("Lasagna");
  const { menu, loading, error } = useMenu();

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
    <div className="w-full h-full flex flex-col justify-between items-center relative">
      <div className="w-full h-[90%] flex flex-col items-center justify-center gap-6 relative overflow-hidden">
        <div
          className="flex items-center justify-start gap-3 overflow-x-auto snap-x snap-mandatory w-full hide-scroll h-full"
          ref={containerRef}
        >
          {filteredMenuItems.map((item, index) => (
            <section
              key={item.id}
              className="flex-none items-center my-auto w-[75%] md:w-1/2 bg-mYellow lg:w-1/5 snap-center hide-scroll box-border drop-shadow-lg px-2 gap-2"
            >
              <div className="flex items-center justify-center gap-2 h-full w-full">
                <div className="basis-4/6 w-full h-full flex items-center justify-center aspect-[3/4]">
                  <img
                    className="object-cover h-full rounded-lg shadow-4xl"
                    src={item.imageUrls[0] || "default-image-url"}
                    alt={item.name}
                  />
                </div>
                <div className="flex flex-col items-center justify-center basis-2/6 gap-1 aspect-square h-full py-2">
                  <div className="h-full shadow-4xl w-full items-center justify-center flex">
                    <img
                      className="aspect-square object-cover h-full rounded-lg shadow-4xl"
                      src={
                        item.imageUrls[1] ||
                        item.imageUrls[0] ||
                        "default-image-url"
                      }
                      alt={item.name}
                    />
                  </div>
                  <div className="h-full shadow-4xl w-full items-center justify-center flex">
                    <img
                      className="aspect-square h-full object-cover rounded-lg shadow-4xl"
                      src={
                        item.imageUrls[2] ||
                        item.imageUrls[0] ||
                        "default-image-url"
                      }
                      alt={item.name}
                    />
                  </div>
                  <div className="h-full shadow-4xl w-full items-center justify-center flex">
                    <img
                      className="aspect-square object-cover h-full rounded-lg shadow-4xl"
                      src={
                        item.imageUrls[3] ||
                        item.imageUrls[0] ||
                        "default-image-url"
                      }
                      alt={item.name}
                    />
                  </div>
                </div>
              </div>
              <div className="p-3 text-left bg-white rounded-lg w-full h-full flex flex-col gap-1 justify-center">
                <div className="text-xl line-clamp-1 font-bold text-mRed">
                  {item.name}
                </div>
                <div className="text-sm px-1 line-clamp-4 leading-7 min-h-32">
                  {item.description}
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between w-full py-2">
                <div className="basis-full rounded-sm">
                  {item ? (
                    item.dietaryIcons.includes("vegetarian") ||
                    item.dietaryIcons.includes("special") ||
                    item.dietaryIcons.includes("topRated") ||
                    item.dietaryIcons.includes("g'sFavorite") ? (
                      <div className="flex items-center justify-center">
                        <ul className="p-2 flex gap-2 bg-mGreen rounded-md">
                          {item.dietaryIcons.includes("vegetarian") && (
                            <li className="text-mGreen bg-white rounded-full aspect-square w-8 flex items-center justify-center">
                              <ion-icon name="leaf-outline"></ion-icon>
                            </li>
                          )}
                          {item.dietaryIcons.includes("special") && (
                            <li className="text-mGreen bg-white rounded-full aspect-square w-8 flex items-center justify-center">
                              <ion-icon name="ribbon-outline"></ion-icon>
                            </li>
                          )}
                          {item.dietaryIcons.includes("topRated") && (
                            <li className="text-mGreen bg-white rounded-full aspect-square w-8 flex items-center justify-center">
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

        <div className="flex justify-center items-center gap-3 bg-white w-full">
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

      </div>

      <div className="flex container mx-auto items-center justify-center gap-4 h-[10%] bg-white px-6">
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
