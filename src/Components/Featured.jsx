import React, { useRef, useState } from "react";

function Featured() {
  const lasagnas = [
    {
      name: "Abruzzo",
      description:
        "House Made spicy Italian sausage in a light zesty tomato sauce.",
      img: "https://placeholder.com/350/400",
    },
    {
      name: "Abruzzo",
      description:
        "House Made spicy Italian sausage in a light zesty tomato sauce.",
      img: "https://placeholder.com/350/400",
    },
    {
      name: "Abruzzo",
      description:
        "House Made spicy Italian sausage in a light zesty tomato sauce.",
      img: "https://placeholder.com/350/400",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);

  const scrollToSection = (index) => {
    setCurrentPage(index);
    const section = containerRef.current.children[index];
    section.scrollIntoView({ behavior: "smooth", inline: "start" });
  };
  return (
    <div className="w-full h-full flex flex-col gap-4 bg-green-300">
      <header className="px-2 h-[10%]">
        <div className="flex gap-2 p-4 bg-gray-200 rounded-lg">
          <span className="text-mRed">
            <ion-icon name="star"></ion-icon>
          </span>
          <div className="text-2xl font-bold text-mGreen">Featured Lasagna</div>
        </div>
      </header>
      {/* Container for horizontal scroll with scroll snap */}
      <div className="h-[70%]">
        <div className="flex gap-4 overflow-auto snap-x snap-mandatory h-full my-4" ref={containerRef}>
        {lasagnas.map((lasagna, index) => (
          <section
            key={index}
            className="flex-none w-[90%] md:w-1/2 lg:w-1/3 h-full snap-start"
          >
            <div className="h-full bg-mGreen bg-opacity-40 shadow-lg rounded-lg flex flex-col items-center justify-between">
              <img
                className="object-fill w-full rounded-t-lg"
                src={lasagna.img}
                alt={lasagna.name}
              />
              <div className="p-3 text-center">
                <div className="text-3xl p-2">{lasagna.name}</div>
                <div className="text-lg">{lasagna.description}</div>
              </div>
            </div>
          </section>
        ))}
        </div>
      </div>

      <div className="flex justify-center pt-8 gap-4">
        {lasagnas.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-8 h-8 rounded-full ${
              index === currentPage ? "bg-mGreen" : "bg-gray-300"
            }`}
            aria-label={`Go to section ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default Featured;
