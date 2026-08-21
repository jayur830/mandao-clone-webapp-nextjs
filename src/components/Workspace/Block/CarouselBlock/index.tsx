'use client';

import { Cancel, ChevronLeft, ChevronRight, PanoramaOutlined } from '@mui/icons-material';
import { Box, Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { Data } from '@/types/block';

export interface CarouselBlockProps {
  dataIndex: number[];
  items?: Data[];
  setHovered(value: boolean): void;
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
}

export default function CarouselBlock({ dataIndex, items = [], setHovered: setParentHovered, onSelect, onDelete }: CarouselBlockProps) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const safeIndex = items.length > 0 ? currentIndex % items.length : 0;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  return (
    <Grid
      className="block carousel"
      position="relative"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight={250}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(dataIndex);
      }}
      onMouseEnter={() => {
        setParentHovered(false);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setParentHovered(true);
      }}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        backgroundColor: 'grey.100',
        ':hover': {
          backgroundColor: 'grey.200',
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
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      {items.length === 0 ? (
        <Box
          textAlign="center"
          padding={3}
        >
          <PanoramaOutlined
            fontSize="large"
            sx={{ color: 'grey.400' }}
          />
          <Typography
            variant="h6"
            fontWeight={600}
            color="grey.400"
          >
            캐러셀 아이템을 추가하세요.
          </Typography>
        </Box>
      ) : (
        <Box
          position="relative"
          width="100%"
          height={250}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {(() => {
            const slide = items[safeIndex];
            if (slide && slide.type === 'image' && slide.src) {
              return (
                <Image
                  src={slide.src}
                  alt={`slide-${safeIndex}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              );
            }
            return (
              <Typography
                variant="body1"
                color="text.secondary"
              >
                슬라이드 {safeIndex + 1} / {items.length}
              </Typography>
            );
          })()}

          {items.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  ':hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                  zIndex: 3,
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  ':hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
                  zIndex: 3,
                }}
              >
                <ChevronRight />
              </IconButton>
              <Box
                position="absolute"
                bottom={8}
                display="flex"
                gap={1}
                zIndex={3}
              >
                {items.map((_, i) => (
                  <Box
                    key={i}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIndex(i);
                    }}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: i === safeIndex ? 'primary.main' : 'grey.400',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      )}
      <IconButton
        className="delete-component-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(dataIndex);
        }}
        sx={{ zIndex: 4 }}
      >
        <Cancel />
      </IconButton>
    </Grid>
  );
}
