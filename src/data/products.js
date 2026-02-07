import logo from '../assets/logo.png';

export const products = [
  // Toys
  {
    id: 1,
    name: "Rainbow Unicorn Plushie",
    category: "toys",
    price: 24.99,
    image: logo,
    description: "Soft and cuddly unicorn plushie perfect for bedtime",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Blue", value: "#B3D9FF", image: logo },
      { name: "Rainbow", value: "#FFB3D9", image: logo }
    ]
  },
  {
    id: 2,
    name: "Building Blocks Set",
    category: "toys",
    price: 19.99,
    image: logo,
    description: "Colorful building blocks for creative play",
    inStock: true,
    colors: [
      { name: "Rainbow", value: "#FFB3D9", image: logo },
      { name: "Pastel", value: "#E8D9F0", image: logo },
      { name: "Bright", value: "#A57FB4", image: logo }
    ]
  },
  {
    id: 3,
    name: "Teddy Bear",
    category: "toys",
    price: 15.99,
    image: logo,
    description: "Classic teddy bear - a perfect friend for any child",
    inStock: true,
    colors: [
      { name: "Brown", value: "#8B4513", image: logo },
      { name: "Beige", value: "#F5DEB3", image: logo },
      { name: "White", value: "#FFFFFF", image: logo },
      { name: "Pink", value: "#FFB3D9", image: logo }
    ]
  },
  {
    id: 4,
    name: "Magic Wand",
    category: "toys",
    price: 12.99,
    image: logo,
    description: "Sparkly magic wand for imaginative play",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Gold", value: "#FFD700", image: logo }
    ]
  },
  
  // Stationary
  {
    id: 5,
    name: "Cute Pencil Set",
    category: "stationary",
    price: 8.99,
    image: logo,
    description: "Colorful pencils with cute character toppers",
    inStock: true,
    colors: [
      { name: "Rainbow", value: "#FFB3D9", image: logo },
      { name: "Pastel", value: "#E8D9F0", image: logo },
      { name: "Bright", value: "#A57FB4", image: logo }
    ]
  },
  {
    id: 6,
    name: "Rainbow Notebook",
    category: "stationary",
    price: 6.99,
    image: logo,
    description: "Beautiful rainbow-themed notebook for writing and drawing",
    inStock: true,
    colors: [
      { name: "Rainbow", value: "#FFB3D9", image: logo },
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Blue", value: "#B3D9FF", image: logo }
    ]
  },
  {
    id: 7,
    name: "Sticker Pack",
    category: "stationary",
    price: 4.99,
    image: logo,
    description: "Assorted cute stickers for decorating",
    inStock: true,
    colors: [
      { name: "Mixed", value: "#FFB3D9", image: logo },
      { name: "Animals", value: "#D9B3FF", image: logo },
      { name: "Stars", value: "#B3D9FF", image: logo }
    ]
  },
  {
    id: 8,
    name: "Cute Eraser Set",
    category: "stationary",
    price: 5.99,
    image: logo,
    description: "Fun-shaped erasers in various cute designs",
    inStock: true,
    colors: [
      { name: "Pastel", value: "#E8D9F0", image: logo },
      { name: "Bright", value: "#A57FB4", image: logo },
      { name: "Rainbow", value: "#FFB3D9", image: logo }
    ]
  },
  {
    id: 9,
    name: "Glitter Pen Set",
    category: "stationary",
    price: 9.99,
    image: logo,
    description: "Sparkly glitter pens for colorful writing",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Gold", value: "#FFD700", image: logo }
    ]
  },
  
  // Accessories
  {
    id: 10,
    name: "Princess Tiara",
    category: "accessories",
    price: 14.99,
    image: logo,
    description: "Sparkly tiara for little princesses",
    inStock: true,
    colors: [
      { name: "Silver", value: "#C0C0C0", image: logo },
      { name: "Gold", value: "#FFD700", image: logo },
      { name: "Pink", value: "#FFB3D9", image: logo }
    ]
  },
  {
    id: 11,
    name: "Cute Hair Clips",
    category: "accessories",
    price: 7.99,
    image: logo,
    description: "Set of adorable hair clips with cute designs",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Rainbow", value: "#FFB3D9", image: logo }
    ]
  },
  {
    id: 12,
    name: "Rainbow Backpack",
    category: "accessories",
    price: 29.99,
    image: logo,
    description: "Colorful backpack perfect for school or adventures",
    inStock: true,
    colors: [
      { name: "Rainbow", value: "#FFB3D9", image: logo },
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Blue", value: "#B3D9FF", image: logo }
    ]
  },
  {
    id: 13,
    name: "Magic Bracelet Set",
    category: "accessories",
    price: 11.99,
    image: logo,
    description: "Sparkly bracelets that make any outfit magical",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Gold", value: "#FFD700", image: logo }
    ]
  },
  {
    id: 14,
    name: "Cute Water Bottle",
    category: "accessories",
    price: 12.99,
    image: logo,
    description: "Adorable water bottle with fun designs",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Blue", value: "#B3D9FF", image: logo }
    ]
  },
  
  // Return Gifts
  {
    id: 15,
    name: "Party Favor Bag",
    category: "return-gifts",
    price: 18.99,
    image: logo,
    description: "Complete party favor bag with goodies",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Rainbow", value: "#FFB3D9", image: logo }
    ]
  },
  {
    id: 16,
    name: "Mini Gift Set",
    category: "return-gifts",
    price: 16.99,
    image: logo,
    description: "Curated mini gift set perfect for party favors",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Mixed", value: "#E8D9F0", image: logo }
    ]
  },
  {
    id: 17,
    name: "Treat Box",
    category: "return-gifts",
    price: 13.99,
    image: logo,
    description: "Cute treat box with surprises inside",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Rainbow", value: "#FFB3D9", image: logo }
    ]
  },
  {
    id: 18,
    name: "Goodie Bag",
    category: "return-gifts",
    price: 15.99,
    image: logo,
    description: "Fun goodie bag filled with toys and treats",
    inStock: true,
    colors: [
      { name: "Pink", value: "#FFB3D9", image: logo },
      { name: "Purple", value: "#D9B3FF", image: logo },
      { name: "Rainbow", value: "#FFB3D9", image: logo }
    ]
  }
];

export const categories = [
  { id: "all", name: "All Products"},
  { id: "toys", name: "Toys" },
  { id: "stationary", name: "Stationary"},
  { id: "accessories", name: "Accessories"},
  { id: "return-gifts", name: "Return Gifts"}
];

