'use client';

import { DesktopWindowsOutlined, SmartphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { IconButton, Paper } from '@mui/material';

export interface ResponsiveToolbarProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  onChangeBreakpoint(value: 'desktop' | 'tablet' | 'mobile'): void;
}

export default function ResponsiveToolbar({ breakpoint, onChangeBreakpoint }: ResponsiveToolbarProps) {
  return (
    <Paper
      elevation={15}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: 99,
        paddingX: 2,
        paddingY: 1,
        '.MuiSvgIcon-root': {
          color: 'common.black',
        },
      }}
    >
      <IconButton
        sx={{ backgroundColor: breakpoint === 'desktop' ? '#1F1F1F' : 'transparent' }}
        onClick={() => {
          onChangeBreakpoint('desktop');
        }}
      >
        <DesktopWindowsOutlined
          sx={{
            '&.MuiSvgIcon-root': {
              color: breakpoint === 'desktop' ? 'common.white' : 'common.black',
            },
          }}
        />
      </IconButton>
      <IconButton
        sx={{ backgroundColor: breakpoint === 'tablet' ? '#1F1F1F' : 'transparent' }}
        onClick={() => {
          onChangeBreakpoint('tablet');
        }}
      >
        <TabletMacOutlined
          sx={{
            '&.MuiSvgIcon-root': {
              color: breakpoint === 'tablet' ? 'common.white' : 'common.black',
            },
          }}
        />
      </IconButton>
      <IconButton
        sx={{ backgroundColor: breakpoint === 'mobile' ? '#1F1F1F' : 'transparent' }}
        onClick={() => {
          onChangeBreakpoint('mobile');
        }}
      >
        <SmartphoneOutlined
          sx={{
            '&.MuiSvgIcon-root': {
              color: breakpoint === 'mobile' ? 'common.white' : 'common.black',
            },
          }}
        />
      </IconButton>
    </Paper>
  );
}
