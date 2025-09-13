import React from 'react';
import { Box, Card, CardContent } from '@mui/material';
import ResultsDisplay from './ResultsDisplay';
import EquityChart from './EquityChart';

/**
 * Component that combines results display and chart
 * @param {Object} inputs - Current input values
 * @param {Object} calculations - Calculated values
 * @param {Object} chartInteractions - Chart interaction handlers and state
 */
const ResultsAndChart = ({ inputs, calculations, chartInteractions }) => {
  const {
    zoomDomain,
    handleZoom,
    handleReset
  } = chartInteractions;

  const { chartData } = calculations;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <ResultsDisplay inputs={inputs} calculations={calculations} />
      
      <Card elevation={3}>
        <CardContent sx={{ p: 3 }}>
          <EquityChart 
            chartData={chartData}
            zoomDomain={zoomDomain}
            onZoomIn={() => handleZoom('in')}
            onZoomOut={() => handleZoom('out')}
            onReset={handleReset}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResultsAndChart;
