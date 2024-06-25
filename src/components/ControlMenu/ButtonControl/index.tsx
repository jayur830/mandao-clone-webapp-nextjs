import { Divider, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

import { Data } from '@/types/block';

export interface ButtonControlProps {
  data: Omit<Extract<Data, { type: 'button' }>, 'type'>;
  onChangeData(data: Omit<Extract<Data, { type: 'button' }>, 'type'>): void;
}

export default function ButtonControl({ data, onChangeData }: ButtonControlProps) {
  return (
    <>
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          버튼 속성
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
    </>
  );
}
