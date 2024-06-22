'use client';

import { Box, Button, ButtonGroup, Divider, Grid, Paper, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { get } from 'lodash';
import { useState } from 'react';

import { Data } from '../Workspace';
import ImageControl from './ImageControl';

const tabs = [
  { value: 'attribute', label: '속성' },
  { value: 'page', label: '페이지' },
  { value: 'event', label: '이벤트' },
  { value: 'material', label: '재료' },
  { value: 'deployment', label: '배포' },
];

export interface ControlMenuProps {
  data: Data[];
  onChangeData(data: Data[]): void;
  selectedDataIndex?: number[] | null | undefined;
}

export default function ControlMenu({ data, onChangeData, selectedDataIndex }: ControlMenuProps) {
  // const [tab, setTab] = useState<'attribute' | 'page' | 'event' | 'material' | 'deployment'>('attribute');

  return (
    <Paper
      square
      elevation={15}
      sx={{ width: 400, height: '100%' }}
    >
      <Stack direction="column">
        {/* <Box padding={2}>
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
        <Divider /> */}
        {/* {focusedElement && (
          <>
            {JSON.stringify(focusedElement, null, 2)}
            <Box padding={2}></Box>
            <Divider />
            <Box padding={2}></Box>
            <Divider />
            <Box padding={2}></Box>
            <Divider />
            <Box padding={2}></Box>
          </>
        )} */}
        {selectedDataIndex && selectedDataIndex.length > 0 && get(data, selectedDataIndex).type === 'image' && (
          <ImageControl
            onChangeImage={(base64) => {
              function map(item: Data, i: number, current: number): Data {
                if (selectedDataIndex && i === selectedDataIndex[current] && item.type === 'block' && item.children) {
                  return {
                    ...item,
                    children: item.children.map((child, j) => map(child, j, current + 1)),
                  };
                }

                switch (item.type) {
                  case 'image':
                    return {
                      ...item,
                      src: base64,
                    };
                  default:
                    return item;
                }
              }

              onChangeData(data.map((item, i) => map(item, i, 0)));
            }}
          />
        )}
      </Stack>
    </Paper>
  );
}
