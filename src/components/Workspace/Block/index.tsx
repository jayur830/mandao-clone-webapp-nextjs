import { AddRounded } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { useMemo } from 'react';
import { ColorService } from 'react-color-palette';

import { Data } from '@/types/block';

import CarouselBlock from './CarouselBlock';
import ImageBlock from './ImageBlock';
import VideoBlock from './VideoBlock';

export interface BlockProps {
  onClick(dataIndex: number[]): void;
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
  selectedComponent?: 'block' | 'image' | 'video' | 'carousel' | 'button' | 'text' | null | undefined;
  dataIndex: number[];
  childrenItems: Data[];
  style?: Extract<Data, { type: 'block' }>['style'];
}

export default function Block({ onClick, onSelect, onDelete, selectedComponent, dataIndex, childrenItems, style }: BlockProps) {
  console.log(selectedComponent);

  const hoveredBackgroundColor = useMemo(() => {
    if (style && style.backgroundColor) {
      const { r, g, b } = ColorService.hex2rgb(style.backgroundColor);
      return ColorService.rgb2hex({ r: Math.round(r * 0.8), g: Math.round(g * 0.8), b: Math.round(b * 0.8), a: 1 });
    }

    return 'transparent';
  }, [style]);

  return (
    <Grid
      container
      direction={style?.flexDirection ?? 'column'}
      justifyContent={style?.justifyContent ?? 'center'}
      alignItems={style?.alignItems ?? 'center'}
      rowGap={(style?.flexDirection === 'column' || style?.flexDirection === 'column-reverse') && style?.gap != null ? `${style.gap}px` : 0}
      columnGap={(style?.flexDirection === 'row' || style?.flexDirection === 'row-reverse') && style?.gap != null ? `${style.gap}px` : 0}
      bgcolor={style?.backgroundColor || 'transparent'}
      paddingTop={`${style?.paddingTop || 0}px`}
      paddingRight={`${style?.paddingRight || 0}px`}
      paddingBottom={`${style?.paddingBottom || 0}px`}
      paddingLeft={`${style?.paddingLeft || 0}px`}
      onClick={(e) => {
        e.stopPropagation();
        if (selectedComponent) {
          onClick(dataIndex);
        } else {
          onSelect(dataIndex);
        }
      }}
      sx={{
        ':hover': {
          backgroundColor: hoveredBackgroundColor,
        },
        '.block': {
          position: 'relative',
          ':hover .delete-component-button': {
            opacity: 1,
          },
        },
        '.delete-component-button': {
          position: 'absolute',
          top: 0,
          right: 0,
          width: 40,
          height: 40,
          opacity: 0,
          transition: 'all 0.3s ease',
        },
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
                  onDelete={onDelete}
                  selectedComponent={selectedComponent}
                  dataIndex={[...dataIndex, i]}
                  childrenItems={item.children}
                  style={item.style}
                />
              );
            }

            const { r, g, b, a } = ColorService.hex2rgb(item.style?.backgroundColor || '#FFFFFF');
            console.log('rgb:', r, g, b);
            const innerHoveredBackgroundColor = ColorService.rgb2hex({ r: Math.round(r * 0.7), g: Math.round(g * 0.7), b: Math.round(b * 0.7), a });
            console.log('innerHoveredBackgroundColor:', innerHoveredBackgroundColor);

            return (
              <Grid
                key={i}
                container
                direction={item.style?.flexDirection ?? 'column'}
                justifyContent={item.style?.justifyContent ?? 'center'}
                alignItems={item.style?.alignItems ?? 'center'}
                bgcolor={item.style?.backgroundColor || 'transparent'}
                paddingTop={`${item.style?.paddingTop || 0}px`}
                paddingRight={`${item.style?.paddingRight || 0}px`}
                paddingBottom={`${item.style?.paddingBottom || 0}px`}
                paddingLeft={`${item.style?.paddingLeft || 0}px`}
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
                    backgroundColor: innerHoveredBackgroundColor,
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
                onDelete={onDelete}
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
                onDelete={onDelete}
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
                onDelete={onDelete}
              />
            );
          case 'button':
            return (
              <Button
                key={i}
                className="block button"
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
          case 'text':
            return (
              <Typography
                fontSize={item.style?.fontSize || 16}
                fontWeight={item.style?.fontWeight || 400}
                fontStyle={item.style?.fontStyle}
                textAlign={item.style?.textAlign}
                lineHeight={item.style?.lineHeight}
                whiteSpace={item.style?.whiteSpace}
                color={item.style?.color}
              >
                {item.value}
              </Typography>
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
            backgroundColor: hoveredBackgroundColor,
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
