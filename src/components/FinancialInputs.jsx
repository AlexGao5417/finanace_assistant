import React, { useState, useEffect } from 'react';
import debounce from "lodash/debounce";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Slider,
  TextField,
  Grid,
  Divider,
  Chip,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  TrendingUp,
  ShowChart,
  Home,
  AccountBalance,
} from '@mui/icons-material';

/**
 * Component for financial input form with sliders and number inputs
 * @param {Object} inputs - Current input values
 * @param {Object} setters - Setter functions for inputs
 */
const FinancialInputs = ({ inputs, setters }) => {
  const {
    propertyIncrease,
    etfIncrease,
    rentIncrease,
    interestRate,
    housePrice,
    downPayment,
    isFirstTimeBuyer,
    rentIncomeWeekly,
    maintenanceCost,
    insuranceCost
  } = inputs;

  const {
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
  } = setters;

  const SliderInput = ({ label, value, onChange, min, max, step = 0.1, unit = '%', icon: Icon, color = 'primary' }) => {
    const [sliderValue, setSliderValue] = useState(value);
    useEffect(() => {
      setSliderValue(value);
    }, [value]);

    return (
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          {Icon && <Icon sx={{ mr: 1, color: `${color}.main` }} />}
          <Typography variant="body2" sx={{ fontWeight: 500, flex: 1 }}>
            {label}
          </Typography>
          <Chip
            label={`${sliderValue}${unit}`}
            color={color}
            size="small"
            variant="outlined"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        <Slider
          value={sliderValue}
          onChange={(_, newValue) => setSliderValue(newValue)}
          onChangeCommitted={() => onChange(sliderValue)}
          min={min}
          max={max}
          step={step}
          color={color}
          sx={{ mt: 1 }}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}${unit}`}
        />
      </Box>
    );
  }

  const NumberInput = ({ label, value, onChange, prefix = '$', icon: Icon, helperText }) => (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {Icon && <Icon sx={{ mr: 1, color: 'primary.main' }} />}
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
      </Box>
      <TextField
        fullWidth
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        InputProps={{
          startAdornment: prefix && (
            <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
              {prefix}
            </Typography>
          ),
        }}
        helperText={helperText}
        variant="outlined"
        size="medium"
      />
    </Box>
  );

  return (
    <Card elevation={3}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h2" component="h2" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
          <TrendingUp sx={{ mr: 1.5, color: 'primary.main' }} />
          Financial Parameters
        </Typography>

        {/* Growth Rates Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, color: 'text.secondary' }}>
            Annual Growth Rates
          </Typography>
          <SliderInput
            label="Property Value Increase"
            value={propertyIncrease}
            onChange={setPropertyIncrease}
            min={0.1}
            max={15}
            icon={Home}
            color="primary"
          />
          <SliderInput
            label="ETF Portfolio Return"
            value={etfIncrease}
            onChange={setEtfIncrease}
            min={0}
            max={15}
            icon={ShowChart}
            color="secondary"
          />
          <SliderInput
            label="Rental Income Increase"
            value={rentIncrease}
            onChange={setRentIncrease}
            min={0}
            max={10}
            step={0.1}
            icon={TrendingUp}
            color="success"
          />
          <SliderInput
            label="Mortgage Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={10}
            step={0.1}
            icon={AccountBalance}
            color="error"
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Property Details Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ mb: 2, color: 'text.secondary' }}>
            Property Investment
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumberInput
                label="Property Purchase Price"
                value={housePrice}
                onChange={setHousePrice}
                icon={Home}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                label="Down Payment"
                value={downPayment}
                onChange={setDownPayment}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
                  Buyer Status
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isFirstTimeBuyer}
                      onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="First Time Buyer"
                />
                <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
                  {isFirstTimeBuyer 
                    ? "Eligible for stamp duty concessions in Victoria" 
                    : "Standard stamp duty rates apply"
                  }
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Operating Costs Section */}
        <Box>
          <Typography variant="h3" sx={{ mb: 2, color: 'text.secondary' }}>
            Operating Costs
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <NumberInput
                label="Weekly Rental Income"
                value={rentIncomeWeekly}
                onChange={setRentIncomeWeekly}
                helperText="Expected weekly rental income"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                label="Annual Maintenance"
                value={maintenanceCost}
                onChange={setMaintenanceCost}
                helperText="Repairs, upkeep, etc."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <NumberInput
                label="Annual Insurance"
                value={insuranceCost}
                onChange={setInsuranceCost}
                helperText="Property insurance premium"
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FinancialInputs;
