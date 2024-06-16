'use client';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { PropsWithChildren } from 'react';

import { theme } from '@/styles/theme';

export default function MuiProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
