import React from 'react';
import { LineChartPro } from '@mui/x-charts-pro/LineChartPro';
import { 
  Card,
  CardContent
} from '@mui/material';
import { formatCurrency } from '../utils/calculations';

/**
 * Component for displaying equity comparison chart using MUI X-Charts
 * @param {Array} chartData - Data for the chart
 */
const EquityChart = ({ 
  chartData, 
  zoomDomain, 
}) => {
  // Prepare data for MUI X-Charts
  const years = chartData.map(item => item.year);
  const houseValues = chartData.map(item => item.houseValue);
  const houseEquities = chartData.map(item => item.houseEquity);
  const etfEquities = chartData.map(item => item.etfEquity);

  const series = [
    {
      data: houseValues,
      label: 'House Value',
      color: '#FF9F40',
    },
    {
      data: houseEquities,
      label: 'House Equity',
      color: '#3B82F6',
    },
    {
      data: etfEquities,
      label: 'ETF Equity',
      color: '#22C55E',
    },
  ];

  return (
    <Card elevation={3}>
      <CardContent sx={{ p: 3 }}>
        <LineChartPro
          xAxis={[
            {
              data: years,
              label: 'Years',
              scaleType: 'point',
              zoom: true
            },
          ]}
          series={series}
          height={450}
          margin={{ left: 80, right: 50, top: 50, bottom: 80 }}
          grid={{ horizontal: true, vertical: true }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
              padding: 0,
            },
          }}
                     tooltip={{
             formatter: (params) => {
               if (!params) return '';
               
               const { value } = params;
               return `$${formatCurrency(value)}`;
             },
           }}
          yAxis={[
            {
              label: 'AUD',
              labelStyle: { textAnchor: 'middle' },
              tickFormatter: (value) => `$${(value / 1000).toLocaleString()}k`,
              zoom: true,
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};

export default EquityChart;
