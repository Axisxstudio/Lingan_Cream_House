import vanillaIcecream from "@/assets/menu/vanilla-icecream.jpg";
import chocolateIcecream from "@/assets/menu/chocolate-icecream.jpg";
import strawberryIcecream from "@/assets/menu/strawberry-icecream.jpg";
import mangoIcecream from "@/assets/menu/mango-icecream.jpg";
import rosePistachioIcecream from "@/assets/menu/rose-pistachio-icecream.jpg";
import butterscotchIcecream from "@/assets/menu/butterscotch-icecream.jpg";
import cookiesCreamIcecream from "@/assets/menu/cookies-cream-icecream.jpg";
import coconutIcecream from "@/assets/menu/coconut-icecream.jpg";
import coffeeIcecream from "@/assets/menu/coffee-icecream.jpg";
import mixedfruitIcecream from "@/assets/menu/mixedfruit-icecream.jpg";

import vanillaShake from "@/assets/menu/vanilla-shake.jpg";
import chocolateShake from "@/assets/menu/chocolate-shake.jpg";
import strawberryShake from "@/assets/menu/strawberry-shake.jpg";
import mangoShake from "@/assets/menu/mango-shake.jpg";
import oreoShake from "@/assets/menu/oreo-shake.jpg";
import bananaShake from "@/assets/menu/banana-shake.jpg";
import pineappleShake from "@/assets/menu/pineapple-shake.jpg";
import butterscotchShake from "@/assets/menu/butterscotch-shake.jpg";
import roseShake from "@/assets/menu/rose-shake.jpg";
import mixedberryShake from "@/assets/menu/mixedberry-shake.jpg";

import faloodaImg from "@/assets/menu/falooda.jpg";
import brownieSundaeImg from "@/assets/menu/brownie-sundae.jpg";
import mangoSundaeImg from "@/assets/menu/mango-sundae.jpg";
import bananaSplitImg from "@/assets/menu/banana-split.jpg";
import lavaCakeImg from "@/assets/menu/lava-cake.jpg";
import waffleImg from "@/assets/menu/waffle.jpg";
import fruitSaladImg from "@/assets/menu/fruit-salad.jpg";
import caramelPuddingImg from "@/assets/menu/caramel-pudding.jpg";
import tripleSundaeImg from "@/assets/menu/triple-sundae.jpg";
import roseFaloodaImg from "@/assets/menu/rose-falooda.jpg";

import limeSodaImg from "@/assets/menu/lime-soda.jpg";
import mangoJuiceImg from "@/assets/menu/mango-juice.jpg";
import watermelonJuiceImg from "@/assets/menu/watermelon-juice.jpg";
import orangeJuiceImg from "@/assets/menu/orange-juice.jpg";
import pineappleJuiceImg from "@/assets/menu/pineapple-juice.jpg";
import icedCoffeeImg from "@/assets/menu/iced-coffee.jpg";
import mojitoImg from "@/assets/menu/mojito.jpg";
import passionfruitJuiceImg from "@/assets/menu/passionfruit-juice.jpg";
import coconutWaterImg from "@/assets/menu/coconut-water.jpg";
import mixedfruitJuiceImg from "@/assets/menu/mixedfruit-juice.jpg";

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  items: MenuItem[];
}

export const menuCategories: MenuCategory[] = [
  {
    id: "ice-creams",
    label: "Ice Creams",
    items: [
      { name: "Vanilla Classic", description: "Rich and creamy Madagascar vanilla", price: "Rs. 250", image: vanillaIcecream },
      { name: "Chocolate Delight", description: "Deep Belgian chocolate indulgence", price: "Rs. 280", image: chocolateIcecream },
      { name: "Strawberry Dream", description: "Fresh strawberry with real fruit pieces", price: "Rs. 280", image: strawberryIcecream },
      { name: "Mango Paradise", description: "Tropical Sri Lankan mango flavour", price: "Rs. 300", image: mangoIcecream },
      { name: "Rose & Pistachio", description: "Fragrant rose with crunchy pistachios", price: "Rs. 350", image: rosePistachioIcecream },
      { name: "Butterscotch Crunch", description: "Caramel swirls with toffee bits", price: "Rs. 280", image: butterscotchIcecream },
      { name: "Cookies & Cream", description: "Vanilla with chocolate cookie chunks", price: "Rs. 300", image: cookiesCreamIcecream },
      { name: "Coconut Bliss", description: "Fresh coconut cream, tropical taste", price: "Rs. 270", image: coconutIcecream },
      { name: "Coffee Mocha", description: "Bold coffee with chocolate ripple", price: "Rs. 300", image: coffeeIcecream },
      { name: "Mixed Fruit", description: "A medley of seasonal tropical fruits", price: "Rs. 290", image: mixedfruitIcecream },
    ],
  },
  {
    id: "milkshakes",
    label: "Milkshakes",
    items: [
      { name: "Classic Vanilla Shake", description: "Thick and creamy vanilla milkshake", price: "Rs. 350", image: vanillaShake },
      { name: "Chocolate Thunder", description: "Double chocolate indulgence", price: "Rs. 380", image: chocolateShake },
      { name: "Strawberry Shake", description: "Fresh strawberry blended to perfection", price: "Rs. 380", image: strawberryShake },
      { name: "Mango Lassi Shake", description: "Tropical mango with a yoghurt twist", price: "Rs. 400", image: mangoShake },
      { name: "Oreo Shake", description: "Cookies blended into creamy goodness", price: "Rs. 400", image: oreoShake },
      { name: "Banana Caramel", description: "Ripe banana with caramel drizzle", price: "Rs. 380", image: bananaShake },
      { name: "Pineapple Cooler", description: "Refreshing pineapple milkshake", price: "Rs. 370", image: pineappleShake },
      { name: "Butterscotch Shake", description: "Rich butterscotch flavour shake", price: "Rs. 380", image: butterscotchShake },
      { name: "Rose Milkshake", description: "Fragrant rose syrup milkshake", price: "Rs. 350", image: roseShake },
      { name: "Mixed Berry Shake", description: "A blend of seasonal berries", price: "Rs. 420", image: mixedberryShake },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { name: "Heritage Falooda", description: "Classic layered falooda with ice cream", price: "Rs. 450", image: faloodaImg },
      { name: "Warm Brownie Sundae", description: "Chocolate brownie with vanilla ice cream", price: "Rs. 500", image: brownieSundaeImg },
      { name: "Mango Sundae", description: "Fresh mango with ice cream and sauce", price: "Rs. 480", image: mangoSundaeImg },
      { name: "Banana Split", description: "Classic banana split with three scoops", price: "Rs. 520", image: bananaSplitImg },
      { name: "Chocolate Lava Cake", description: "Warm cake with molten chocolate centre", price: "Rs. 480", image: lavaCakeImg },
      { name: "Ice Cream Waffle", description: "Crispy waffle with ice cream toppings", price: "Rs. 500", image: waffleImg },
      { name: "Fruit Salad Supreme", description: "Fresh fruits with ice cream and cream", price: "Rs. 420", image: fruitSaladImg },
      { name: "Caramel Pudding", description: "Silky smooth caramel custard pudding", price: "Rs. 350", image: caramelPuddingImg },
      { name: "Triple Sundae", description: "Three scoops with sauces and toppings", price: "Rs. 550", image: tripleSundaeImg },
      { name: "Rose Falooda Special", description: "Premium falooda with extra toppings", price: "Rs. 520", image: roseFaloodaImg },
    ],
  },
  {
    id: "fresh-drinks",
    label: "Fresh Drinks",
    items: [
      { name: "Fresh Lime Soda", description: "Refreshing lime with soda water", price: "Rs. 200", image: limeSodaImg },
      { name: "Mango Juice", description: "Freshly squeezed Sri Lankan mango", price: "Rs. 280", image: mangoJuiceImg },
      { name: "Watermelon Cooler", description: "Chilled watermelon juice with mint", price: "Rs. 250", image: watermelonJuiceImg },
      { name: "Orange Juice", description: "Freshly squeezed orange juice", price: "Rs. 280", image: orangeJuiceImg },
      { name: "Pineapple Juice", description: "Tropical pineapple freshly blended", price: "Rs. 260", image: pineappleJuiceImg },
      { name: "Iced Coffee", description: "Cold brew coffee with milk and ice", price: "Rs. 320", image: icedCoffeeImg },
      { name: "Virgin Mojito", description: "Mint, lime, and soda refresher", price: "Rs. 300", image: mojitoImg },
      { name: "Passion Fruit Juice", description: "Tangy passion fruit blended fresh", price: "Rs. 290", image: passionfruitJuiceImg },
      { name: "Coconut Water", description: "Fresh king coconut", price: "Rs. 180", image: coconutWaterImg },
      { name: "Mixed Fruit Juice", description: "Seasonal fruits blended together", price: "Rs. 300", image: mixedfruitJuiceImg },
    ],
  },
];
