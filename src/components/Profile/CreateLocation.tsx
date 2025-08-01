import { useState, useEffect, useRef } from "react";
import { useLocations } from "../../context/LocationsContext";
import { useProfile, UserProfile } from "../../context/ProfileContext";
import Cropper from 'react-easy-crop';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { motion } from "framer-motion";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonRadioGroup,
  IonRadio,
  IonImg,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonSpinner,
  IonIcon,
  IonCardSubtitle,
  IonSelectOption,
  IonSelect,
  IonPage
} from "@ionic/react";
import { toast } from "react-toastify";
import homeIcon from "../../assets/icons/home.png";
import businessIcon from "../../assets/icons/business.png";

// Import APIProvider and useMapsLibrary for autocomplete functionality.
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import { closeOutline } from "ionicons/icons";

// ---------- PlaceAutocomplete Component ----------
interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

const PlaceAutocomplete: React.FC<PlaceAutocompleteProps> = ({
  onPlaceSelect
}) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");



  useEffect(() => {
    if (!places || !inputRef.current) return;
    const options = {
      fields: ["geometry", "name", "formatted_address"],
      types: ["address"],
      componentRestrictions: { country: "us" }
    };
    const auto = new places.Autocomplete(inputRef.current, options);
    setAutocomplete(auto);
  }, [places]);

  useEffect(() => {
    if (!autocomplete) return;
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      onPlaceSelect(place);
    });
  }, [autocomplete, onPlaceSelect]);

  return (
    <input
      ref={inputRef}
      placeholder="Enter street address"
      className="bg-white p-2 w-full"
    />
  );
};

interface CreateLocationProps {
  profile: UserProfile | null;
  handleClose: () => void;
}

async function getCroppedImg(imageSrc: string, crop: any): Promise<Blob> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((res) => (image.onload = res));

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  canvas.width = crop.width;
  canvas.height = crop.height;
  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );
  return new Promise((res) => canvas.toBlob((blob) => res(blob!), 'image/jpeg'));
}

const CreateLocation: React.FC<CreateLocationProps> = ({
  profile,
  handleClose
}) => {
  const { createLocation } = useLocations();
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCoordinates, setLoadingCoordinates] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [uploadingImage, setUploadingImage] = useState(false);


  const [formData, setFormData] = useState({
    locationType: "",
    address: "",
    homeName: "",
    businessName: "",
    businessPhoneNumber: "",
    category: "",
    latitude: null as number | null,
    longitude: null as number | null,
    businessBio: "", // ✅ Add this
    businessLogo: "",
  });




  // Track the selected place from autocomplete.
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  // Your API key (used for both APIProvider and fallback geocoding)
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // When a place is selected from autocomplete, update the form data.
  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (place) {
      const updatedFields: Partial<typeof formData> = {};
      if (place.formatted_address) {
        updatedFields.address = place.formatted_address; // store the full address
      }
      if (place.geometry && place.geometry.location) {
        updatedFields.latitude = place.geometry.location.lat();
        updatedFields.longitude = place.geometry.location.lng();
      }
      setFormData((prevData) => ({
        ...prevData,
        ...updatedFields
      }));
    }
    setSelectedPlace(place);
  };

  // Fallback function to fetch coordinates using the Geocoding API.
  const getCoordinates = async (address: string) => {
    if (!API_KEY) {
      toast.error("Google Maps API Key is missing.");
      return null;
    }
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error(`Geocoding API Error: ${data.status}`);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Step validation: now we require address, latitude, and longitude in step 1.
  const validateStep = () => {
    switch (step) {
      case 0:
        return formData.locationType;
      case 1:
        return formData.address && formData.latitude && formData.longitude;
      case 2:
        return formData.locationType === "Business"
          ? formData.businessName &&
          formData.businessPhoneNumber &&
          formData.category
          : formData.homeName;
      case 3:
        return formData.locationType === "Business"
          ? formData.businessLogo
          : true;

      default:
        return false;
    }
  };

  const nextStep = async () => {
    if (!validateStep()) {
      toast.error("Please fill in all required fields before proceeding.");
      return;
    }
    // If no place was selected in step 1, fetch coordinates as a fallback.
    if (step === 1 && !selectedPlace) {
      setLoadingCoordinates(true);
      try {
        const coordinates = await getCoordinates(formData.address);
        if (coordinates) {
          setFormData((prevData) => ({
            ...prevData,
            latitude: coordinates.latitude,
            longitude: coordinates.longitude
          }));
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      } finally {
        setLoadingCoordinates(false);
      }
    }
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async () => {
    if (!profile?.uid) {
      toast.error("User profile not found.");
      return;
    }
    setLoading(true);
    try {
      const newLocation = {
        locationType: formData.locationType,
        address: formData.address,
        latitude: formData.latitude ?? undefined,
        longitude: formData.longitude ?? undefined,
        ...(formData.locationType === "Home" && { homeName: formData.homeName }),
        ...(formData.locationType === "Business" && {
          businessName: formData.businessName,
          businessPhoneNumber: formData.businessPhoneNumber,
          category: formData.category,
          businessBio: formData.businessBio || "",         // 🔥 fix here
          businessLogo: formData.businessLogo || "",     // ✅ Add this if you plan to handle logo uploads
        }),
      };

      const newLocationId = await createLocation(newLocation);
      if (newLocationId) {
        // await updateProfile("locations", newLocationId, "addToArray");
        toast.success("Location added successfully!");
        handleClose();
      } else {
        throw new Error("Failed to create location.");
      }
    } catch (error) {
      console.error("Error adding location:", error);
      toast.error("Failed to add location.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <IonPage>
      <IonContent className="flex items-center justify-center">
        <IonGrid className="h-full flex flex-col items-center justify-center ion-padding">
          <IonCard color="primary" className="w-full shadow-none flex flex-col items-center justify-center">
            <IonCardHeader className="ion-padding w-full">
              <IonCardSubtitle className="text-xs font-light">{step === 0 ? "Select the type of location you want to add." : step === 1 ? "Enter the address of the location." : "Enter the name of the location."}</IonCardSubtitle>
              <IonCardTitle>Add Location</IonCardTitle>
            </IonCardHeader>
            <IonCardContent className="flex flex-col items-center justify-center m-0 p-0 w-full text-[#75b657] bg-slate-100 ion-padding-top">

              <motion.div
                key={step}
                className="w-full flex-grow ion-padding-vertical"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <IonRow className="w-full">
                    <IonCol size="auto" className="mx-auto">
                      <div className="flex items-center justify-center gap-4 bg-slate-100 ion-padding rounded-lg">
                        {["Business", "Home"].map((type) => (
                          <div
                            key={type}
                            onClick={() => handleInputChange("locationType", type)}
                            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 w-28
                          ${formData.locationType === type
                                ? "border-orange-500 bg-orange-100"
                                : "border-gray-300 bg-white"}
                        `}
                          >
                            <div className="w-16 h-16 flex items-center justify-center">
                              <IonImg
                                src={type === "Business" ? businessIcon : homeIcon}
                                alt={type}
                                className="object-contain"
                              />
                            </div>
                            <IonText className="text-center mt-2 font-medium">{type}</IonText>
                          </div>
                        ))}
                      </div>
                    </IonCol>
                  </IonRow>

                )}
                {step === 1 && (
                  <IonRow className="w-full">
                    <IonCol size="12" className="ion-padding-vertical text-black">
                      <APIProvider apiKey={API_KEY}>
                        <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
                      </APIProvider>
                    </IonCol>
                  </IonRow>
                )}
                {step === 2 && (
                  <IonRow className="w-full">
                    <IonCol size="12" className="ion-padding-vertical text-black">

                      {formData.locationType === "Business" ? (
                        <IonList className="ion-padding-vertical rounded-lg">
                          <IonItem>
                            <IonLabel position="stacked">
                              Business Name
                            </IonLabel>
                            <IonInput
                              value={formData.businessName}
                              onIonChange={(e) =>
                                handleInputChange(
                                  "businessName",
                                  e.detail.value ?? ""
                                )
                              }
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel position="stacked">Business Bio</IonLabel>
                            <IonInput
                              value={formData.businessBio}
                              onIonChange={(e) =>
                                handleInputChange("businessBio", e.detail.value ?? "")
                              }
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel position="stacked">Phone Number</IonLabel>
                            <IonInput
                              value={formData.businessPhoneNumber}
                              onIonInput={(e) => {
                                const rawValue = (e as CustomEvent).detail.value ?? "";
                                const digits = rawValue.replace(/\D/g, "").slice(0, 10);
                                let formatted = digits;
                                if (digits.length > 6) {
                                  formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
                                } else if (digits.length > 3) {
                                  formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
                                }
                                handleInputChange("businessPhoneNumber", formatted);
                              }}
                              inputmode="numeric"
                              pattern="[0-9]*"
                            />
                          </IonItem>
                          <IonItem>
                            <IonLabel position="stacked">Category</IonLabel>
                            <IonSelect
                              value={formData.category}
                              placeholder="Select Category"
                              onIonChange={(e) => handleInputChange("category", e.detail.value)}
                            >
                              <IonSelectOption value="Retail">Retail</IonSelectOption>
                              <IonSelectOption value="Food & Beverage">Food & Beverage</IonSelectOption>
                              <IonSelectOption value="Health & Wellness">Health & Wellness</IonSelectOption>
                              <IonSelectOption value="Professional Services">Professional Services</IonSelectOption>
                              <IonSelectOption value="Education">Education</IonSelectOption>
                              <IonSelectOption value="Entertainment">Entertainment</IonSelectOption>
                              <IonSelectOption value="Other">Other</IonSelectOption>
                            </IonSelect>
                          </IonItem>

                        </IonList>
                      ) : (
                        <IonList className="ion-padding-vertical rounded-lg">
                          <IonItem className="w-full">
                            <IonLabel position="floating">Home Name</IonLabel>
                            <IonInput
                              value={formData.homeName}
                              onIonChange={(e) =>
                                handleInputChange(
                                  "homeName",
                                  e.detail.value ?? ""
                                )
                              }
                            />
                          </IonItem>
                        </IonList>
                      )}
                    </IonCol>
                  </IonRow>
                )}

                {step === 3 && formData.locationType === "Business" && (
                  <IonRow className="w-full flex flex-col gap-4 items-center justify-center">
                    <IonCol size="12" className="flex flex-col items-center gap-2">
                      <IonText className="font-medium text-lg">Upload Business Logo</IonText>
                      <label className="bg-white px-4 py-2 rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition-all duration-200">
                        <span className="text-[#75b657] font-semibold">Choose Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = () => setImageSrc(reader.result as string);
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </IonCol>

                    {imageSrc && (
                      <>
                        <IonCol size="12">
                          <div style={{ position: 'relative', width: '100%', height: '256px', background: 'white' }}>
                            <Cropper
                              image={imageSrc}
                              crop={crop}
                              zoom={zoom}
                              aspect={1}
                              onCropChange={setCrop}
                              onZoomChange={setZoom}
                              onCropComplete={(_, croppedArea) => setCroppedAreaPixels(croppedArea)}
                            />
                          </div>
                        </IonCol>


                        <IonCol size="auto" className="flex justify-center">
                          <IonButton
                            disabled={uploadingImage}
                            onClick={async () => {
                              if (!croppedAreaPixels || !imageSrc) return;
                              setUploadingImage(true);
                              const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
                              const storage = getStorage();
                              const storageRef = ref(storage, `locations/${profile?.uid}/${Date.now()}.jpg`);
                              await uploadBytes(storageRef, croppedImageBlob);
                              const url = await getDownloadURL(storageRef);
                              setFormData((prev) => ({ ...prev, businessLogo: url }));
                              setImageSrc(null); // Clear UI
                              setUploadingImage(false);
                              toast.success("Logo uploaded!");
                            }}
                          >
                            {uploadingImage ? <IonSpinner name="crescent" /> : "Upload Cropped Logo"}
                          </IonButton>
                        </IonCol>
                      </>
                    )}
                  </IonRow>
                )}


                {loadingCoordinates && <IonSpinner />}
              </motion.div>

              <IonRow className="flex items-center justify-center ion-padding-bottom gap-2">
                {step > 0 && (
                  <IonCol size="auto">
                    <IonButton color="danger" size="small" expand="block" onClick={prevStep}>
                      Back
                    </IonButton>
                  </IonCol>
                )}

                {(formData.locationType === "Business" ? step < 3 : step < 2) ? (
                  <IonCol size="auto">
                    <IonButton size="small" expand="block" onClick={nextStep}>
                      Next
                    </IonButton>
                  </IonCol>
                ) : (
                  <IonCol size="auto">
                    <IonButton
                      expand="block"
                      size="small"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <IonSpinner name="crescent" /> : "Submit"}
                    </IonButton>
                  </IonCol>
                )}
              </IonRow>


              <IonRow>
                <IonCol size="auto" className="mx-auto">
                  <IonButton color="danger" size="small" shape="round" expand="block" onClick={handleClose}>
                    <IonIcon slot="icon-only" icon={closeOutline} />
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonCardContent>
          </IonCard>
        </IonGrid>
      </IonContent>
    </IonPage>

  );
};

export default CreateLocation;
