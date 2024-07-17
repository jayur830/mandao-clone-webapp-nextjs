import { Checkbox, Divider, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useColor } from 'react-color-palette';

import ColorPicker from '@/components/ColorPicker';
import { Data } from '@/types/block';

export interface ButtonControlProps {
  data: Omit<Extract<Data, { type: 'button' }>, 'type'>;
  onChangeData(data: Omit<Extract<Data, { type: 'button' }>, 'type'>): void;
}

export default function ButtonControl({ data, onChangeData }: ButtonControlProps) {
  const [paddingEditType, setPaddingEditType] = useState<'none' | 'direction' | 'anchor'>('none');

  const [backgroundColor, setBackgroundColor] = useColor(data.style?.backgroundColor || '#FFFFFF');
  const [color, setColor] = useColor(data.style?.color || '#FFFFFF');

  return (
    <>
      <Grid padding={2}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          버튼
        </Typography>
      </Grid>
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          텍스트 속성
        </Typography>
        <TextField
          variant="standard"
          size="medium"
          label="텍스트"
          value={data.text}
          onChange={(e) => {
            onChangeData({
              ...data,
              text: e.target.value,
            });
          }}
        />
        <Grid
          container
          gap={3}
        >
          <TextField
            variant="standard"
            size="medium"
            label="크기"
            type="number"
            value={data.style?.fontSize || 14}
            onChange={(e) => {
              onChangeData({
                ...data,
                style: {
                  ...data.style,
                  fontSize: +e.target.value,
                },
              });
            }}
            sx={{ flex: 1 }}
          />
          <Select
            label="굵기"
            title="Font Weight"
            value={data.style?.fontWeight || 400}
            onChange={(e) => {
              onChangeData({
                ...data,
                style: {
                  ...data.style,
                  fontWeight: +(e.target.value as string) as 100 | 300 | 400 | 500 | 600 | 700,
                },
              });
            }}
            sx={{ flex: 1 }}
          >
            <MenuItem value={100}>Thin</MenuItem>
            <MenuItem value={300}>Light</MenuItem>
            <MenuItem value={400}>Regular</MenuItem>
            <MenuItem value={500}>Medium</MenuItem>
            <MenuItem value={600}>SemiBold</MenuItem>
            <MenuItem value={700}>Bold</MenuItem>
          </Select>
        </Grid>
      </Stack>
      <Divider />
      <Stack
        alignItems="flex-start"
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          크기 속성
        </Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="가로 꽉 채움"
          checked={data.fullWidth}
          onChange={(_, fullWidth) => {
            onChangeData({ ...data, fullWidth });
          }}
        />
      </Stack>
      <Divider />
      <Stack
        alignItems="flex-start"
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          테두리 속성
        </Typography>
        <TextField
          type="number"
          label="모서리 둥글게"
          fullWidth
          value={data.style?.borderRadius == null ? '' : data.style.borderRadius}
          onChange={(e) => {
            onChangeData({
              ...data,
              style: {
                ...data.style,
                borderRadius: !!e.target.value ? +e.target.value : null,
              },
            });
          }}
          InputProps={{
            endAdornment: 'px',
          }}
        />
        {paddingEditType === 'none' ? (
          <TextField
            type="number"
            label="여백"
            fullWidth
          />
        ) : paddingEditType === 'direction' ? (
          <Grid
            container
            gap={2}
          >
            <TextField
              type="number"
              label="가로"
              sx={{ flex: 1 }}
            />
            <TextField
              type="number"
              label="세로"
              sx={{ flex: 1 }}
            />
          </Grid>
        ) : (
          <Grid
            container
            gap={2}
          >
            <TextField
              type="number"
              label="상단"
              sx={{ flex: 1 }}
            />
            <TextField
              type="number"
              label="하단"
              sx={{ flex: 1 }}
            />
            <TextField
              type="number"
              label="좌측"
              sx={{ flex: 1 }}
            />
            <TextField
              type="number"
              label="우측"
              sx={{ flex: 1 }}
            />
          </Grid>
        )}
        <RadioGroup
          row
          defaultValue="none"
          onChange={(e) => {
            setPaddingEditType(e.target.value as typeof paddingEditType);
          }}
        >
          <FormControlLabel
            value="none"
            control={<Radio />}
            label="없음"
          />
          <FormControlLabel
            value="direction"
            control={<Radio />}
            label="가로/세로 상세"
          />
          <FormControlLabel
            value="anchor"
            control={<Radio />}
            label="상하좌우 상세"
          />
        </RadioGroup>
      </Stack>
      <Divider />
      <Stack
        alignItems="flex-start"
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          색상
        </Typography>
        <Grid
          container
          gap={2}
        >
          <ColorPicker
            flex={1}
            label="배경"
            colorValue={backgroundColor}
            onChangeColor={(color) => {
              console.log('backgroundColor:', color);
              setBackgroundColor(color);
              onChangeData({ ...data, style: { ...data.style, backgroundColor: color.hex } });
            }}
          />
          <ColorPicker
            flex={1}
            label="텍스트"
            colorValue={color}
            onChangeColor={(color) => {
              console.log('color:', color);
              setColor(color);
              onChangeData({ ...data, style: { ...data.style, color: color.hex } });
            }}
          />
        </Grid>
      </Stack>
    </>
  );
}
