import { AppBar, Grid, Toolbar } from '@mui/material';

import ComponentMenu from '@/components/ComponentMenu';
import ControlMenu from '@/components/ControlMenu';
import ResponsiveToolbar from '@/components/ResponsiveToolbar';

export default function Page() {
  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#1F1F1F' }}
      >
        <Toolbar></Toolbar>
      </AppBar>
      <Grid
        container
        height="calc(100% - 64px)"
        sx={{ backgroundColor: '#DDDDDD' }}
      >
        <ComponentMenu />
        <Grid
          position="relative"
          container
          justifyContent="center"
          flex={1}
        >
          <Grid
            position="absolute"
            top={30}
          >
            <ResponsiveToolbar />
          </Grid>
        </Grid>
        <ControlMenu />
      </Grid>
    </>
  );
}
