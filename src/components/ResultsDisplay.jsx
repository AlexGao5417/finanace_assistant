import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Avatar,
  Alert,
} from '@mui/material';
import {
  Home,
  TrendingUp,
  AccountBalance,
  Assessment,
  MonetizationOn,
  Info,
} from '@mui/icons-material';
import { formatCurrency } from '../utils/calculations';

/**
 * Component for displaying calculated financial results
 * @param {Object} inputs - Current input values
 * @param {Object} calculations - Calculated values
 */
const ResultsDisplay = ({ inputs, calculations }) => {
  const { housePrice, isFirstTimeBuyer } = inputs;
  const { 
    initialEtfAmount, 
    monthlyMortgagePayment, 
    annualLandTax, 
    pureMonthlyIncome,
    stampDuty
  } = calculations;

  const ResultCard = ({ icon: Icon, title, value, subtitle, color = 'primary', valueColor }) => (
    <Card 
      elevation={2} 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        }
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: `${color}.main`, 
              mr: 1.5, 
              width: 40, 
              height: 40 
            }}
          >
            <Icon />
          </Avatar>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 500, flex: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            fontWeight: 700,
            color: valueColor || 'text.primary',
            mb: 0.5
          }}
        >
          {value}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ mb: 3 }}>
      <Typography 
        variant="h2" 
        component="h2" 
        sx={{ 
          mb: 3, 
          display: 'flex', 
          alignItems: 'center' 
        }}
      >
        <Assessment sx={{ mr: 1.5, color: 'primary.main' }} />
        Financial Analysis
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ResultCard
            icon={Home}
            title="Property Value"
            value={`$${formatCurrency(parseFloat(housePrice))}`}
            subtitle="Current market price"
            color="primary"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ResultCard
            icon={TrendingUp}
            title="Initial ETF Investment"
            value={`$${formatCurrency(initialEtfAmount)}`}
            subtitle="Down payment + stamp duty"
            color="secondary"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ResultCard
            icon={AccountBalance}
            title="Monthly Mortgage"
            value={`$${formatCurrency(monthlyMortgagePayment, true)}`}
            subtitle="Principal + interest payment"
            color="warning"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ResultCard
            icon={MonetizationOn}
            title="Stamp Duty"
            value={`$${formatCurrency(stampDuty)}`}
            subtitle={isFirstTimeBuyer 
              ? stampDuty === 0 
                ? "No stamp duty (first home buyer concession)"
                : "Reduced stamp duty (partial concession)"
              : "Standard Victorian rates (2024)"
            }
            color={isFirstTimeBuyer ? "success" : "warning"}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <ResultCard
            icon={Assessment}
            title="Annual Land Tax"
            value={`$${formatCurrency(annualLandTax)}`}
            subtitle="Victorian land tax (2024 rates)"
            color="info"
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Alert 
          severity={pureMonthlyIncome >= 0 ? 'success' : 'error'} 
          icon={<MonetizationOn />}
          sx={{ 
            borderRadius: 2,
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
              width: '100%'
            }
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
                Net Monthly Cash Flow
              </Typography>
              <Typography variant="body2">
                {pureMonthlyIncome >= 0 ? 'Positive cash flow - property generates income' : 'Negative cash flow - property requires additional funding'}
              </Typography>
            </Box>
            <Chip
              label={`$${formatCurrency(pureMonthlyIncome)}`}
              color={pureMonthlyIncome >= 0 ? 'success' : 'error'}
              sx={{ 
                fontWeight: 700,
                fontSize: '1.1rem',
                height: 40,
                px: 2
              }}
            />
          </Box>
        </Alert>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Alert severity="info" icon={<Info />}>
          <Typography variant="body2">
            <strong>Note:</strong> Stamp duty and land tax are calculated using 2024 Victorian rates. 
            {isFirstTimeBuyer && (
              <>
                {' '}First home buyer concessions apply for properties up to $600,000 (full) and $750,000 (partial).
              </>
            )}
            {' '}Cash flow analysis includes rental income minus mortgage payments, maintenance, insurance, and land tax.
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default ResultsDisplay;
