'use client';

import { Button, Grid, Paper, Stack } from '@mui/material';
import { get } from 'lodash';
import Link from 'next/link';

import { Data } from '@/types/block';

import BlockControl from './BlockControl';
import ButtonControl from './ButtonControl';
import ImageControl from './ImageControl';
import VideoControl from './VideoControl';

// const tabs = [
//   { value: 'attribute', label: '속성' },
//   { value: 'page', label: '페이지' },
//   { value: 'event', label: '이벤트' },
//   { value: 'material', label: '재료' },
//   { value: 'deployment', label: '배포' },
// ];

export interface ControlMenuProps {
  data: Data[];
  onChangeData(data: Data[]): void;
  selectedDataIndex?: number[] | null | undefined;
}

export default function ControlMenu({ data, onChangeData, selectedDataIndex }: ControlMenuProps) {
  // const [tab, setTab] = useState<'attribute' | 'page' | 'event' | 'material' | 'deployment'>('attribute');

  const namePath = (selectedDataIndex || []).map((index, i) => (i === 0 ? index : ['children', index])).flat();
  console.log('namePath:', namePath);

  return (
    <Paper
      square
      elevation={15}
      sx={{
        position: 'relative',
        width: 400,
        height: '100%',
      }}
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
        {namePath.length > 0 && get(data, namePath).type === 'block' && (
          <BlockControl
            data={get(data, namePath)}
            onChangeData={(changedData) => {
              function map(item: Data, i: number, current: number = 0): Data {
                if (!selectedDataIndex || (selectedDataIndex && i === selectedDataIndex[current])) {
                  if (item.type === 'block' && item.children && item.children.length > 0) {
                    return {
                      ...item,
                      ...(current === (selectedDataIndex || []).length - 1 ? changedData : {}),
                      children: item.children.map((child, j) => map(child, j, current + 1)),
                    };
                  }

                  switch (item.type) {
                    case 'block':
                      return { ...item, ...changedData };
                    default:
                      return item;
                  }
                }

                console.log('changed data:', changedData, selectedDataIndex, i, current);

                return item;
              }

              console.log(
                'dispatched data:',
                data.map((item, i) => map(item, i)),
              );

              onChangeData(data.map((item, i) => map(item, i)));
            }}
          />
        )}
        {namePath.length > 0 && get(data, namePath).type === 'image' && (
          <ImageControl
            data={get(data, namePath)}
            onChangeData={(changedData) => {
              function map(item: Data, i: number, current: number = 0): Data {
                if (selectedDataIndex && i === selectedDataIndex[current]) {
                  if (item.type === 'block' && item.children) {
                    return {
                      ...item,
                      children: item.children.map((child, j) => map(child, j, current + 1)),
                    };
                  }

                  switch (item.type) {
                    case 'image':
                      return {
                        ...item,
                        ...changedData,
                      };
                    default:
                      return item;
                  }
                }

                return item;
              }

              onChangeData(data.map((item, i) => map(item, i)));
            }}
          />
        )}
        {namePath.length > 0 && get(data, namePath).type === 'video' && (
          <VideoControl
            data={get(data, namePath)}
            onChangeData={(changedData) => {
              function map(item: Data, i: number, current: number = 0): Data {
                if (selectedDataIndex && i === selectedDataIndex[current]) {
                  if (item.type === 'block' && item.children) {
                    return {
                      ...item,
                      children: item.children.map((child, j) => map(child, j, current + 1)),
                    };
                  }

                  switch (item.type) {
                    case 'video':
                      return {
                        ...item,
                        ...changedData,
                      };
                    default:
                      return item;
                  }
                }

                return item;
              }

              onChangeData(data.map((item, i) => map(item, i)));
            }}
          />
        )}
        {namePath.length > 0 && get(data, namePath).type === 'button' && (
          <ButtonControl
            data={get(data, namePath)}
            onChangeData={(changedData) => {
              function map(item: Data, i: number, current: number = 0): Data {
                if (selectedDataIndex && i === selectedDataIndex[current]) {
                  if (item.type === 'block' && item.children) {
                    return {
                      ...item,
                      children: item.children.map((child, j) => map(child, j, current + 1)),
                    };
                  }

                  switch (item.type) {
                    case 'button':
                      return {
                        ...item,
                        ...changedData,
                      };
                    default:
                      return item;
                  }
                }

                return item;
              }

              onChangeData(data.map((item, i) => map(item, i)));
            }}
          />
        )}
      </Stack>
      <Grid
        position="absolute"
        bottom={0}
        container
        gap={2}
        padding={2}
      >
        <Button
          variant="contained"
          size="large"
          sx={{
            flex: 1,
            fontSize: 16,
            fontWeight: 700,
            height: 52,
          }}
        >
          배포하기
        </Button>
        <Button
          LinkComponent={Link}
          href={`/preview/${Buffer.from(JSON.stringify(data), 'utf8').toString('base64')}`}
          target="_blank"
          variant="outlined"
          size="large"
          sx={{
            flex: 1,
            fontSize: 16,
            fontWeight: 700,
            height: 52,
          }}
        >
          미리보기
        </Button>
      </Grid>
    </Paper>
  );
}
