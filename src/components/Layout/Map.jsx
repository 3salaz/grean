import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMapGl, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import { useLocations } from "../../context/LocationsContext";

function Map() {
  const [viewPort, setViewPort] = useState({
    center: [-122.433247, 37.742646], // starting position
    latitude: 37.742646,
    longitude: -122.433247,
    zoom: 11,
  });

  const bounds = [
    [-122.66336, 37.492987], // Southwest coordinates
    [-122.250481, 37.871651], // Northeast coordinates
  ];

  const [popupInfo, setPopupInfo] = useState(null);
  const { locations } = useLocations(); // Use the context to get locations

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Adjust the timeout as needed

    return () => clearTimeout(timer);
  }, []);

  const pins = useMemo(
    () =>
      locations.map((location, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={location.lng}
          latitude={location.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagate to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(location);
            setViewPort((prev) => ({
              ...prev,
              latitude: location.lat,
              longitude: location.lng,
              zoom: 14, // Zoom in on the clicked location
            }));
          }}
        >
          <div className="flex flex-col items-center justify-center rounded-full p-1 border-grean text-grean border-2 hover:text-orange hover:border-orange slate-800 bg-white">
            <ion-icon
              className="w-full h-full flex items-center justify-center"
              name="pin-sharp"
              size="small"
            ></ion-icon>
          </div>
        </Marker>
      )),
    [locations]
  );

  return (
    <div id="map" className="h-full w-full relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center bg-white h-[80%] mt-[8svh]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="text-center text-white font-bold aspect-square bg-grean rounded-full flex items-center justify-center p-4"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Loading...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <ReactMapGl
          {...viewPort}
          onMove={(evt) => setViewPort(evt.viewState)}
          maxBounds={bounds} // Set the map's geographical boundaries.
          mapboxAccessToken="pk.eyJ1IjoiM3NhbGF6IiwiYSI6ImNsZG1xNjZ2aDBidnozb21kNTIxNTQ1a2wifQ.0JC6qoYDFC96znCbHh4kpQ"
          transitionDuration="30"
          className="h-full w-full overflow-hidden"
          mapStyle={"mapbox://styles/3salaz/cli6bc4e000m201rf0dfp3oyh"}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />
          {pins}
          <AnimatePresence>
            {popupInfo && (
              <Popup
                anchor="top"
                longitude={Number(popupInfo.lng)}
                latitude={Number(popupInfo.lat)}
                closeButton={false}
                closeOnClick={false}
                onClose={() => setPopupInfo(null)}
                className="custom-popup max-w-md md:max-w-lg"
                maxWidth="600px"
              >
                <motion.div
                  className="flex flex-col gap-2 rounded-md bg-grean drop-shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <header className="relative">
                    <div className="absolute top-0 right-0 p-2">
                      <button
                        onClick={() => setPopupInfo(null)}
                        className="text-white bg-red-500 hover:bg-red-700 rounded-full p-1"
                      >
                        Close
                      </button>
                    </div>
                    <div className="flex items-center justify-center w-full py-2">
                      <img className=" h-20 w-20 bg-white aspect-square items-center justify-center flex rounded-full" src={popupInfo.busisnessLogo} alt="logo" />
                    </div>

                    <div className="flex text-[16px] items-center justify-center">
                      <div className="text-2xl">{popupInfo.businessName}</div>
                    </div>
                    <div className="flex items-center justify-center">
                      <a href={popupInfo.website} className="text-white font-bold basis-1/3 text-center" target="_new">
                        Website
                      </a>
                    </div>
                  </header>
                  <div id="stats" className="flex gap-1 text-white text-center px-2">
                    <div className="basis-1/3 bg-white text-grean rounded-sm flex flex-col p-2">
                      <div className="font-bold">Plastic</div>
                      <div>12lbs</div>
                    </div>
                    <div className="basis-1/3 bg-white text-grean rounded-sm flex flex-col p-2">
                      <div className="font-bold">Aluminum</div>
                      <div>12lbs</div>
                    </div>
                    <div className="basis-1/3 bg-white text-grean rounded-sm flex flex-col p-2">
                      <div className="font-bold">Total</div>
                      <div>24lbs</div>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="text-center">{popupInfo.description}</div>
                  </div>
                </motion.div>
              </Popup>
            )}
          </AnimatePresence>
        </ReactMapGl>
      )}
    </div>
  );
}

export default Map;
