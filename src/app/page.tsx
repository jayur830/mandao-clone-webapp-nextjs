'use client';

import { AppBar, Box, Divider, Drawer, Grid, Paper, Stack, Tab, Tabs, Toolbar } from '@mui/material';
import { useRef, useState } from 'react';

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState(0);

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
        <Grid flex={1}>a</Grid>
        <Paper
          square
          elevation={15}
          sx={{ width: 400, height: '100%' }}
        >
          <Stack direction="column">
            <Box padding={2}>
              <Tabs
                value={tab}
                onChange={(e, v) => {
                  console.log(v);
                  setTab(v);
                }}
                TabIndicatorProps={{
                  sx: {
                    backgroundColor: 'transparent',
                    height: '100%',
                    border: '1px solid #AAAAAA',
                    borderRadius: 2,
                  },
                }}
                sx={{
                  width: '100%',
                  height: 36,
                  minHeight: 0,
                  '.MuiTabs-flexContainer': {
                    height: '100%',
                    '.MuiTab-root': {
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: 0,
                      minHeight: 'inherit',
                      padding: 0,
                      '&.Mui-selected': {
                        color: '#000000',
                        fontWeight: 700,
                      },
                    },
                  },
                }}
              >
                <Tab
                  value={0}
                  label="속성"
                />
                <Tab
                  value={1}
                  label="페이지"
                />
                <Tab
                  value={2}
                  label="이벤트"
                />
                <Tab
                  value={3}
                  label="재료"
                />
                <Tab
                  value={4}
                  label="배포"
                />
              </Tabs>
            </Box>
            <Divider />
            <Box padding={2}></Box>
            <Divider />
            <Box padding={2}></Box>
            <Divider />
            <Box padding={2}></Box>
            <Divider />
            <Box padding={2}></Box>
          </Stack>
        </Paper>
      </Grid>
    </>
  );
}
