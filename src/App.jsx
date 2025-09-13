import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Typography, Grid, Box } from '@mui/material';
import { useFinancialCalculations } from './hooks/useFinancialCalculations';
import FinancialInputs from './components/FinancialInputs';
import ResultsDisplay from './components/ResultsDisplay';
import EquityChart from './components/EquityChart';
import { theme } from './theme';

// Main App component
export default function App() {
  // Use custom hooks for state management
  const { inputs, setters, calculations } = useFinancialCalculations();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: '100vh', 
        backgroundColor: 'background.default',
        py: { xs: 3, md: 5 }
      }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h1" 
              component="h1" 
              sx={{ 
                mb: 2,
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Investment Equity Calculator
            </Typography>
            <Typography 
              variant="h4" 
              color="text.secondary"
              sx={{ fontWeight: 400 }}
            >
              Compare your projected equity in a house versus an ETF portfolio over 30 years
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {/* Top Row: Financial Parameters and Analysis side by side */}
            <Grid item size={{xs: 12, lg: 5}}>
              <FinancialInputs inputs={inputs} setters={setters} />
            </Grid>
            
            <Grid item size={{xs: 12, lg: 5}}>
              <ResultsDisplay inputs={inputs} calculations={calculations} />
            </Grid>

            {/* Bottom Row: Chart spanning full width */}
            <Grid item xs={12} lg={12} size={12}>
              <EquityChart 
                chartData={calculations.chartData}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
