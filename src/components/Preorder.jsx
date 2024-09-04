import React, { useState, useEffect } from "react";
import { Button, Select, Form, Input, Radio, Steps } from "antd";
import {
  CalendarOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "tailwindcss/tailwind.css";
import emailjs from "emailjs-com";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../context/MenuContext"; // Import useMenu hook
import "../Styles/preorder.css";

const Preorder = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const { Option } = Select;
  const { TextArea } = Input;
  const { Step } = Steps;
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([
    {
      key: Date.now(),
      items: [{ key: Date.now(), value: "", quantity: 1 }],
      selectedCategory: "",
    },
  ]);
  const [formData, setFormData] = useState({});

  const { cateringMenu, loading, error } = useMenu(); // Access cateringMenu from context

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
    form.setFieldsValue({ pickupDate: date });
  };

  const handleDropdownChange = (value) => {
    const date = moment(value, "MMMM D, YYYY").toDate();
    setSelectedDate(date);
    form.setFieldsValue({ pickupDate: date });
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const formattedPhoneNumber = formatPhoneNumber(value);
    form.setFieldsValue({ phoneNumber: formattedPhoneNumber });
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

  const next = async () => {
    try {
      await form.validateFields();
      const currentFormData = form.getFieldsValue();
      setFormData((prev) => ({
        ...prev,
        ...currentFormData,
      }));
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const finalFormData = {
      ...formData,
      ...form.getFieldsValue(),
    };

    const structuredCategories = categories.map((category) => ({
      category: category.selectedCategory,
      items: category.items.map((item) => ({
        name: item.value,
        quantity: item.quantity,
      })),
    }));

    const templateParams = {
      orderName: finalFormData.orderName,
      phoneNumber: finalFormData.phoneNumber,
      email: finalFormData.email,
      pickupDate: selectedDate
        ? moment(selectedDate).format("MMMM D, YYYY")
        : undefined,
      pickupTime: finalFormData.pickupTime,
      tempType: finalFormData.tempType,
      categories: structuredCategories.map((cat) => ({
        category: cat.category,
        items: cat.items
          .map((item) => `${item.name} (x${item.quantity})`)
          .join(", "),
      })),
      comments: finalFormData.comments,
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
          form.resetFields(); // Clear the form data
          setCurrentStep(0); // Send user back to step 1
          setSelectedDate(null); // Reset selected date
          setCategories([
            {
              key: Date.now(),
              items: [{ key: Date.now(), value: "", quantity: 1 }],
              selectedCategory: "",
            },
          ]); // Reset categories
          setFormData({}); // Clear form data in state
          navigate("/");
        },
        (err) => {
          alert("Failed to submit order.");
        }
      );
  };

  // Define renderSummary before it's used
  const CALIFORNIA_SALES_TAX = 0.0725; // 7.25% sales tax
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const renderSummary = () => {
    const calculateItemTotal = (price, quantity) => {
      return parseFloat(price) * quantity; // Convert price from string to number
    };
  
    const calculateTotalWithTax = (total) => {
      return total * (1 + CALIFORNIA_SALES_TAX);
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
                <h4 className="font-semibold">{capitalizeFirstLetter(category.selectedCategory)}</h4>
                <p>No items found for this category.</p>
              </div>
            );
          }
  
          return (
            <div key={index} className="mb-2">
              <h4 className="font-semibold">{capitalizeFirstLetter(category.selectedCategory)}</h4>
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
  
  
  
  

  const steps = [
    {
      title: "Basic",
      content: (
        <div className="w-full h-[90%] flex flex-col justify-center">
          <Form.Item
            name="orderName"
            label="Name"
            rules={[{ required: true, message: "Please enter an order name!" }]}
            className="mb-2"
          >
            <Input placeholder="Enter order name" className="w-full" />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Contact Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter a contact phone number!",
              },
              {
                pattern: /^\d{3}-\d{3}-\d{4}$/,
                message: "Please enter a valid phone number!",
              },
            ]}
            className="mb-2"
          >
            <Input
              placeholder="Enter contact phone number"
              type="tel"
              className="w-full"
              onChange={handlePhoneNumberChange} // Ensure the formatting is applied
            />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
            className="mb-2"
          >
            <Input placeholder="Enter your email" className="w-full" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Pickup",
      content: (
        <div className="w-full h-[90%] flex flex-col justify-center">
          <Form.Item
            name="pickupDate"
            label="Select Pickup Date"
            rules={[
              { required: true, message: "Please select a pickup date!" },
            ]}
            className="mb-2 w-full"
          >
            <div className="w-full flex gap-2">
              <Select
                placeholder="Select a date"
                onChange={handleDropdownChange}
                value={
                  selectedDate
                    ? moment(selectedDate).format("MMMM D, YYYY")
                    : undefined
                }
                className="w-full"
              >
                {getNext7Days().map((day, index) => (
                  <Option key={index} value={day.format("MMMM D, YYYY")}>
                    {day.format("MMMM D, YYYY")}
                  </Option>
                ))}
              </Select>
              <Button
                icon={<CalendarOutlined />}
                onClick={() => setShowCalendar(!showCalendar)}
              ></Button>
            </div>
          </Form.Item>
          {showCalendar && (
            <div className="mb-2 bg-orange-400 w-full p-2 max-w-lg">
              <div className="calendar-container">
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
            </div>
          )}
          <div className="flex gap-2">
            <Form.Item
              name="pickupTime"
              label="Select Pickup Time"
              rules={[
                { required: true, message: "Please select a pickup time!" },
              ]}
              className="mb-2 basis-1/2"
            >
              <Select placeholder="Select a pickup time" className="w-full">
                <Option value="10am">10am</Option>
                <Option value="11am">11am</Option>
                <Option value="2pm">2pm</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="tempType"
              label="Temp"
              rules={[{ required: true, message: "Please select ready type!" }]}
              className="mb-2 basis-1/2"
            >
              <Radio.Group className="w-full flex justify-center">
                <Radio value="Hot">Hot</Radio>
                <Radio value="Cold">Cold</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      title: "Menu",
      content: (
        <div className="w-full h-[90%] flex flex-col justify-center overflow-auto">
          {loading && <p>Loading menu...</p>}
          {error && <p>Error loading menu: {error}</p>}
          {!loading && cateringMenu && Object.keys(cateringMenu).length > 0 && categories.map((category, categoryIndex) => (
            <div key={category.key} className="mb-4 border p-4 rounded">
              <div className="flex justify-between items-center mb-2">
                <Form.Item
                  name={`category-${category.key}`}
                  label="Select Category"
                  rules={[
                    { required: true, message: "Please select a category!" },
                  ]}
                  className="mb-2 w-full"
                >
                  <Select
                    placeholder="Select a category"
                    className="w-full"
                    onChange={(value) =>
                      handleCategoryChange(category.key, value)
                    }
                    value={category.selectedCategory}
                  >
                    {Object.keys(cateringMenu).map((categoryName) => (
                      <Option key={categoryName} value={categoryName}>
                        {categoryName.charAt(0).toUpperCase() +
                          categoryName.slice(1)}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                {categories.length > 1 && (
                  <MinusCircleOutlined
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeCategory(category.key)}
                  />
                )}
              </div>
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
                      <Form.Item
                        name={`menuItem-${category.key}-${item.key}`}
                        label={`Select ${
                          category.selectedCategory.charAt(0).toUpperCase() +
                          category.selectedCategory.slice(1)
                        } ${itemIndex + 1}`}
                        rules={[
                          {
                            required: true,
                            message: `Please select a ${category.selectedCategory}!`,
                          },
                        ]}
                        className="mb-2 w-full"
                      >
                        <Select
                          placeholder={`Select a ${category.selectedCategory}`}
                          className="w-full"
                          value={item.value}
                          onChange={(value) =>
                            handleOrderItemChange(category.key, item.key, value)
                          }
                        >
                          {cateringMenu[
                            category.selectedCategory.toLowerCase()
                          ]?.map((menuItem) => (
                            <Option key={menuItem.name} value={menuItem.name}>
                              {menuItem.name}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item label="Amount" className="mb-2">
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              category.key,
                              item.key,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-20"
                        />
                      </Form.Item>

                      {category.items.length > 1 && (
                        <MinusCircleOutlined
                          className="text-red-500 cursor-pointer"
                          onClick={() =>
                            removeOrderItem(category.key, item.key)
                          }
                        />
                      )}
                    </motion.div>
                  ))}
              </AnimatePresence>
              <Form.Item className="mb-4">
                <Button
                  type="dashed"
                  className="bg-mYellow"
                  onClick={() => addOrderItem(category.key)}
                  icon={<PlusOutlined />}
                  disabled={!category.items[category.items.length - 1].value} // Disable if the last item is not selected
                >
                  Add Another{" "}
                  {category.selectedCategory.charAt(0).toUpperCase() +
                    category.selectedCategory.slice(1)}
                </Button>
              </Form.Item>
            </div>
          ))}
          <Button
            className="container bg-mGreen text-white"
            type="dashed"
            onClick={addCategory}
            icon={<PlusOutlined />}
          >
            Add Another Category
          </Button>
        </div>
      ),
    },
    {
      title: "Review",
      content: (
        <div className="w-full h-[90%] flex flex-col justify-center">
          {renderSummary()}
          <Form.Item
            name="comments"
            label="Additional Comments"
            className="mb-2 w-full flex flex-col"
          >
            <TextArea
              placeholder="Enter any additional details here"
              className="w-full"
              rows={4}
            />
          </Form.Item>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center bg-mYellow h-full w-full p-2">
      <div className="p-2 w-full bg-white shadow-md rounded-md">
        <motion.div
          className="w-full h-full container mx-auto  rounded flex flex-col items-center justify-between overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="w-full h-[10%] flex overflow-x-auto custom-steps-header">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center justify-center gap-2 step-item ${currentStep === index ? "active" : ""}`}
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

          <Form
            form={form}
            onFinish={handleSubmit}
            className="w-full h-[90%] flex flex-col items-center justify-between px-2"
          >
            {steps[currentStep].content}
            <div className="flex items-center justify-center gap-4 w-full h-[10%]">
              {currentStep > 0 && (
                <Button
                  type="default"
                  onClick={prev}
                  className="bg-red-500 text-white"
                >
                  Back
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  className=" bg-mGreen text-white font-bold"
                >
                  Submit
                </Button>
              )}

              {currentStep === 0 && (
                <Button
                  type="primary"
                  onClick={() => navigate("/")}
                  className=" bg-mRed text-white font-bold"
                >
                  Exit
                </Button>
              )}

              {currentStep < steps.length - 1 && (
                <Button
                  type="primary"
                  className="bg-mGreen font-bold"
                  onClick={next}
                >
                  Next
                </Button>
              )}
            </div>
          </Form>
        </motion.div>
      </div>
    </div>
  );
};

export default Preorder;
