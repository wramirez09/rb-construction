import { Price } from "@/types/price";

export const pricingData: Price[] = [
  {
    id: "price_1NQk5TLtGdPVhGLecVfQ7mn0",
    unit_amount: 100 * 100,
    nickname: "Basic Maintenance Plan",
    offers: [
      "Initial consultation and project assessment",
      "Routine inspections (monthly)",
      "Minor repairs (up to 2 hours of labor)",
      "Priority scheduling for urgent requests",
      "Free updates",
      "10% discount on additional services",
    ],
  },
  {
    id: "price_1NQk55LtGdPVhGLefU8AHqHr",
    unit_amount: 200 * 100,
    nickname: "All-Inclusive Maintenance Plan",
    offers: [
      "All features of the Basic Maintenance Plan",
      "Extended repairs (up to 5 hours of labor)",
      "Seasonal maintenance checks (HVAC, plumbing, etc.)",
      "15% discount on additional services",
      "Annual property assessment report",
    ],
  },
  {
    id: "price_1NQk4eLtGdPVhGLeZsZDsCNz",
    unit_amount: "150/sq ft",
    nickname: "Custom Construction Plan",
    offers: [
      // "Initial consultation and project assessment",
      "Detailed project timeline and milestones",
      "High-quality materials and skilled labor",
      "Regular updates and communication throughout the build",
      "Post-construction support and warranty",
    ],
  },
];
