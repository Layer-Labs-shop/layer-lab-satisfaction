import mysteryBox from "@/assets/product-mystery-box.jpg";

export type Material = "PLA+" | "PETG";

export interface Product {
  id: string;
  slug: string;
  name: string;
  size: string;
  fidgetCount: number;
  freeFidgets: number;
  bonusChance: number;
  price: number;
  image: string;
  description: string;
  materials: Material[];
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
    slug: "mystery-box-5",
    name: "Mystery Box — 5 Fidgets",
    size: "Starter",
    fidgetCount: 5,
    freeFidgets: 0,
    bonusChance: 1,
    price: 7.99,
    image: mysteryBox,
    description:
      "Dip your toes in. Five randomly selected precision-printed fidgets, hand-picked from our full collection. 1% chance of an extra free fidget tucked inside.",
    materials: ["PLA+", "PETG"],
    satisfaction: { smoothness: 9, sound: 9, tactile: 9 },
  },
  {
    id: "2",
    slug: "mystery-box-10",
    name: "Mystery Box — 10 Fidgets",
    size: "Popular",
    fidgetCount: 10,
    freeFidgets: 0,
    bonusChance: 4,
    price: 14.99,
    image: mysteryBox,
    description:
      "Ten surprise fidgets, double the variety. 4% chance of an extra free fidget bonus. The sweet spot for collectors building out their desk.",
    materials: ["PLA+", "PETG"],
    satisfaction: { smoothness: 9, sound: 9, tactile: 10 },
    badge: "Bestseller",
  },
  {
    id: "3",
    slug: "mystery-box-15",
    name: "Mystery Box — 15 Fidgets",
    size: "Premium",
    fidgetCount: 15,
    freeFidgets: 1,
    bonusChance: 7,
    price: 21.99,
    image: mysteryBox,
    description:
      "Fifteen fidgets plus 1 guaranteed free fidget on the house. 7% chance of an extra free fidget on top. Serious value for serious fidgeters.",
    materials: ["PLA+", "PETG"],
    satisfaction: { smoothness: 10, sound: 9, tactile: 10 },
    badge: "Best Value",
  },
  {
    id: "4",
    slug: "mystery-box-25",
    name: "Mystery Box — 25 Fidgets",
    size: "Mega",
    fidgetCount: 25,
    freeFidgets: 2,
    bonusChance: 10,
    price: 49.99,
    image: mysteryBox,
    description:
      "The ultimate haul: 25 hand-picked fidgets, 2 guaranteed free fidgets, and a 10% chance of an extra bonus fidget. Stock the whole office.",
    materials: ["PLA+", "PETG"],
    satisfaction: { smoothness: 10, sound: 10, tactile: 10 },
    badge: "Mega Drop",
  },
];

export const allMaterials: Material[] = ["PLA+", "PETG"];
