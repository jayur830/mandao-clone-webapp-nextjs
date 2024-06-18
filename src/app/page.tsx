'use client';

import { AppBar, Grid, Toolbar } from '@mui/material';
import { useState } from 'react';

import ComponentMenu from '@/components/ComponentMenu';
import ControlMenu from '@/components/ControlMenu';
import ResponsiveToolbar from '@/components/ResponsiveToolbar';
import Workspace from '@/components/Workspace';

export default function Page() {
  const [breakpoint, setBreakpoint] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedComponent, setSelectedComponent] = useState<'block' | 'image' | 'video' | 'carousel' | 'button'>();

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
          onMouseDown={() => {
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
          <Workspace breakpoint={breakpoint} />
        </Grid>
        <ControlMenu />
      </Grid>
    </>
  );
}
