'use client';

import { Box, Divider, Paper, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';

const tabs = [
  { value: 'preference', label: '속성' },
  { value: 'page', label: '페이지' },
  { value: 'event', label: '이벤트' },
  { value: 'material', label: '재료' },
  { value: 'deployment', label: '배포' },
];

export default function ControlMenu() {
  const [tab, setTab] = useState<'preference' | 'page' | 'event' | 'material' | 'deployment'>('preference');

  return (
    <Paper
      square
      elevation={15}
      sx={{ width: 400, height: '100%' }}
    >
      <Stack direction="column">
        <Box padding={2}>
          <Tabs
            value={tab}
            onChange={(_, v) => {
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
                    color: 'common.black',
                    fontWeight: 700,
                  },
                },
              },
            }}
          >
            {tabs.map(({ value, label }, i) => (
              <Tab
                key={i}
                value={value}
                label={label}
              />
            ))}
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
  );
}
