import { DesktopWindowsOutlined, SmartphoneOutlined, TabletMacOutlined } from '@mui/icons-material';
import { IconButton, Paper } from '@mui/material';

export default function ResponsiveToolbar() {
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
      <IconButton>
        <DesktopWindowsOutlined />
      </IconButton>
      <IconButton>
        <TabletMacOutlined />
      </IconButton>
      <IconButton>
        <SmartphoneOutlined />
      </IconButton>
    </Paper>
  );
}
