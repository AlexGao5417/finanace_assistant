// Default values for financial inputs
export const DEFAULT_VALUES = {
  PROPERTY_INCREASE: 5,
  ETF_INCREASE: 8,
  RENT_INCREASE: 3,
  INTEREST_RATE: 6,
  HOUSE_PRICE: 800000,
  DOWN_PAYMENT: 160000,
  STAMP_DUTY: 44000,
  RENT_INCOME_WEEKLY: 500,
  MAINTENANCE_COST: 5000,
  INSURANCE_COST: 1500,
};

// Loan and calculation constants
export const LOAN_CONSTANTS = {
  LOAN_TERM_YEARS: 30,
  LAND_VALUE_RATIO: 0.8, // Land value as percentage of house price
  WEEKS_PER_MONTH: 4.33,
  WEEKS_PER_YEAR: 52,
  MONTHS_PER_YEAR: 12,
};

// Chart interaction constants
export const CHART_CONSTANTS = {
  ZOOM_IN_FACTOR: 0.75,
  ZOOM_OUT_FACTOR: 1.25,
  MIN_ZOOM_RANGE: 5,
};

// Victorian Land Tax brackets (2024 rates)
export const VIC_LAND_TAX_BRACKETS = [
  { threshold: 0, rate: 0, fixedAmount: 0 },
  { threshold: 50000, rate: 0, fixedAmount: 500 },
  { threshold: 100000, rate: 0, fixedAmount: 975 },
  { threshold: 300000, rate: 0.003, fixedAmount: 1350 },
  { threshold: 600000, rate: 0.006, fixedAmount: 2250 },
  { threshold: 1000000, rate: 0.009, fixedAmount: 4650 },
  { threshold: 1800000, rate: 0.0165, fixedAmount: 11850 },
  { threshold: 3000000, rate: 0.0265, fixedAmount: 31650 },
];
