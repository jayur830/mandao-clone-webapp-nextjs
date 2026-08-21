'use client';

import { Divider, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useColor } from 'react-color-palette';

import ColorPicker from '@/components/ColorPicker';
import { Data } from '@/types/block';

export interface TimerControlProps {
  data: Omit<Extract<Data, { type: 'timer' }>, 'type'>;
  onChangeData(data: Omit<Extract<Data, { type: 'timer' }>, 'type'>): void;
}

export default function TimerControl({ data, onChangeData }: TimerControlProps) {
  const [color, setColor] = useColor(data.style?.color || '#FFFFFF');
  const [bgColor, setBgColor] = useColor(data.style?.backgroundColor || '#1F1F1F');

  return (
    <>
      <Grid padding={2}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          ⏰ 카운트다운 타이머
        </Typography>
      </Grid>

      {/* 목표 일시 설정 */}
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          마감 일시 설정
        </Typography>
        <TextField
          type="datetime-local"
          size="small"
          value={data.targetDate || ''}
          onChange={(e) => {
            onChangeData({
              ...data,
              targetDate: e.target.value,
            });
          }}
          InputLabelProps={{ shrink: true }}
          helperText="프로모션이 마감되는 날짜와 시간을 지정하세요."
        />

        <TextField
          size="small"
          label="상단 안내 라벨"
          placeholder="특가 마감까지 남은 시간"
          value={data.label ?? ''}
          onChange={(e) => {
            onChangeData({
              ...data,
              label: e.target.value,
            });
          }}
        />
      </Stack>

      <Divider />

      {/* 스타일 설정 */}
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          스타일 & 레이아웃
        </Typography>
        <Grid
          container
          gap={2}
        >
          <TextField
            label="폰트 크기"
            type="number"
            size="small"
            value={data.style?.fontSize ?? 20}
            onChange={(e) => {
              onChangeData({
                ...data,
                style: {
                  ...data.style,
                  fontSize: e.target.value !== '' ? +e.target.value : 20,
                },
              });
            }}
            InputProps={{ endAdornment: 'px' }}
            sx={{ flex: 1 }}
          />
          <TextField
            label="모서리 둥글기"
            type="number"
            size="small"
            value={data.style?.borderRadius ?? 8}
            onChange={(e) => {
              onChangeData({
                ...data,
                style: {
                  ...data.style,
                  borderRadius: e.target.value !== '' ? +e.target.value : null,
                },
              });
            }}
            InputProps={{ endAdornment: 'px' }}
            sx={{ flex: 1 }}
          />
        </Grid>

        <Select
          size="small"
          value={data.style?.boxShadow || 'none'}
          onChange={(e) => {
            onChangeData({
              ...data,
              style: {
                ...data.style,
                boxShadow: e.target.value,
              },
            });
          }}
        >
          <MenuItem value="none">그림자 없음</MenuItem>
          <MenuItem value="0 4px 12px rgba(0,0,0,0.12)">약한 그림자</MenuItem>
          <MenuItem value="0 8px 24px rgba(0,0,0,0.2)">강한 그림자</MenuItem>
        </Select>
      </Stack>

      <Divider />

      {/* 색상 설정 */}
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          색상 설정
        </Typography>
        <ColorPicker
          flex={1}
          label="글자 색상"
          colorValue={color}
          onChangeColor={(c) => {
            setColor(c);
            onChangeData({
              ...data,
              style: { ...data.style, color: c.hex },
            });
          }}
        />
        <ColorPicker
          flex={1}
          label="배경 색상"
          colorValue={bgColor}
          onChangeColor={(c) => {
            setBgColor(c);
            onChangeData({
              ...data,
              style: { ...data.style, backgroundColor: c.hex },
            });
          }}
        />
      </Stack>
    </>
  );
}
