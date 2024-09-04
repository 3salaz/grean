import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonList,
  IonListHeader,
  IonModal,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useMenu } from "../context/MenuContext";
import "../theme/preorder.css";

const Preorder = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const history = useHistory();
  const [categories, setCategories] = useState([
    {
      key: Date.now(),
      items: [{ key: Date.now(), value: "", quantity: 1 }],
      selectedCategory: "",
    },
  ]);
  const [formData, setFormData] = useState({});

  const { cateringMenu, loading, error } = useMenu();

  useEffect(() => {
    const calculateCutoffDate = () => {
      const today = new Date();
      let cutoffDate = new Date(today);
      let day = cutoffDate.getDay();

      if (day === 0) {
        cutoffDate.setDate(cutoffDate.getDate() + 4); // Move to Thursday
      } else if (day === 6) {
        cutoffDate.setDate(cutoffDate.getDate() + 5); // Move to Thursday
      } else {
        cutoffDate.setDate(cutoffDate.getDate() + 2);
        let newDay = cutoffDate.getDay();
        if (newDay === 0) {
          cutoffDate.setDate(cutoffDate.getDate() + 3); // Skip Sunday, Monday to Thursday
        } else if (newDay === 1) {
          cutoffDate.setDate(cutoffDate.getDate() + 2); // Skip Monday to Thursday
        }
      }

      setMinDate(cutoffDate);
    };

    calculateCutoffDate();
  }, []);

  const getNext7Days = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = moment(minDate).add(i, "days");
      if (day.day() !== 0 && day.day() !== 1) {
        days.push(day);
      }
    }
    return days;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const handleDropdownChange = (value) => {
    const date = moment(value, "MMMM D, YYYY").toDate();
    setSelectedDate(date);
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const formattedPhoneNumber = formatPhoneNumber(value);
    setFormData({ ...formData, phoneNumber: formattedPhoneNumber });
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handleCategoryChange = (key, selectedCategory) => {
    setCategories(
      categories.map((category) =>
        category.key === key
          ? {
              ...category,
              selectedCategory,
              items: [{ key: Date.now(), value: "", quantity: 1 }],
            }
          : category
      )
    );
  };

  const handleOrderItemChange = (categoryKey, itemKey, value) =>
    setCategories(
      categories.map((category) =>
        category.key === categoryKey
          ? {
              ...category,
              items: category.items.map((item) =>
                item.key === itemKey ? { ...item, value } : item
              ),
            }
          : category
      )
    );

  const handleQuantityChange = (categoryKey, itemKey, quantity) =>
    setCategories(
      categories.map((category) =>
        category.key === categoryKey
          ? {
              ...category,
              items: category.items.map((item) =>
                item.key === itemKey ? { ...item, quantity } : item
              ),
            }
          : category
      )
    );

  const addCategory = () =>
    setCategories([
      ...categories,
      {
        key: Date.now(),
        items: [{ key: Date.now(), value: "", quantity: 1 }],
        selectedCategory: "",
      },
    ]);

  const removeCategory = (categoryKey) => {
    if (categories.length > 1) {
      setCategories(
        categories.filter((category) => category.key !== categoryKey)
      );
    }
  };

  const addOrderItem = (categoryKey) =>
    setCategories(
      categories.map((category) =>
        category.key === categoryKey
          ? {
              ...category,
              items: [
                ...category.items,
                { key: Date.now(), value: "", quantity: 1 },
              ],
            }
          : category
      )
    );

  const removeOrderItem = (categoryKey, itemKey) =>
    setCategories(
      categories.map((category) =>
        category.key === categoryKey
          ? {
              ...category,
              items: category.items.filter((item) => item.key !== itemKey),
            }
          : category
      )
    );

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const structuredCategories = categories.map((category) => ({
      category: category.selectedCategory,
      items: category.items.map((item) => ({
        name: item.value,
        quantity: item.quantity,
      })),
    }));

    const templateParams = {
      orderName: formData.orderName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      pickupDate: selectedDate
        ? moment(selectedDate).format("MMMM D, YYYY")
        : undefined,
      pickupTime: formData.pickupTime,
      tempType: formData.tempType,
      categories: structuredCategories.map((cat) => ({
        category: cat.category,
        items: cat.items
          .map((item) => `${item.name} (x${item.quantity})`)
          .join(", "),
      })),
      comments: formData.comments,
    };

    emailjs
      .send(
        "service_3salaz",
        "template_mi55j1p",
        templateParams,
        "OXVmMrXHHOEpr832j"
      )
      .then(
        (response) => {
          alert("Order submitted successfully!");
          setCurrentStep(0);
          setSelectedDate(null);
          setCategories([
            {
              key: Date.now(),
              items: [{ key: Date.now(), value: "", quantity: 1 }],
              selectedCategory: "",
            },
          ]);
          setFormData({});
          history.push("/");
        },
        (err) => {
          alert("Failed to submit order.");
        }
      );
  };

  const steps = [
    {
      title: "Basic",
      content: (
        <div className="w-full h-[90%] flex flex-col justify-center">
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              placeholder="Enter order name"
              value={formData.orderName}
              onIonChange={(e) =>
                setFormData({ ...formData, orderName: e.detail.value })
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Contact Phone Number</IonLabel>
            <IonInput
              placeholder="Enter contact phone number"
              value={formData.phoneNumber}
              onIonChange={handlePhoneNumberChange}
              type="tel"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              placeholder="Enter your email"
              value={formData.email}
              onIonChange={(e) =>
                setFormData({ ...formData, email: e.detail.value })
              }
              type="email"
            />
          </IonItem>
        </div>
      ),
    },
    {
      title: "Pickup",
      content: (
        <div className="w-full h-[90%] flex flex-col justify-center">
          <IonItem>
            <IonLabel position="stacked">Select Pickup Date</IonLabel>
            <IonSelect
              placeholder="Select a date"
              onIonChange={(e) => handleDropdownChange(e.detail.value)}
              value={
                selectedDate
                  ? moment(selectedDate).format("MMMM D, YYYY")
                  : undefined
              }
            >
              {getNext7Days().map((day, index) => (
                <IonSelectOption key={index} value={day.format("MMMM D, YYYY")}>
                  {day.format("MMMM D, YYYY")}
                </IonSelectOption>
              ))}
            </IonSelect>
            <IonButton
              onClick={() => setShowCalendar(!showCalendar)}
              fill="clear"
            >
              <ion-icon name="calendar-outline"></ion-icon>
            </IonButton>
          </IonItem>
          {showCalendar && (
            <div className="mb-2 w-full p-2 max-w-lg">
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={minDate}
                tileDisabled={({ date }) => {
                  const day = date.getDay();
                  return day === 0 || day === 1; // Disable Sundays and Mondays
                }}
              />
            </div>
          )}
          <IonItem>
            <IonLabel position="stacked">Select Pickup Time</IonLabel>
            <IonSelect
              placeholder="Select a pickup time"
              value={formData.pickupTime}
              onIonChange={(e) =>
                setFormData({ ...formData, pickupTime: e.detail.value })
              }
            >
              <IonSelectOption value="10am">10am</IonSelectOption>
              <IonSelectOption value="11am">11am</IonSelectOption>
              <IonSelectOption value="2pm">2pm</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Temp</IonLabel>
            <IonRadioGroup
              value={formData.tempType}
              onIonChange={(e) =>
                setFormData({ ...formData, tempType: e.detail.value })
              }
            >
              <IonListHeader>
                <IonLabel>Select Ready Type</IonLabel>
              </IonListHeader>
              <IonItem>
                <IonRadio value="Hot">Hot</IonRadio>
              </IonItem>
              <IonItem>
                <IonRadio value="Cold">Cold</IonRadio>
              </IonItem>
            </IonRadioGroup>
          </IonItem>
        </div>
      ),
    },
    {
      title: "Menu",
      content: (
        <div className="w-full h-[90%] flex flex-col justify-center overflow-auto">
          {loading && <p>Loading menu...</p>}
          {error && <p>Error loading menu: {error}</p>}
          {!loading &&
            cateringMenu &&
            Object.keys(cateringMenu).length > 0 &&
            categories.map((category, categoryIndex) => (
              <div key={category.key} className="mb-4 border p-4 rounded">
                <IonItem>
                  <IonLabel>Select Category</IonLabel>
                  <IonSelect
                    placeholder="Select a category"
                    value={category.selectedCategory}
                    onIonChange={(e) =>
                      handleCategoryChange(category.key, e.detail.value)
                    }
                  >
                    {Object.keys(cateringMenu).map((categoryName) => (
                      <IonSelectOption key={categoryName} value={categoryName}>
                        {categoryName.charAt(0).toUpperCase() +
                          categoryName.slice(1)}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                  {categories.length > 1 && (
                    <IonButton
                      color="danger"
                      onClick={() => removeCategory(category.key)}
                      fill="clear"
                    >
                      <ion-icon name="remove-circle-outline"></ion-icon>
                    </IonButton>
                  )}
                </IonItem>
                <AnimatePresence>
                  {category.selectedCategory &&
                    category.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.key}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex gap-2 items-center mb-2 w-full"
                      >
                        <IonItem>
                          <IonLabel>
                            Select{" "}
                            {category.selectedCategory.charAt(0).toUpperCase() +
                              category.selectedCategory.slice(1)}{" "}
                            {itemIndex + 1}
                          </IonLabel>
                          <IonSelect
                            placeholder={`Select a ${category.selectedCategory}`}
                            value={item.value}
                            onIonChange={(e) =>
                              handleOrderItemChange(
                                category.key,
                                item.key,
                                e.detail.value
                              )
                            }
                          >
                            {cateringMenu[
                              category.selectedCategory.toLowerCase()
                            ]?.map((menuItem) => (
                              <IonSelectOption
                                key={menuItem.name}
                                value={menuItem.name}
                              >
                                {menuItem.name}
                              </IonSelectOption>
                            ))}
                          </IonSelect>
                          <IonInput
                            type="number"
                            min="1"
                            value={item.quantity}
                            onIonChange={(e) =>
                              handleQuantityChange(
                                category.key,
                                item.key,
                                parseInt(e.detail.value)
                              )
                            }
                          />
                          {category.items.length > 1 && (
                            <IonButton
                              color="danger"
                              onClick={() =>
                                removeOrderItem(category.key, item.key)
                              }
                              fill="clear"
                            >
                              <ion-icon name="remove-circle-outline"></ion-icon>
                            </IonButton>
                          )}
                        </IonItem>
                      </motion.div>
                    ))}
                </AnimatePresence>
                <IonButton
                  onClick={() => addOrderItem(category.key)}
                  disabled={!category.items[category.items.length - 1].value}
                  expand="block"
                  fill="outline"
                >
                  Add Another{" "}
                  {category.selectedCategory.charAt(0).toUpperCase() +
                    category.selectedCategory.slice(1)}
                </IonButton>
              </div>
            ))}
          <IonButton expand="block" onClick={addCategory}>
            Add Another Category
          </IonButton>
        </div>
      ),
    },
    {
      title: "Review",
      content: (
        <div className="w-full h-[90%] flex flex-col justify-center">
          {renderSummary()}
          <IonItem>
            <IonLabel position="stacked">Additional Comments</IonLabel>
            <IonTextarea
              placeholder="Enter any additional details here"
              value={formData.comments}
              onIonChange={(e) =>
                setFormData({ ...formData, comments: e.detail.value })
              }
            />
          </IonItem>
        </div>
      ),
    },
  ];

  const renderSummary = () => {
    const calculateItemTotal = (price, quantity) => {
      return parseFloat(price) * quantity;
    };

    const calculateTotalWithTax = (total) => {
      return total * 1.0725;
    };

    let grandTotal = 0;

    return (
      <div className="p-2 border rounded-lg bg-gray-50 w-full h-full">
        <h3 className="text-lg font-bold mb-2">Order Summary</h3>
        {categories.map((category, index) => {
          const categoryItems = cateringMenu[category.selectedCategory.toLowerCase()];

          if (!categoryItems) {
            return (
              <div key={index} className="mb-2">
                <h4 className="font-semibold">{category.selectedCategory}</h4>
                <p>No items found for this category.</p>
              </div>
            );
          }

          return (
            <div key={index} className="mb-2">
              <h4 className="font-semibold">{category.selectedCategory}</h4>
              <ul>
                {category.items.map((item, idx) => {
                  const menuItem = categoryItems.find(
                    (menuItem) => menuItem.name === item.value
                  );

                  if (!menuItem) {
                    return (
                      <li key={idx} className="ml-4 list-disc">
                        {item.value} (x{item.quantity}) - Item not found
                      </li>
                    );
                  }

                  const itemTotal = calculateItemTotal(menuItem.price, item.quantity);
                  grandTotal += itemTotal;

                  return (
                    <li key={idx} className="ml-4 list-disc">
                      {item.value} (x{item.quantity}) - ${itemTotal.toFixed(2)}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="mt-4">
          <h4 className="font-bold">Subtotal: ${grandTotal.toFixed(2)}</h4>
          <h4 className="font-bold">
            Total with Tax: ${calculateTotalWithTax(grandTotal).toFixed(2)}
          </h4>
        </div>
      </div>
    );
  };

  return (
    <IonModal isOpen={true} onDidDismiss={() => history.push("/")}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Preorder</IonTitle>
          <IonButton slot="end" onClick={() => history.push("/")}>
            Close
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <motion.div
          className="w-full h-full container mx-auto rounded flex flex-col items-center justify-between overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="w-full h-[10%] flex overflow-x-auto custom-steps-header">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center justify-center gap-2 step-item ${
                  currentStep === index ? "active" : ""
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <AnimatePresence mode="wait">
                  {currentStep === index && (
                    <motion.div
                      key={`icon-${index}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-mGreen font-bold text-white aspect-square w-10 flex items-center justify-center rounded-full"
                    >
                      {index + 1}
                    </motion.div>
                  )}
                </AnimatePresence>
                <AnimatePresence mode="wait">
                  {currentStep === index && (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="font-bold text-2xl text-mRed"
                    >
                      {step.title}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </header>

          <div className="w-full h-[90%] flex flex-col items-center justify-between px-2">
            {steps[currentStep].content}
            <div className="flex items-center justify-center gap-4 w-full h-[10%]">
              {currentStep > 0 && (
                <IonButton
                  color="secondary"
                  onClick={prev}
                  className="bg-red-500 text-white"
                >
                  Back
                </IonButton>
              )}

              {currentStep === steps.length - 1 && (
                <IonButton
                  color="primary"
                  onClick={handleSubmit}
                  className=" bg-mGreen text-white font-bold"
                >
                  Submit
                </IonButton>
              )}

              {currentStep < steps.length - 1 && (
                <IonButton
                  color="primary"
                  className="bg-mGreen font-bold"
                  onClick={next}
                >
                  Next
                </IonButton>
              )}
            </div>
          </div>
        </motion.div>
      </IonContent>
    </IonModal>
  );
};

export default Preorder;
