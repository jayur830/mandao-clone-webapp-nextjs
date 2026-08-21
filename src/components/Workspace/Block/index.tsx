'use client';

import { AddRounded, ArrowDownward, ArrowUpward, Cancel, DragIndicator } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { ColorService } from 'react-color-palette';

import { Data } from '@/types/block';

import CarouselBlock from './CarouselBlock';
import ImageBlock from './ImageBlock';
import VideoBlock from './VideoBlock';

export interface BlockProps {
  setHovered?(value: boolean): void;
  onClick(dataIndex: number[]): void;
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
  onReorder(parentDataIndex: number[], fromIndex: number, toIndex: number): void;
  selectedComponent?: 'block' | 'image' | 'video' | 'carousel' | 'button' | 'text' | null | undefined;
  dataIndex: number[];
  childrenItems: Data[];
  style?: Extract<Data, { type: 'block' }>['style'];
}

export default function Block({ setHovered: setParentHovered, onClick, onSelect, onDelete, onReorder, selectedComponent, dataIndex, childrenItems, style }: BlockProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);

  const hoveredBackgroundColor = useMemo(() => {
    if (style && style.backgroundColor) {
      const { r, g, b } = ColorService.hex2rgb(style.backgroundColor);
      return ColorService.rgb2hex({ r: Math.round(r * 0.8), g: Math.round(g * 0.8), b: Math.round(b * 0.8), a: 1 });
    }
    return 'transparent';
  }, [style]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.stopPropagation();
    setDraggedIndex(index);
    e.dataTransfer.setData('text/plain', String(index));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (dropTargetIndex !== index) {
      setDropTargetIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedIndex != null && draggedIndex !== targetIndex) {
      onReorder(dataIndex, draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  return (
    <Grid
      className="block"
      position="relative"
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
      onMouseEnter={() => {
        setParentHovered?.(false);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setParentHovered?.(true);
      }}
      sx={{
        transition: 'background-color 0.3s ease',
        cursor: 'pointer',
        width: '100%',
        ':hover': {
          backgroundColor: hoveredBackgroundColor,
          '.hovered': { display: 'block' },
        },
        '.item-wrapper': {
          position: 'relative',
          width: '100%',
          ':hover .item-action-bar': {
            opacity: 1,
          },
        },
        '.item-action-bar': {
          position: 'absolute',
          top: 4,
          right: 4,
          display: 'flex',
          gap: 0.5,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: 1,
          padding: '2px 4px',
          opacity: 0,
          transition: 'opacity 0.2s ease',
          zIndex: 10,
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
      <Grid
        position="absolute"
        top={0}
        left={0}
        border="3px solid #009FFF"
        width="100%"
        height="100%"
        sx={{
          transition: 'opacity 0.15s ease',
          opacity: +hovered,
          pointerEvents: 'none',
          zIndex: 5,
        }}
      />
      <IconButton
        className="delete-component-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(dataIndex);
        }}
      >
        <Cancel />
      </IconButton>

      {childrenItems.map((item, i) => {
        const isDragging = draggedIndex === i;
        const isDropTarget = dropTargetIndex === i;

        const renderItemContent = () => {
          switch (item.type) {
            case 'block':
              if (item.children && item.children.length > 0) {
                return (
                  <Block
                    key={i}
                    setHovered={setHovered}
                    onClick={onClick}
                    onSelect={onSelect}
                    onDelete={onDelete}
                    onReorder={onReorder}
                    selectedComponent={selectedComponent}
                    dataIndex={[...dataIndex, i]}
                    childrenItems={item.children}
                    style={item.style}
                  />
                );
              }

              return (
                <Grid
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
                      backgroundColor: 'rgba(0,0,0,0.05)',
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
              const { ...props } = item;
              return (
                <ImageBlock
                  dataIndex={[...dataIndex, i]}
                  setHovered={setHovered}
                  onSelect={onSelect}
                  onDelete={onDelete}
                  {...props}
                />
              );
            }
            case 'video': {
              const { ...props } = item;
              return (
                <VideoBlock
                  dataIndex={[...dataIndex, i]}
                  setHovered={setHovered}
                  onSelect={onSelect}
                  onDelete={onDelete}
                  {...props}
                />
              );
            }
            case 'carousel':
              return (
                <CarouselBlock
                  dataIndex={[...dataIndex, i]}
                  items={item.items}
                  setHovered={setHovered}
                  onSelect={onSelect}
                  onDelete={onDelete}
                />
              );
            case 'button':
              return (
                <Button
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
                  sx={{
                    textDecoration: item.style?.textDecoration,
                    cursor: 'pointer',
                    padding: 1,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect([...dataIndex, i]);
                  }}
                >
                  {item.value}
                </Typography>
              );
            default:
              return null;
          }
        };

        return (
          <Box
            key={i}
            className="item-wrapper"
            draggable
            onDragStart={(e) => handleDragStart(e, i)}
            onDragOver={(e) => handleDragOver(e, i)}
            onDrop={(e) => handleDrop(e, i)}
            onDragEnd={handleDragEnd}
            sx={{
              opacity: isDragging ? 0.4 : 1,
              outline: isDropTarget ? '2px dashed #009FFF' : 'none',
              transition: 'opacity 0.2s, outline 0.2s',
            }}
          >
            {/* 상단 순서 이동 및 드래그 조작 툴바 */}
            <Box className="item-action-bar">
              <IconButton
                size="small"
                sx={{ color: 'white', padding: 0.2 }}
                disabled={i === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  onReorder(dataIndex, i, i - 1);
                }}
              >
                <ArrowUpward fontSize="inherit" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white', padding: 0.2 }}
                disabled={i === childrenItems.length - 1}
                onClick={(e) => {
                  e.stopPropagation();
                  onReorder(dataIndex, i, i + 1);
                }}
              >
                <ArrowDownward fontSize="inherit" />
              </IconButton>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white', cursor: 'grab', paddingX: 0.2 }}>
                <DragIndicator fontSize="small" />
              </Box>
            </Box>

            {renderItemContent()}
          </Box>
        );
      })}

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        height={80}
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
          sx={{ width: 36, height: 'auto' }}
        />
      </Grid>
    </Grid>
  );
}
