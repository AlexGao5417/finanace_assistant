import { useState, useMemo } from 'react';
import { 
  calculateVicLandTax, 
  calculateMortgagePayment, 
  calculateNetMonthlyIncome, 
  generateProjectionData,
  calculateVicStampDuty
} from '../utils/calculations';
import { DEFAULT_VALUES, LOAN_CONSTANTS } from '../constants';

/**
 * Custom hook for managing financial calculations and state
 * @returns {Object} Financial state and derived calculations
 */
export const useFinancialCalculations = () => {
  // State variables for all financial inputs
  const [propertyIncrease, setPropertyIncrease] = useState(DEFAULT_VALUES.PROPERTY_INCREASE);
  const [etfIncrease, setEtfIncrease] = useState(DEFAULT_VALUES.ETF_INCREASE);
  const [rentIncrease, setRentIncrease] = useState(DEFAULT_VALUES.RENT_INCREASE);
  const [interestRate, setInterestRate] = useState(DEFAULT_VALUES.INTEREST_RATE);
  const [housePrice, setHousePrice] = useState(DEFAULT_VALUES.HOUSE_PRICE);
  const [downPayment, setDownPayment] = useState(DEFAULT_VALUES.DOWN_PAYMENT);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [rentIncomeWeekly, setRentIncomeWeekly] = useState(DEFAULT_VALUES.RENT_INCOME_WEEKLY);
  const [maintenanceCost, setMaintenanceCost] = useState(DEFAULT_VALUES.MAINTENANCE_COST);
  const [insuranceCost, setInsuranceCost] = useState(DEFAULT_VALUES.INSURANCE_COST);


  // Memoize inputs object to prevent unnecessary re-renders
  const inputs = useMemo(() => ({
    propertyIncrease,
    etfIncrease,
    rentIncrease,
    interestRate,
    housePrice,
    downPayment,
    rentIncomeWeekly,
    maintenanceCost,
    insuranceCost,
    isFirstTimeBuyer
  }), [
    propertyIncrease,
    etfIncrease,
    rentIncrease,
    interestRate,
    housePrice,
    downPayment,
    rentIncomeWeekly,
    maintenanceCost,
    insuranceCost,
    isFirstTimeBuyer
  ]);

  // Memoize calculations to prevent expensive re-computation
  const calculations = useMemo(() => {
    // Calculate stamp duty
    const stampDuty = calculateVicStampDuty(housePrice, isFirstTimeBuyer);
    
    // Calculate initial ETF amount
    const initialEtfAmount = parseFloat(downPayment) + stampDuty;

    // Calculate mortgage payment
    const loanAmount = housePrice - downPayment;
    const monthlyMortgagePayment = calculateMortgagePayment(loanAmount, interestRate / 100);

    // Calculate land tax
    const landValue = housePrice * LOAN_CONSTANTS.LAND_VALUE_RATIO;
    const annualLandTax = calculateVicLandTax(landValue);

    // Calculate net monthly income
    const pureMonthlyIncome = calculateNetMonthlyIncome(
      rentIncomeWeekly,
      monthlyMortgagePayment,
      maintenanceCost,
      annualLandTax,
      insuranceCost
    );

    // Generate projection data
    const chartData = generateProjectionData(inputs);
    
    return {
      initialEtfAmount,
      monthlyMortgagePayment,
      annualLandTax,
      pureMonthlyIncome,
      stampDuty,
      chartData
    };
  }, [
    housePrice,
    downPayment,
    interestRate,
    rentIncomeWeekly,
    maintenanceCost,
    insuranceCost,
    isFirstTimeBuyer,
    inputs
  ]);
  

  // Memoize setters object to prevent unnecessary re-renders
  const setters = useMemo(() => ({
    setPropertyIncrease,
    setEtfIncrease,
    setRentIncrease,
    setInterestRate,
    setHousePrice,
    setDownPayment,
    setIsFirstTimeBuyer,
    setRentIncomeWeekly,
    setMaintenanceCost,
    setInsuranceCost
  }), []);

  return {
    inputs,
    setters,
    calculations
  };
};
