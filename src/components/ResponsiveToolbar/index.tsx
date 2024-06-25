'use client';

import { DesktopWindowsOutlined, SmartphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { IconButton, Paper, Theme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

const list = [
  {
    value: 'desktop',
    icon: DesktopWindowsOutlined,
  },
  {
    value: 'tablet',
    icon: TabletMacOutlined,
  },
  {
    value: 'mobile',
    icon: SmartphoneOutlined,
  },
];

export interface ResponsiveToolbarProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  onChangeBreakpoint(value: 'desktop' | 'tablet' | 'mobile'): void;
}

export default function ResponsiveToolbar({ breakpoint, onChangeBreakpoint }: ResponsiveToolbarProps) {
  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.between('md', 'lg'));
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (isTablet && breakpoint === 'desktop') {
      onChangeBreakpoint('tablet');
    } else if (isMobile && ['desktop', 'tablet'].includes(breakpoint)) {
      onChangeBreakpoint('mobile');
    }
  }, [onChangeBreakpoint, breakpoint, isMobile, isTablet]);

  return !isMobile ? (
    <Paper
      elevation={15}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        borderRadius: 99,
        padding: 2,
        paddingY: 1,
      }}
    >
      {list.slice(+isTablet).map(({ value, icon: Icon }, i) => (
        <IconButton
          key={i}
          sx={{
            backgroundColor: breakpoint === value ? '#1F1F1F' : 'transparent',
            ':hover': { backgroundColor: breakpoint === value ? '#1F1F1F' : 'rgba(0, 0, 0, 0.1)' },
          }}
          onClick={() => {
            onChangeBreakpoint(value as typeof breakpoint);
          }}
        >
          <Icon
            sx={{
              color: breakpoint === value ? 'common.white' : 'common.black',
            }}
          />
        </IconButton>
      ))}
    </Paper>
  ) : (
    <></>
  );
}
