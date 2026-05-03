import mysteryBox from "@/assets/product-mystery-box.jpg";
import scrubDaddyHolder from "@/assets/product-scrub-daddy-holder.jpg";
import nameKeychain from "@/assets/product-name-keychain.jpg";
import canClip from "@/assets/product-can-clip.jpg";
import suspensionCover1 from "@/assets/product-suspension-cover-1.jpg";
import suspensionCover2 from "@/assets/product-suspension-cover-2.jpg";
import dihossauro1 from "@/assets/product-dihossauro-1.jpg";
import dihossauro2 from "@/assets/product-dihossauro-2.jpg";
import dihossauro3 from "@/assets/product-dihossauro-3.jpg";
import dihossauro4 from "@/assets/product-dihossauro-4.jpg";

export type Material = "PLA+" | "PETG";

export type ProductKind = "mystery" | "print";

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  size: string;
  kind: ProductKind;
  category?: "scooter";
  fidgetCount: number;
  freeFidgets: number;
  bonusChance: number;
  price: number;
  image: string;
  images?: string[];
  description: string;
  materials: Material[];
  colors?: ProductColor[];
  customizable?: boolean;
  satisfaction: {
    smoothness: number;
    sound: number;
    tactile: number;
  };
  badge?: string;
}

const standardColors: Record<string, ProductColor> = {
  blue: { name: "Blue", hex: "#2563eb" },
  red: { name: "Red", hex: "#dc2626" },
  black: { name: "Black", hex: "#111111" },
  pink: { name: "Pink", hex: "#ec4899" },
  purple: { name: "Purple", hex: "#7c3aed" },
  gray: { name: "Gray", hex: "#6b7280" },
  white: { name: "White", hex: "#f5f5f5" },
  green: { name: "Green", hex: "#16a34a" },
  darkGreen: { name: "Dark Green", hex: "#065f46" },
  darkRed: { name: "Dark Red", hex: "#7f1d1d" },
  gold: { name: "Gold", hex: "#d4af37" },
  brightRed: { name: "Bright Red", hex: "#ef4444" },
};

export const products: Product[] = [
  {
    id: "5",
    slug: "scrub-daddy-holder",
    name: "Scrub Daddy Holder",
    size: "Print",
    kind: "print",
    fidgetCount: 1,
    freeFidgets: 0,
    bonusChance: 0,
    price: 9.99,
    image: scrubDaddyHolder,
    description:
      "A cheeky 3D printed throne for your Scrub Daddy. Articulated legs, sturdy cradle and a hanging loop for drainage — keeps your sponge dry and your sink looking fun.",
    materials: ["PLA+", "PETG"],
    colors: [
      standardColors.blue,
      standardColors.red,
      standardColors.black,
      standardColors.pink,
      standardColors.purple,
      standardColors.gray,
      standardColors.white,
    ],
    satisfaction: { smoothness: 9, sound: 8, tactile: 9 },
    badge: "New",
  },
  {
    id: "7",
    slug: "scooter-can-clip",
    name: "500ml Can Clip for Scooters & Bikes",
    size: "Print",
    kind: "print",
    category: "scooter",
    fidgetCount: 1,
    freeFidgets: 0,
    bonusChance: 0,
    price: 6.99,
    image: canClip,
    description:
      "Keep your energy drink within arm's reach on every ride. A sturdy 3D-printed clip that mounts to scooter or bicycle frames and securely holds a standard 500ml can. Comes with double-sided tape and zip ties for extra security.",
    materials: ["PLA+", "PETG"],
    colors: [
      standardColors.black,
      standardColors.gray,
      standardColors.white,
      standardColors.blue,
      standardColors.red,
      standardColors.green,
    ],
    satisfaction: { smoothness: 9, sound: 7, tactile: 9 },
    badge: "New",
  },
  {
    id: "8",
    slug: "segway-g3-suspension-cover",
    name: "Blacked Out Suspension Cover for Segway G3",
    size: "Print",
    kind: "print",
    category: "scooter",
    fidgetCount: 1,
    freeFidgets: 0,
    bonusChance: 0,
    price: 5,
    image: suspensionCover1,
    images: [suspensionCover1, suspensionCover2],
    description:
      "Blacked out suspension cover for the Segway G3. Comes with double-sided tape and just clips right on — instantly cleans up the look of your rear suspension.",
    materials: ["PLA+", "PETG"],
    colors: [standardColors.black],
    satisfaction: { smoothness: 9, sound: 7, tactile: 9 },
    badge: "New",
  },
  {
    id: "9",
    slug: "dihossauro",
    name: "Dihosaur",
    size: "Print",
    kind: "print",
    fidgetCount: 1,
    freeFidgets: 0,
    bonusChance: 0,
    price: 10,
    image: dihossauro1,
    images: [dihossauro1, dihossauro2, dihossauro3, dihossauro4],
    description:
      "The cheekiest desk companion you'll ever own. A novelty 3D-printed dino with… personality. Detailed sculpt, sturdy stance and available in a wide range of colors.",
    materials: ["PLA+", "PETG"],
    colors: [
      standardColors.black,
      standardColors.red,
      standardColors.gray,
      standardColors.blue,
      standardColors.darkGreen,
      standardColors.green,
      standardColors.darkRed,
      standardColors.white,
      standardColors.gold,
      standardColors.pink,
      standardColors.purple,
      standardColors.brightRed,
    ],
    satisfaction: { smoothness: 8, sound: 6, tactile: 9 },
    badge: "New",
  },
  {
    id: "6",
    slug: "custom-name-keychain",
    name: "Customizable Name Keychain",
    size: "Print",
    kind: "print",
    fidgetCount: 1,
    freeFidgets: 0,
    bonusChance: 0,
    price: 6.99,
    image: nameKeychain,
    description:
      "A precision-printed keychain personalised with the name (or word) of your choice. Bold layered letters, sturdy keyring loop and a finish that survives daily pocket life.",
    materials: ["PLA+", "PETG"],
    colors: [
      standardColors.green,
      standardColors.blue,
      standardColors.red,
      standardColors.pink,
      standardColors.purple,
      standardColors.white,
      standardColors.gray,
    ],
    customizable: true,
    satisfaction: { smoothness: 9, sound: 7, tactile: 9 },
    badge: "Custom",
  },
  {
    id: "1",
    slug: "mystery-box-5",
    name: "Mystery Box — 5 Prints",
    size: "Starter",
    kind: "mystery",
    fidgetCount: 5,
    freeFidgets: 0,
    bonusChance: 5,
    price: 7.99,
    image: mysteryBox,
    description:
      "Dip your toes in. Five randomly selected precision prints — fidgets, desk pieces and surprise items hand-picked from our full collection. 5% chance of a rare fidget tucked inside.",
    materials: ["PLA+", "PETG"],
    satisfaction: { smoothness: 9, sound: 9, tactile: 9 },
  },
  {
    id: "2",
    slug: "mystery-box-10",
    name: "Mystery Box — 10 Prints",
    size: "Popular",
    kind: "mystery",
    fidgetCount: 10,
    freeFidgets: 0,
    bonusChance: 10,
    price: 14.99,
    image: mysteryBox,
    description:
      "Ten surprise prints, double the variety. 10% chance of a rare fidget. The sweet spot for collectors building out their desk.",
    materials: ["PLA+", "PETG"],
    satisfaction: { smoothness: 9, sound: 9, tactile: 10 },
    badge: "Bestseller",
  },
  {
    id: "3",
    slug: "mystery-box-15",
    name: "Mystery Box — 15 Prints",
    size: "Premium",
    kind: "mystery",
    fidgetCount: 15,
    freeFidgets: 1,
    bonusChance: 7,
    price: 21.99,
    image: mysteryBox,
    description:
      "Fifteen prints plus 1 guaranteed freebie on the house. 7% chance of an extra bonus print on top. Serious value for serious collectors.",
    materials: ["PLA+", "PETG"],
    satisfaction: { smoothness: 10, sound: 9, tactile: 10 },
    badge: "Best Value",
  },
  {
    id: "4",
    slug: "mystery-box-25",
    name: "Mystery Box — 25 Prints",
    size: "Mega",
    kind: "mystery",
    fidgetCount: 25,
    freeFidgets: 2,
    bonusChance: 10,
    price: 49.99,
    image: mysteryBox,
    description:
      "The ultimate haul: 25 hand-picked prints, 2 guaranteed freebies, and a 10% chance of an extra bonus print. Stock the whole office.",
    materials: ["PLA+", "PETG"],
    satisfaction: { smoothness: 10, sound: 10, tactile: 10 },
    badge: "Mega Drop",
  },
];

export const allMaterials: Material[] = ["PLA+", "PETG"];
