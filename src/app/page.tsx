'use client';

import { AppBar, Grid, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';

import ComponentMenu from '@/components/ComponentMenu';
import ControlMenu from '@/components/ControlMenu';
import ResponsiveToolbar from '@/components/ResponsiveToolbar';
import Workspace from '@/components/Workspace';

export default function Page() {
  const [breakpoint, setBreakpoint] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedComponent, setSelectedComponent] = useState<'block' | 'image' | 'video' | 'carousel' | 'button' | null | undefined>();

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#1F1F1F' }}
      >
        <Toolbar>
          <Grid
            container
            alignItems="flex-end"
          >
            <Typography fontSize={4}>300억</Typography>
            <Typography variant="h4">만다오</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Grid
        container
        height="calc(100% - 64px)"
        sx={{ backgroundColor: '#DDDDDD' }}
      >
        <ComponentMenu
          selectedMenu={selectedComponent}
          onChangeSelectedMenu={setSelectedComponent}
        />
        <Grid
          position="relative"
          container
          justifyContent="center"
          flex={1}
          height="100%"
          paddingX={3}
          paddingY={16}
          overflow="scroll"
          onClick={() => {
            setSelectedComponent(undefined);
          }}
        >
          <Grid
            position="fixed"
            top={90}
          >
            <ResponsiveToolbar
              breakpoint={breakpoint}
              onChangeBreakpoint={setBreakpoint}
            />
          </Grid>
          <Workspace
            breakpoint={breakpoint}
            selectedComponent={selectedComponent}
          />
        </Grid>
        <ControlMenu />
      </Grid>
    </>
  );
}
