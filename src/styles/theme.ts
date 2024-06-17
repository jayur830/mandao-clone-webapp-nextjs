import { createTheme } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';

export const palette = createPalette({});

export const theme = createTheme({
  palette,
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1F1F1FEE',
          fontSize: 16,
          padding: '6px 12px',
        },
      },
    },
  },
});
