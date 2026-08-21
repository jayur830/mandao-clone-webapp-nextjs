'use client';

import { AccountTreeOutlined, DesktopWindowsOutlined, SmartphoneOutlined, TabletMacOutlined, ZoomIn, ZoomOut, ZoomOutMap } from '@mui/icons-material';
import { Divider, IconButton, Paper, Theme, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';

const list = [
  {
    value: 'desktop',
    icon: DesktopWindowsOutlined,
    title: '데스크톱 뷰 (1440px)',
  },
  {
    value: 'tablet',
    icon: TabletMacOutlined,
    title: '태블릿 뷰 (996px)',
  },
  {
    value: 'mobile',
    icon: SmartphoneOutlined,
    title: '모바일 뷰 (512px)',
  },
];

export interface ResponsiveToolbarProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  onChangeBreakpoint(value: 'desktop' | 'tablet' | 'mobile'): void;
  zoom?: number;
  onChangeZoom?(value: number): void;
  onOpenLayers?(): void;
}

export default function ResponsiveToolbar({ breakpoint, onChangeBreakpoint, zoom = 1, onChangeZoom, onOpenLayers }: ResponsiveToolbarProps) {
  const isTablet = useMediaQuery<Theme>((theme) => theme.breakpoints.between('md', 'lg'));
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (isTablet && breakpoint === 'desktop') {
      onChangeBreakpoint('tablet');
    } else if (isMobile && ['desktop', 'tablet'].includes(breakpoint)) {
      onChangeBreakpoint('mobile');
    }
  }, [onChangeBreakpoint, breakpoint, isMobile, isTablet]);

  const handleZoomIn = () => {
    if (onChangeZoom) onChangeZoom(Math.min(1.5, +(zoom + 0.1).toFixed(1)));
  };

  const handleZoomOut = () => {
    if (onChangeZoom) onChangeZoom(Math.max(0.5, +(zoom - 0.1).toFixed(1)));
  };

  const handleZoomReset = () => {
    if (onChangeZoom) onChangeZoom(1);
  };

  return !isMobile ? (
    <Paper
      elevation={15}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        borderRadius: 99,
        padding: 1.5,
        paddingY: 0.8,
      }}
    >
      {/* 레이어 트리 버튼 */}
      {onOpenLayers && (
        <>
          <Tooltip title="레이어 트리 보기">
            <IconButton
              size="small"
              onClick={onOpenLayers}
            >
              <AccountTreeOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 20, my: 'auto' }}
          />
        </>
      )}

      {/* 디바이스 뷰포트 전환 */}
      {list.slice(+isTablet).map(({ value, icon: Icon, title }, i) => (
        <Tooltip
          key={i}
          title={title}
        >
          <IconButton
            size="small"
            sx={{
              backgroundColor: breakpoint === value ? '#1F1F1F' : 'transparent',
              ':hover': { backgroundColor: breakpoint === value ? '#1F1F1F' : 'rgba(0, 0, 0, 0.1)' },
            }}
            onClick={() => {
              onChangeBreakpoint(value as typeof breakpoint);
            }}
          >
            <Icon
              fontSize="small"
              sx={{
                color: breakpoint === value ? 'common.white' : 'common.black',
              }}
            />
          </IconButton>
        </Tooltip>
      ))}

      {/* 줌 배율 조작 */}
      {onChangeZoom && (
        <>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ height: 20, my: 'auto', mx: 0.5 }}
          />
          <Tooltip title="축소">
            <span>
              <IconButton
                size="small"
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
              >
                <ZoomOut fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Typography
            variant="caption"
            fontWeight={700}
            sx={{ minWidth: 36, textAlign: 'center' }}
          >
            {Math.round(zoom * 100)}%
          </Typography>

          <Tooltip title="확대">
            <span>
              <IconButton
                size="small"
                onClick={handleZoomIn}
                disabled={zoom >= 1.5}
              >
                <ZoomIn fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="100% 원래 크기로">
            <IconButton
              size="small"
              onClick={handleZoomReset}
            >
              <ZoomOutMap fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      )}
    </Paper>
  ) : (
    <></>
  );
}
