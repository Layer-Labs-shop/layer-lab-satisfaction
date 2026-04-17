import clicker from "@/assets/product-clicker.jpg";
import spinner from "@/assets/product-spinner.jpg";
import slider from "@/assets/product-slider.jpg";
import cube from "@/assets/product-cube.jpg";
import rings from "@/assets/product-rings.jpg";
import chain from "@/assets/product-chain.jpg";

export type ProductType = "clicker" | "spinner" | "slider" | "cube" | "rings" | "chain";
export type Material = "PLA+" | "PETG" | "Resin" | "Nylon";

export interface Product {
  id: string;
  slug: string;
  name: string;
  type: ProductType;
  price: number;
  image: string;
  description: string;
  materials: Material[];
  colors: { name: string; hex: string }[];
  satisfaction: {
    smoothness: number;
    sound: number;
    tactile: number;
  };
  badge?: string;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "obsidian-clicker",
    name: "Obsidian Clicker",
    type: "clicker",
    price: 24,
    image: clicker,
    description:
      "A precision-machined click mechanism with 0.1mm tolerance. Each press delivers a crisp, satisfying tactile snap engineered for endless fidgeting.",
    materials: ["PLA+", "PETG", "Nylon"],
    colors: [
      { name: "Void Black", hex: "#0a0a0f" },
      { name: "Neon Blue", hex: "#3b82f6" },
      { name: "Plasma Purple", hex: "#a855f7" },
    ],
    satisfaction: { smoothness: 9, sound: 10, tactile: 10 },
    badge: "Bestseller",
  },
  {
    id: "2",
    slug: "hex-spinner",
    name: "Hex Spinner Pro",
    type: "spinner",
    price: 32,
    image: spinner,
    description:
      "Hexagonal precision spinner with ceramic bearings. Spins for 4+ minutes on a single flick. Perfectly weighted for the smoothest experience.",
    materials: ["PLA+", "Nylon", "Resin"],
    colors: [
      { name: "Gunmetal", hex: "#2a2a35" },
      { name: "Plasma Purple", hex: "#a855f7" },
      { name: "Carbon", hex: "#0a0a0f" },
    ],
    satisfaction: { smoothness: 10, sound: 6, tactile: 8 },
    badge: "New",
  },
  {
    id: "3",
    slug: "glide-slider",
    name: "Glide Slider",
    type: "slider",
    price: 28,
    image: slider,
    description:
      "Three magnetically-dampened sliders that float on rails. The smoothest linear motion you'll ever feel from a 3D printed toy.",
    materials: ["PETG", "Nylon"],
    colors: [
      { name: "Void Black", hex: "#0a0a0f" },
      { name: "Neon Blue", hex: "#3b82f6" },
    ],
    satisfaction: { smoothness: 10, sound: 4, tactile: 9 },
  },
  {
    id: "4",
    slug: "polyhedron-cube",
    name: "Polyhedron Cube",
    type: "cube",
    price: 38,
    image: cube,
    description:
      "Six unique fidget surfaces in one geodesic shell. Click, switch, roll, and slide — every face is a different sensation.",
    materials: ["PLA+", "PETG"],
    colors: [
      { name: "Plasma Purple", hex: "#a855f7" },
      { name: "Void Black", hex: "#0a0a0f" },
    ],
    satisfaction: { smoothness: 8, sound: 9, tactile: 10 },
    badge: "Limited",
  },
  {
    id: "5",
    slug: "magnetic-rings",
    name: "Magnetic Rings",
    type: "rings",
    price: 22,
    image: rings,
    description:
      "Two interlocking rings with neodymium cores. Roll, snap, and orbit them between your fingers — endlessly hypnotic.",
    materials: ["PLA+", "Resin"],
    colors: [
      { name: "Void Black", hex: "#0a0a0f" },
      { name: "Neon Blue", hex: "#3b82f6" },
    ],
    satisfaction: { smoothness: 10, sound: 7, tactile: 9 },
  },
  {
    id: "6",
    slug: "linked-chain",
    name: "Articulated Chain",
    type: "chain",
    price: 19,
    image: chain,
    description:
      "Print-in-place articulated chain with zero post-assembly. Flows like liquid metal, weighted for the perfect drape.",
    materials: ["PLA+", "PETG", "Nylon"],
    colors: [
      { name: "Plasma Purple", hex: "#a855f7" },
      { name: "Void Black", hex: "#0a0a0f" },
    ],
    satisfaction: { smoothness: 9, sound: 8, tactile: 10 },
  },
];

export const productTypes: { value: ProductType; label: string }[] = [
  { value: "clicker", label: "Clickers" },
  { value: "spinner", label: "Spinners" },
  { value: "slider", label: "Sliders" },
  { value: "cube", label: "Cubes" },
  { value: "rings", label: "Rings" },
  { value: "chain", label: "Chains" },
];

export const allMaterials: Material[] = ["PLA+", "PETG", "Resin", "Nylon"];
