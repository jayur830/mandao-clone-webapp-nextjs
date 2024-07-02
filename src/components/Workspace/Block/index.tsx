import { AddRounded } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';

import { Data } from '@/types/block';

import CarouselBlock from './CarouselBlock';
import ImageBlock from './ImageBlock';
import VideoBlock from './VideoBlock';

export interface BlockProps {
  onClick(dataIndex: number[]): void;
  onSelect(dataIndex: number[]): void;
  selectedComponent?: 'block' | 'image' | 'video' | 'carousel' | 'button' | null | undefined;
  dataIndex: number[];
  childrenItems: Data[];
  style?: Extract<Data, { type: 'block' }>['style'];
}

export default function Block({ onClick, onSelect, selectedComponent, dataIndex, childrenItems, style }: BlockProps) {
  console.log(selectedComponent);

  return (
    <Grid
      container
      direction={style?.flexDirection ?? 'column'}
      justifyContent={style?.justifyContent ?? 'center'}
      alignItems={style?.alignItems ?? 'center'}
      rowGap={(style?.flexDirection === 'column' || style?.flexDirection === 'column-reverse') && style?.gap != null ? `${style.gap}px` : 0}
      columnGap={(style?.flexDirection === 'row' || style?.flexDirection === 'row-reverse') && style?.gap != null ? `${style.gap}px` : 0}
      onClick={(e) => {
        e.stopPropagation();
        if (selectedComponent) {
          onClick(dataIndex);
        } else {
          onSelect(dataIndex);
        }
      }}
    >
      {childrenItems.map((item, i) => {
        switch (item.type) {
          case 'block':
            if (item.children && item.children.length > 0) {
              return (
                <Block
                  key={i}
                  onClick={onClick}
                  onSelect={onSelect}
                  selectedComponent={selectedComponent}
                  dataIndex={[...dataIndex, i]}
                  childrenItems={item.children}
                  style={item.style}
                />
              );
            }

            return (
              <Grid
                key={i}
                container
                direction={item.style?.flexDirection ?? 'column'}
                justifyContent={item.style?.justifyContent ?? 'center'}
                alignItems={item.style?.alignItems ?? 'center'}
                height={200}
                onClick={(e) => {
                  e.stopPropagation();
                  if (selectedComponent) {
                    onClick([...dataIndex, i]);
                  } else {
                    onSelect([...dataIndex, i]);
                  }
                }}
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={600}
                  color="grey.400"
                >
                  블록
                </Typography>
              </Grid>
            );
          case 'image': {
            const { type, ...props } = item;
            return (
              <ImageBlock
                key={i}
                dataIndex={[...dataIndex, i]}
                onSelect={onSelect}
                {...props}
              />
            );
          }
          case 'video': {
            const { type, ...props } = item;
            return (
              <VideoBlock
                key={i}
                dataIndex={[...dataIndex, i]}
                onSelect={onSelect}
                {...props}
              />
            );
          }
          case 'carousel':
            return (
              <CarouselBlock
                key={i}
                dataIndex={[...dataIndex, i]}
                onSelect={onSelect}
              />
            );
          case 'button':
            return (
              <Button
                key={i}
                variant="contained"
                fullWidth={item.fullWidth}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect([...dataIndex, i]);
                }}
                sx={{
                  ...item.style,
                  lineHeight: 'normal',
                  borderRadius: item.style?.borderRadius != null ? `${item.style.borderRadius}px` : 0,
                }}
              >
                {item.text}
              </Button>
            );
          default:
            return null;
        }
      })}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height={100}
        padding={2}
        sx={{
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          ':hover': {
            backgroundColor: 'grey.100',
          },
        }}
      >
        <AddRounded
          fontSize="large"
          color="disabled"
          sx={{ width: 40, height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
}
