import { LOAN_CONSTANTS } from '../constants';

/**
 * Calculate Victorian land tax based on land value
 * @param {number} landValue - The assessed land value
 * @returns {number} Annual land tax amount
 */
export const calculateVicLandTax = (landValue) => {
  if (landValue < 50000) return 0;
  if (landValue < 100000) return 500;
  if (landValue < 300000) return 975;
  if (landValue < 600000) return 1350 + (landValue - 300000) * 0.003;
  if (landValue < 1000000) return 2250 + (landValue - 600000) * 0.006;
  if (landValue < 1800000) return 4650 + (landValue - 1000000) * 0.009;
  if (landValue < 3000000) return 11850 + (landValue - 1800000) * 0.0165;
  return 31650 + (landValue - 3000000) * 0.0265;
};

/**
 * Calculate Victorian stamp duty based on property purchase price
 * @param {number} propertyPrice - Property purchase price
 * @param {boolean} isFirstTimeBuyer - Whether buyer is first time buyer
 * @returns {number} Stamp duty amount
 */
export const calculateVicStampDuty = (propertyPrice, isFirstTimeBuyer = false) => {
  if (propertyPrice <= 0) return 0;

  // First home buyer concessions (Victorian rates 2024)
  if (isFirstTimeBuyer) {
    if (propertyPrice <= 600000) {
      // Full concession - no stamp duty
      return 0;
    } else if (propertyPrice <= 750000) {
      // Partial concession - tapered rate
      const baseDuty = calculateStandardStampDuty(propertyPrice);
      const concession = baseDuty * (750000 - propertyPrice) / 150000;
      return Math.max(0, baseDuty - concession);
    }
  }

  return calculateStandardStampDuty(propertyPrice);
};

/**
 * Calculate standard Victorian stamp duty rates
 * @param {number} propertyPrice - Property purchase price
 * @returns {number} Standard stamp duty amount
 */
const calculateStandardStampDuty = (propertyPrice) => {
  let stampDuty = 0;

  // Victorian stamp duty rates (2024)
  if (propertyPrice <= 25000) {
    stampDuty = propertyPrice * 0.014;
  } else if (propertyPrice <= 130000) {
    stampDuty = 350 + (propertyPrice - 25000) * 0.024;
  } else if (propertyPrice <= 440000) {
    stampDuty = 2870 + (propertyPrice - 130000) * 0.06;
  } else if (propertyPrice <= 550000) {
    stampDuty = 21470 + (propertyPrice - 440000) * 0.06;
  } else if (propertyPrice <= 960000) {
    stampDuty = 28070 + (propertyPrice - 550000) * 0.06;
  } else {
    stampDuty = 52670 + (propertyPrice - 960000) * 0.055;
  }

  return Math.round(stampDuty);
};

/**
 * Calculate monthly mortgage payment using standard amortization formula
 * @param {number} loanAmount - Principal loan amount
 * @param {number} annualInterestRate - Annual interest rate as decimal (e.g., 0.06 for 6%)
 * @param {number} loanTermYears - Loan term in years
 * @returns {number} Monthly payment amount
 */
export const calculateMortgagePayment = (loanAmount, annualInterestRate, loanTermYears = LOAN_CONSTANTS.LOAN_TERM_YEARS) => {
  if (loanAmount <= 0) return 0;
  
  const loanTermMonths = loanTermYears * LOAN_CONSTANTS.MONTHS_PER_YEAR;
  const monthlyInterestRate = annualInterestRate / LOAN_CONSTANTS.MONTHS_PER_YEAR;
  
  if (monthlyInterestRate === 0) {
    return loanAmount / loanTermMonths;
  }
  
  return loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) / 
         (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1);
};

/**
 * Calculate net monthly income from rental property
 * @param {number} weeklyRent - Weekly rental income
 * @param {number} monthlyMortgage - Monthly mortgage payment
 * @param {number} annualMaintenance - Annual maintenance cost
 * @param {number} annualTax - Annual land tax
 * @param {number} annualInsurance - Annual insurance cost
 * @returns {number} Net monthly income (can be negative)
 */
export const calculateNetMonthlyIncome = (weeklyRent, monthlyMortgage, annualMaintenance, annualTax, annualInsurance) => {
  const monthlyRent = weeklyRent * LOAN_CONSTANTS.WEEKS_PER_MONTH;
  const monthlyExpenses = monthlyMortgage + 
                         (annualMaintenance / LOAN_CONSTANTS.MONTHS_PER_YEAR) + 
                         (annualTax / LOAN_CONSTANTS.MONTHS_PER_YEAR) + 
                         (annualInsurance / LOAN_CONSTANTS.MONTHS_PER_YEAR);
  
  return monthlyRent - monthlyExpenses;
};

/**
 * Generate yearly projection data for both house and ETF investments
 * @param {Object} inputs - All financial input parameters
 * @returns {Array} Array of yearly data points
 */
export const generateProjectionData = (inputs) => {
  const {
    housePrice,
    downPayment,
    rentIncomeWeekly,
    maintenanceCost,
    insuranceCost,
    propertyIncrease,
    etfIncrease,
    rentIncrease,
    interestRate,
    isFirstTimeBuyer = false
  } = inputs;

  // Convert percentages to decimals
  const propertyIncreaseRate = propertyIncrease / 100;
  const etfIncreaseRate = etfIncrease / 100;
  const rentIncreaseRate = rentIncrease / 100;
  const interestRateCalc = interestRate / 100;

  // Calculate stamp duty based on property price and buyer status
  const stampDuty = calculateVicStampDuty(housePrice, isFirstTimeBuyer);
  
  // Initial values
  const loanAmount = housePrice - downPayment;
  const initialEtf = parseFloat(downPayment) + stampDuty;
  const monthlyMortgagePayment = calculateMortgagePayment(loanAmount, interestRateCalc);
  const monthlyInterestRate = interestRateCalc / LOAN_CONSTANTS.MONTHS_PER_YEAR;

  // Initialize tracking variables
  let houseValue = parseFloat(housePrice);
  let loanBalance = parseFloat(loanAmount);
  let etfValue = parseFloat(initialEtf);
  let rentIncomeAnnual = parseFloat(rentIncomeWeekly) * LOAN_CONSTANTS.WEEKS_PER_YEAR;
  let yearlyData = [];

  for (let year = 0; year <= LOAN_CONSTANTS.LOAN_TERM_YEARS; year++) {
    // Update house value and loan balance for years > 0
    if (year > 0) {
      houseValue *= (1 + propertyIncreaseRate);
      
      // Process monthly mortgage payments
      for (let month = 0; month < LOAN_CONSTANTS.MONTHS_PER_YEAR; month++) {
        const interestPayment = loanBalance * monthlyInterestRate;
        const principalPayment = monthlyMortgagePayment - interestPayment;
        loanBalance -= principalPayment;
        if (loanBalance < 0) loanBalance = 0;
      }
    }

    // Calculate costs and ETF contribution
    const currentLandTax = calculateVicLandTax(houseValue * LOAN_CONSTANTS.LAND_VALUE_RATIO);
    const annualHouseCost = (monthlyMortgagePayment * LOAN_CONSTANTS.MONTHS_PER_YEAR) + 
                           parseFloat(maintenanceCost) + 
                           currentLandTax + 
                           parseFloat(insuranceCost);
    const annualContributionToEtf = annualHouseCost - rentIncomeAnnual;

    // Update ETF value and rent for years > 0
    if (year > 0) {
      etfValue = etfValue * (1 + etfIncreaseRate) + annualContributionToEtf;
      rentIncomeAnnual *= (1 + rentIncreaseRate);
    }

    yearlyData.push({
      year: year,
      houseValue: houseValue,
      houseEquity: Math.max(0, houseValue - loanBalance),
      etfEquity: etfValue,
      netAnnualCost: annualContributionToEtf
    });
  }

  return yearlyData;
};

/**
 * Format currency values for display
 * @param {number} value - Numeric value to format
 * @param {boolean} showCents - Whether to show cents
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, showCents = false) => {
  const options = {
    maximumFractionDigits: showCents ? 2 : 0
  };
  return value.toLocaleString(undefined, options);
};
