import {
  AlignHorizontalCenterOutlined,
  AlignHorizontalLeftOutlined,
  AlignHorizontalRightOutlined,
  FormatAlignCenterOutlined,
  FormatAlignLeftOutlined,
  FormatAlignRightOutlined,
  FormatItalicOutlined,
  FormatStrikethroughOutlined,
  FormatUnderlinedOutlined,
} from '@mui/icons-material';
import { Button, ButtonGroup } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useColor } from 'react-color-palette';

import ColorPicker from '@/components/ColorPicker';
import { Data } from '@/types/block';

export interface TextControlProps {
  data: Omit<Extract<Data, { type: 'text' }>, 'type'>;
  onChangeData(data: Omit<Extract<Data, { type: 'text' }>, 'type'>): void;
}

export default function TextControl({ data, onChangeData }: TextControlProps) {
  const [color, setColor] = useColor(data.style?.color || '#000000');

  return (
    <>
      <Grid padding={2}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          텍스트
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
          multiline
          size="medium"
          label="텍스트"
          value={data.value}
          onChange={(e) => {
            onChangeData({
              ...data,
              value: e.target.value,
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
            value={data.style?.fontSize || 16}
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
          스타일
        </Typography>
        <Grid
          container
          gap={2}
        >
          <ButtonGroup size="small">
            <Button
              variant={data.style?.textAlign === 'left' ? 'contained' : 'outlined'}
              onClick={() => {
                onChangeData({ ...data, style: { ...data.style, textAlign: 'left' } });
              }}
            >
              <FormatAlignLeftOutlined />
            </Button>
            <Button
              variant={data.style?.textAlign === 'center' ? 'contained' : 'outlined'}
              onClick={() => {
                onChangeData({ ...data, style: { ...data.style, textAlign: 'center' } });
              }}
            >
              <FormatAlignCenterOutlined />
            </Button>
            <Button
              variant={data.style?.textAlign === 'right' ? 'contained' : 'outlined'}
              onClick={() => {
                onChangeData({ ...data, style: { ...data.style, textAlign: 'right' } });
              }}
            >
              <FormatAlignRightOutlined />
            </Button>
          </ButtonGroup>
          <ButtonGroup size="small">
            <Button
              variant={data.style?.textDecoration === 'underline' ? 'contained' : 'outlined'}
              onClick={() => {
                onChangeData({ ...data, style: { ...data.style, textDecoration: data.style?.textDecoration === 'underline' ? 'none' : 'underline' } });
              }}
            >
              <FormatUnderlinedOutlined />
            </Button>
            <Button
              variant={data.style?.textDecoration === 'line-through' ? 'contained' : 'outlined'}
              onClick={() => {
                onChangeData({ ...data, style: { ...data.style, textDecoration: data.style?.textDecoration === 'line-through' ? 'none' : 'line-through' } });
              }}
            >
              <FormatStrikethroughOutlined />
            </Button>
          </ButtonGroup>
          <Button
            size="small"
            variant={data.style?.fontStyle === 'italic' ? 'contained' : 'outlined'}
            onClick={() => {
              onChangeData({ ...data, style: { ...data.style, fontStyle: data.style?.fontStyle === 'italic' ? 'normal' : 'italic' } });
            }}
            sx={{ minWidth: 0 }}
          >
            <FormatItalicOutlined />
          </Button>
        </Grid>
      </Stack>
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
        <ColorPicker
          flex={1}
          label="텍스트 색상"
          colorValue={color}
          onChangeColor={(color) => {
            setColor(color);
            onChangeData({ ...data, style: { ...data.style, color: color.hex } });
          }}
        />
      </Stack>
    </>
  );
}
