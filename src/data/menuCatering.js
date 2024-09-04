const classicLasagna = 85;
const saladPrice = 35;
const ceasarSalad = 45;
const frescaSalad = 35;
const appetizerPrice = 70;
const pastaPrice = 60;
const dessertPrice = 45;

const cateringMenu = {
  salad: [
    { name: "Fresca", description: "Local, organic baby spring mix, cherry tomatoes, and red onions with our homemade balsamic vinaigrette.", price: saladPrice },
    { name: "Mediterraneo", description: "Grilled chicken breast, feta cheese Kalamata olives, fresh tomatoes, thin sliced red onions with a lightly roasted tomato vinaigrette.", price: saladPrice },
    { name: "Caprese", description: "Fresh imported mozzarella di bufala, sliced tomatoes and fresh basil over a delicate mix of greens tossed with our house balsamic vinaigrette.", price: saladPrice },
    { name: "Marcella's Caesar", description: "Hearts of Romaine topped with our classic Caesar dressing, sprinkled with house made croutons and shaved Parmigiano (Chicken upgrade also available).", price: saladPrice }
  ],

  appetizer: [
    { name: "Antipasto Platter", description: "An assortment of fine Italian meats, imported Italian cheeses, caprese salad, and a uniquely Italian mixture of olives and peppers.", price: appetizerPrice },
    { name: "Prosciutto and Melon", description: "Classic Italian combination of imported Prosciutto di Parma and fresh honeydew melon for a great Italian take on 'sweet and savory.'", price: appetizerPrice },
    { name: "Verdure alla Griglia", description: "An assortment of fresh seasonal vegetables grilled to perfection and seasoned with our house made balsamic vinaigrette.", price: appetizerPrice }
  ],

  lasagna: [
    { name: "Abruzzo", description: "Our house made spicy Italian sausage in a light, zesty tomato sauce.", price: classicLasagna },
    { name: "Bolognese", description: "Top Sirloin Angus beef in a savory red tomato sauce.", price: classicLasagna },
    { name: "Bianca", description: "White lasagna (no tomato) with caramelized onions and our house cured Pancetta.", price: classicLasagna },
    { name: "Sicilian Eggplant", description: "Fresh roasted eggplant with a combination of fresh herbs, garlic, and chili pepper with tomato.", price: classicLasagna },
    { name: "Butternut Squash", description: "Freshly roasted butternut squash in a mildly sweet and tangy tomato sauce.", price: classicLasagna },
    { name: "Wild Mushroom", description: "Crimini and portobello mushrooms with garlic and fresh herbs in a rich red wine and tomato sauce.", price: classicLasagna },
    { name: "Verdura", description: "Homemade 'nut free' pesto, roasted zucchini, and sundried tomatoes.", price: classicLasagna },
    { name: "Pepperonata", description: "A ragu of braised sweet bell peppers with yellow onions, garlic, white wine and fresh basil in a light tomato sauce.", price: classicLasagna },
    { name: "Artichoke", description: "Classic Roman flavor combo of marinated artichokes, garlic, green onions, and fresh mint.", price: classicLasagna },
    { name: "Black Italian Truffle", description: "A decadent combination of crimini mushrooms, garlic, white wine, cream, and imported Italian black truffle (no tomato).", price: classicLasagna }
  ],

  pasta: [
    { name: "Fettuccine con ragú", description: "Fresh pasta in a red wine, Angus beef and porcini tomato sauce topped with Parmigiano Reggiano.", price: pastaPrice },
    { name: "Spaghetti Carbonara", description: "Local champignon mushrooms, smoked pancetta and a touch of cream, with a fine grate of Parmigiano.", price: pastaPrice },
    { name: "Spaghetti Romana", description: "Calamata olives, Sicilian capers, fresh garlic, fresh parsley, and 'line-caught' albacore tuna.", price: pastaPrice },
    { name: "Spaghetti Adriatico", description: "Sautéed with local clams, artichoke hearts, cherry tomatoes, herbs and garlic in a white wine and EVOO sauce.", price: pastaPrice },
    { name: "Rigatoni con Pollo", description: "Fresh made rigatoni sautéed with slices of chicken breast in a light chardonnay sauce made with cremini mushrooms, red pepper, a touch of cream and Parmigiano Reggiano.", price: pastaPrice },
    { name: "Fusilli Primavera", description: "Fresh pasta spirals tossed with EVOO and local seasonal vegetables.", price: pastaPrice },
    { name: "Penne a la Siciliana", description: "A light sauté of eggplant, Kalamata olives, wild capers, cherry tomatoes and a dash of red pepper flakes.", price: pastaPrice },
    { name: "Penne al Salmone", description: "Fresh local salmon, lightly smoked with a touch of our house made tomato cream vodka sauce.", price: pastaPrice },
    { name: "Pasta 'Al Forno'", description: "Our version of the classic 'baked ziti,' your choice of fresh penne or rigatoni in a rich Bolognese sauce topped with Parmigiano and mozzarella, baked to perfection.", price: pastaPrice },
    { name: "Penne Puttanesca", description: "Fresh penne tossed with a spicy tomato sauce with garlic, Kalamata olives and Sicilian capers.", price: pastaPrice }
  ],

  dessert: [
    { name: "Italian Biscotti", description: "Hand dipped in chocolate and available in three flavors; almond, mocha walnut, and chocolate.", price: dessertPrice },
    { name: "Italian Cakes", description: "Sheet or round; Chocolate Cappuccino, Chocolate Profiterole. Tiramisu: sheet or round; Sweet cake dipped in coffee, layered with eggs sugar and mascarpone, topped with fine ground coffee.", price: dessertPrice },
    { name: "Petit Fours", description: "Napoleon, Chocolate, Vanilla and Coffee Éclair, Opera Square, Cream Puff.", price: dessertPrice },
    { name: "Classic Cookies", description: "Chocolate chip, Double Chocolate chip and walnut, Oatmeal and Golden raisin, Peanut butter, Apricot crisp with White Chocolate and Pistachio, Cherry crisp with White Chocolate chip.", price: dessertPrice }
  ],
};

export default cateringMenu;
