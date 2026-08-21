'use client';

import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { Data } from '@/types/block';

export interface TimerBlockProps {
  data: Extract<Data, { type: 'timer' }>;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  if (!targetDate) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };
  }

  const difference = new Date(targetDate).getTime() - new Date().getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isExpired: false,
  };
}

function TimeBox({ value, label, color, bg }: { value: number; label: string; color: string; bg: string }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={0.5}
    >
      <Box
        sx={{
          backgroundColor: bg,
          color: color,
          borderRadius: 1.5,
          minWidth: 44,
          paddingX: 1,
          paddingY: 0.8,
          textAlign: 'center',
          fontWeight: 800,
          fontSize: '1.2em',
          boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.2)',
        }}
      >
        {String(value).padStart(2, '0')}
      </Box>
      <Typography
        variant="caption"
        sx={{ color: color, opacity: 0.8, fontSize: 11 }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function TimerBlock({ data }: TimerBlockProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(data.targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(data.targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [data.targetDate]);

  const color = data.style?.color || '#FFFFFF';
  const backgroundColor = data.style?.backgroundColor || '#1F1F1F';
  const borderRadius = data.style?.borderRadius != null ? `${data.style.borderRadius}px` : '8px';
  const fontSize = data.style?.fontSize ? `${data.style.fontSize}px` : '18px';

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        padding: 2.5,
        boxShadow: data.style?.boxShadow && data.style.boxShadow !== 'none' ? data.style.boxShadow : undefined,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1.5,
        fontSize: fontSize,
      }}
    >
      {data.label && (
        <Typography
          sx={{
            color: color,
            fontWeight: 700,
            fontSize: '0.9em',
            letterSpacing: -0.3,
          }}
        >
          {data.label}
        </Typography>
      )}

      {timeLeft.isExpired ? (
        <Typography sx={{ color: color, fontWeight: 700, fontSize: '1.1em' }}>프로모션이 마감되었습니다.</Typography>
      ) : (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          {timeLeft.days > 0 && (
            <>
              <TimeBox
                value={timeLeft.days}
                label="일"
                color={color}
                bg="rgba(255,255,255,0.15)"
              />
              <Typography sx={{ color: color, fontWeight: 800, mb: 2.5 }}>:</Typography>
            </>
          )}
          <TimeBox
            value={timeLeft.hours}
            label="시"
            color={color}
            bg="rgba(255,255,255,0.15)"
          />
          <Typography sx={{ color: color, fontWeight: 800, mb: 2.5 }}>:</Typography>
          <TimeBox
            value={timeLeft.minutes}
            label="분"
            color={color}
            bg="rgba(255,255,255,0.15)"
          />
          <Typography sx={{ color: color, fontWeight: 800, mb: 2.5 }}>:</Typography>
          <TimeBox
            value={timeLeft.seconds}
            label="초"
            color={color}
            bg="rgba(255,255,255,0.15)"
          />
        </Stack>
      )}
    </Box>
  );
}
