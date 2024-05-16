import React, { useEffect } from "react";

const InstagramEmbed = ({ url }) => {
  useEffect(() => {
    // Ensure the Instagram script is loaded
    const script = document.createElement("script");
    script.async = true;
    script.src = "//www.instagram.com/embed.js";
    document.body.appendChild(script);

    // Optional: Cleanup on component unmount
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, [url]);

  return (
    <div className="h-auto md:h-full w-full px-2 drop-shadow-3xl flex items-center justify-center bg-gray-100 min-h-[350px]">
      <blockquote
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: "0",
          borderRadius: "3px",
          boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
          margin: "5px",
          maxWidth: "1040px",
          minWidth: "326px",
          padding: "0",
          width: "100%",
        }}
      ></blockquote>
    </div>
  );
};

export default InstagramEmbed;
