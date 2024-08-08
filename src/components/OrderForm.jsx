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
import cateringMenu from "../data/menuCatering";

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const OrderForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState([
    {
      key: Date.now(),
      items: [{ key: Date.now(), value: "", quantity: 1 }],
      selectedCategory: "",
    },
  ]);

  useEffect(() => {
    const calculateCutoffDate = () => {
      const today = new Date();
      let cutoffDate = new Date(today);
      let day = cutoffDate.getDay();

      // Adjust date to 48 working hours in advance, considering Sunday and Monday closures
      if (day === 0) {
        // Sunday
        cutoffDate.setDate(cutoffDate.getDate() + 4); // Move to Thursday
      } else if (day === 6) {
        // Saturday
        cutoffDate.setDate(cutoffDate.getDate() + 5); // Move to Thursday
      } else {
        // Weekdays
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
        // Skip Sunday and Monday
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

  const next = async () => {
    try {
      await form.validateFields();
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (values) => {
    const templateParams = {
      orderName: values.orderName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      pickupDate: moment(selectedDate).format("MMMM D, YYYY"),
      pickupTime: values.pickupTime,
      categories: categories.map((category) => ({
        category: category.selectedCategory,
        items: category.items
          .map((item) => `${item.value} (x${item.quantity})`)
          .join(", "),
      })),
      tempType: values.tempType,
      comments: values.comments,
    };

    emailjs
      .send(
        "service_marcellas",
        "template_mi55j1p",
        templateParams,
        "OXVmMrXHHOEpr832j"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
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
        },
        (err) => {
          console.log("FAILED...", err);
          alert("Failed to submit order.");
        }
      );
  };

  const renderSummary = () => (
    <div className="p-2 border rounded-lg bg-gray-50 w-full">
      <h3 className="text-lg font-bold mb-2">Order Summary</h3>
      {categories.map((category, index) => (
        <div key={index} className="mb-2">
          <h4 className="font-semibold">{category.selectedCategory}</h4>
          <ul>
            {category.items.map((item, idx) => (
              <li key={idx} className="ml-4 list-disc">
                {item.value} (x{item.quantity})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const steps = [
    {
      title: "Basic",
      content: (
        <div>
          <Form.Item
            name="orderName"
            label="Order Name"
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
              onChange={handlePhoneNumberChange}
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
        <div>
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
                    // Disable Sundays and Mondays
                    return day === 0 || day === 1;
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
        <div>
          {categories.map((category, categoryIndex) => (
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
                          ].map((menuItem) => (
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
          <Button type="dashed" onClick={addCategory} icon={<PlusOutlined />}>
            Add Another Category
          </Button>
        </div>
      ),
    },
    {
      title: "Review",
      content: (
        <div className="flex flex-col gap-2 items-center justify-center w-full">
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
          <Button
            type="primary"
            htmlType="submit"
            className=" bg-mGreen text-white"
          >
            Submit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex justify-center bg-mYellow h-full w-full">
      <div className="p-2">
        <motion.div
          className="w-full h-full max-w-lg bg-white p-2 shadow-md rounded flex flex-col items-center justify-between overflow-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full overflow-x-auto h-[25%]">
            <Steps
              current={currentStep}
              className="w-full px-4"
              direction="horizontal"
            >
              {steps.map((step, index) => (
                <Step key={index} title={step.title} />
              ))}
            </Steps>
          </div>

          <Form
            form={form}
            onFinish={handleSubmit}
            className="w-full h-[75%] flex flex-col items-center justify-start px-4"
          >
            {steps[currentStep].content}
            <div className="flex justify-center gap-4 mt-2 w-full">
              {currentStep > 0 && (
                <Button
                  type="default"
                  onClick={prev}
                  className="bg-red-500 text-white"
                >
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" className="bg-mGreen" onClick={next}>
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

export default OrderForm;
