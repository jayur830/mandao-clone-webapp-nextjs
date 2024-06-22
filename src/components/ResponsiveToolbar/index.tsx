'use client';

import { DesktopWindowsOutlined, SmartphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { IconButton, Paper } from '@mui/material';

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
  return (
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
      {list.map(({ value, icon: Icon }, i) => (
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
  );
}
