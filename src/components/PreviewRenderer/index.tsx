'use client';

import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import TimerBlock from '@/components/Workspace/Block/TimerBlock';
import { Data } from '@/types/block';

function CarouselView({ items = [] }: { items?: Data[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const safeIndex = items.length > 0 ? currentIndex % items.length : 0;

  if (items.length === 0) return null;

  return (
    <Box
      position="relative"
      width="100%"
      height={320}
      overflow="hidden"
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
            bgcolor="grey.200"
          >
            <Typography variant="body1">슬라이드 {safeIndex + 1}</Typography>
          </Box>
        );
      })()}

      {items.length > 1 && (
        <>
          <IconButton
            onClick={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1))}
            sx={{
              position: 'absolute',
              left: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.7)',
              ':hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={() => setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0))}
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: 'rgba(255,255,255,0.7)',
              ':hover': { backgroundColor: 'rgba(255,255,255,0.9)' },
            }}
          >
            <ChevronRight />
          </IconButton>
          <Box
            position="absolute"
            bottom={12}
            left="50%"
            sx={{ transform: 'translateX(-50%)' }}
            display="flex"
            gap={1}
          >
            {items.map((_, i) => (
              <Box
                key={i}
                onClick={() => setCurrentIndex(i)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: i === safeIndex ? 'primary.main' : 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}

function RenderItem({ item }: { item: Data }) {
  switch (item.type) {
    case 'block': {
      const getAnimationSx = () => {
        switch (item.style?.animation) {
          case 'fadeIn':
            return {
              animation: 'fadeIn 0.8s ease-in-out',
              '@keyframes fadeIn': { from: { opacity: 0 }, to: { opacity: 1 } },
            };
          case 'slideUp':
            return {
              animation: 'slideUp 0.6s ease-out',
              '@keyframes slideUp': { from: { opacity: 0, transform: 'translateY(24px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
            };
          case 'bounce':
            return {
              animation: 'bounce 0.8s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
              '@keyframes bounce': {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-12px)' },
              },
            };
          default:
            return {};
        }
      };

      return (
        <Box
          display="flex"
          flexDirection={item.style?.flexDirection || 'column'}
          justifyContent={item.style?.justifyContent || 'center'}
          alignItems={item.style?.alignItems || 'center'}
          gap={item.style?.gap != null ? `${item.style.gap}px` : undefined}
          bgcolor={item.style?.backgroundColor || 'transparent'}
          borderRadius={item.style?.borderRadius != null ? `${item.style.borderRadius}px` : undefined}
          border={item.style?.borderWidth ? `${item.style.borderWidth}px solid ${item.style.borderColor || '#E0E0E0'}` : undefined}
          boxShadow={item.style?.boxShadow && item.style.boxShadow !== 'none' ? item.style.boxShadow : undefined}
          paddingTop={`${item.style?.paddingTop || 0}px`}
          paddingRight={`${item.style?.paddingRight || 0}px`}
          paddingBottom={`${item.style?.paddingBottom || 0}px`}
          paddingLeft={`${item.style?.paddingLeft || 0}px`}
          width="100%"
          sx={getAnimationSx()}
        >
          {item.children?.map((child, i) => (
            <RenderItem
              key={i}
              item={child}
            />
          ))}
        </Box>
      );
    }
    case 'image': {
      if (!item.src) return null;
      const handleImageClick = () => {
        if (!item.action || item.action.type === 'none') return;
        if (item.action.type === 'link' && item.action.url) {
          window.open(item.action.url, item.action.target || '_blank');
        } else if (item.action.type === 'alert' && item.action.alertMessage) {
          alert(item.action.alertMessage);
        }
      };

      return (
        <Box
          width={item.fullWidth ? '100%' : item.style?.width || 'auto'}
          display="flex"
          justifyContent="center"
          onClick={handleImageClick}
          sx={{ cursor: item.action && item.action.type !== 'none' ? 'pointer' : 'default' }}
        >
          <Image
            src={item.src}
            alt="promotion image"
            width={720}
            height={480}
            style={{ width: '100%', height: 'auto', ...item.style }}
          />
        </Box>
      );
    }
    case 'video':
      if (!item.src) return null;
      return (
        <Box
          width={item.fullWidth ? '100%' : 'auto'}
          display="flex"
          justifyContent="center"
        >
          <video
            src={item.src}
            controls
            style={{ width: '100%', height: 'auto', ...item.style }}
          />
        </Box>
      );
    case 'carousel':
      return <CarouselView items={item.items} />;
    case 'timer':
      return <TimerBlock data={item} />;
    case 'button': {
      const handleButtonClick = () => {
        if (!item.action || item.action.type === 'none') return;
        if (item.action.type === 'link' && item.action.url) {
          window.open(item.action.url, item.action.target || '_blank');
        } else if (item.action.type === 'alert' && item.action.alertMessage) {
          alert(item.action.alertMessage);
        }
      };

      return (
        <Button
          variant="contained"
          fullWidth={item.fullWidth}
          onClick={handleButtonClick}
          sx={{
            ...item.style,
            borderRadius: item.style?.borderRadius != null ? `${item.style.borderRadius}px` : 0,
          }}
        >
          {item.text}
        </Button>
      );
    }
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
          sx={{ textDecoration: item.style?.textDecoration }}
        >
          {item.value}
        </Typography>
      );
    default:
      return null;
  }
}

export default function PreviewRenderer({ data }: { data: Data[] }) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'full'>('mobile');

  return (
    <Box
      minHeight="100vh"
      bgcolor="#F4F4F4"
      paddingY={3}
    >
      <Stack
        direction="row"
        justifyContent="center"
        gap={2}
        marginBottom={2}
      >
        <Button
          variant={deviceMode === 'mobile' ? 'contained' : 'outlined'}
          onClick={() => setDeviceMode('mobile')}
          size="small"
        >
          모바일 뷰 (512px)
        </Button>
        <Button
          variant={deviceMode === 'full' ? 'contained' : 'outlined'}
          onClick={() => setDeviceMode('full')}
          size="small"
        >
          전체 너비 뷰
        </Button>
      </Stack>

      <Container
        maxWidth={false}
        sx={{
          maxWidth: deviceMode === 'mobile' ? 512 : 1200,
          padding: '0 !important',
          transition: 'max-width 0.3s ease',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            overflow: 'hidden',
            minHeight: '80vh',
            bgcolor: 'background.paper',
            borderRadius: deviceMode === 'mobile' ? 3 : 0,
          }}
        >
          {data.length === 0 ? (
            <Box
              padding={8}
              textAlign="center"
            >
              <Typography color="text.secondary">프로모션 콘텐츠가 비어 있습니다.</Typography>
            </Box>
          ) : (
            data.map((item, i) => (
              <RenderItem
                key={i}
                item={item}
              />
            ))
          )}
        </Paper>
      </Container>
    </Box>
  );
}
