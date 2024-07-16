import { InsertLinkRounded } from '@mui/icons-material';
import { Divider, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useColor } from 'react-color-palette';

import ColorPicker from '@/components/ColorPicker';
import { Data } from '@/types/block';

export interface BlockControlProps {
  data: Omit<Extract<Data, { type: 'block' }>, 'type'>;
  onChangeData(data: Omit<Extract<Data, { type: 'block' }>, 'type'>): void;
}

export default function BlockControl({ data, onChangeData }: BlockControlProps) {
  console.log('[BlockControl] data:', data);

  const [backgroundColor, setBackgroundColor] = useColor(data.style?.backgroundColor || '#FFFFFF');

  return (
    <>
      <Grid padding={2}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          블록
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
          FlexBox 스타일
        </Typography>
        <Grid
          container
          gap={2}
        >
          <Grid flex={1}>
            <Typography
              fontWeight={700}
              marginBottom={1}
            >
              flex-direction
            </Typography>
            <Select
              fullWidth
              value={data.style?.flexDirection || 'column'}
              onChange={(e) => {
                onChangeData({ ...data, style: { ...data.style, flexDirection: e.target.value as NonNullable<Extract<Data, { type: 'block' }>['style']>['flexDirection'] } });
              }}
            >
              <MenuItem value="row">가로</MenuItem>
              <MenuItem value="column">세로</MenuItem>
              <MenuItem value="row-reverse">가로 역순</MenuItem>
              <MenuItem value="column-reverse">세로 역순</MenuItem>
            </Select>
          </Grid>
          <Grid flex={1}>
            <Typography
              fontWeight={700}
              marginBottom={1}
            >
              gap
            </Typography>
            <TextField
              type="number"
              placeholder="6"
              InputProps={{
                endAdornment: 'px',
              }}
              value={data.style?.gap == null ? undefined : data.style.gap}
              onChange={(e) => {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    gap: !!e.target.value ? +e.target.value : null,
                  },
                });
              }}
            />
          </Grid>
        </Grid>
        <Grid
          container
          gap={2}
        >
          <Grid flex={1}>
            <Typography
              fontWeight={700}
              marginBottom={1}
            >
              justify-content
            </Typography>
            <Select
              fullWidth
              value={data.style?.justifyContent}
              onChange={(e) => {
                onChangeData({ ...data, style: { ...data.style, justifyContent: e.target.value as NonNullable<Extract<Data, { type: 'block' }>['style']>['justifyContent'] } });
              }}
            >
              <MenuItem value="flex-start">시작</MenuItem>
              <MenuItem value="center">가운데</MenuItem>
              <MenuItem value="flex-end">끝</MenuItem>
              <MenuItem value="space-between">사이</MenuItem>
              <MenuItem value="space-around">주위</MenuItem>
              <MenuItem value="space-evenly">균등</MenuItem>
            </Select>
          </Grid>
          <Grid flex={1}>
            <Typography
              fontWeight={700}
              marginBottom={1}
            >
              align-items
            </Typography>
            <Select
              fullWidth
              value={data.style?.alignItems}
              onChange={(e) => {
                onChangeData({ ...data, style: { ...data.style, alignItems: e.target.value as NonNullable<Extract<Data, { type: 'block' }>['style']>['alignItems'] } });
              }}
            >
              <MenuItem value="flex-start">시작</MenuItem>
              <MenuItem value="center">가운데</MenuItem>
              <MenuItem value="flex-end">끝</MenuItem>
              <MenuItem value="stretch">늘리기</MenuItem>
              <MenuItem value="baseline">기준선</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Stack>
      <Divider />
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          안쪽 여백
        </Typography>
        <Grid
          container
          alignItems="center"
          gap={2}
        >
          <TextField
            type="number"
            label="top"
            placeholder="12"
            InputProps={{
              endAdornment: 'px',
            }}
            value={data.style?.paddingTop == null ? undefined : `${data.style.paddingTop}`}
            onChange={(e) => {
              if (data.fixPaddingVertical) {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    paddingTop: !!e.target.value ? +e.target.value : null,
                    paddingBottom: !!e.target.value ? +e.target.value : null,
                  },
                });
              } else {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    paddingTop: !!e.target.value ? +e.target.value : null,
                  },
                });
              }
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            type="number"
            label="bottom"
            placeholder="12"
            InputProps={{
              endAdornment: 'px',
            }}
            value={data.style?.paddingBottom == null ? undefined : `${data.style.paddingBottom}`}
            onChange={(e) => {
              if (data.fixPaddingVertical) {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    paddingTop: !!e.target.value ? +e.target.value : null,
                    paddingBottom: !!e.target.value ? +e.target.value : null,
                  },
                });
              } else {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    paddingBottom: !!e.target.value ? +e.target.value : null,
                  },
                });
              }
            }}
            sx={{ flex: 1 }}
          />
          <IconButton
            sx={{ height: 40 }}
            onClick={() => {
              onChangeData({ ...data, fixPaddingVertical: !data.fixPaddingVertical });
            }}
          >
            <InsertLinkRounded sx={{ color: data.fixPaddingVertical ? 'common.black' : 'grey.400' }} />
          </IconButton>
        </Grid>
        <Grid
          container
          alignItems="center"
          gap={2}
        >
          <TextField
            type="number"
            label="left"
            placeholder="12"
            InputProps={{
              endAdornment: 'px',
            }}
            value={data.style?.paddingLeft == null ? undefined : `${data.style.paddingLeft}`}
            onChange={(e) => {
              if (data.fixPaddingHorizontal) {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    paddingRight: !!e.target.value ? +e.target.value : null,
                    paddingLeft: !!e.target.value ? +e.target.value : null,
                  },
                });
              } else {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    paddingLeft: !!e.target.value ? +e.target.value : null,
                  },
                });
              }
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            type="number"
            label="right"
            placeholder="12"
            InputProps={{
              endAdornment: 'px',
            }}
            value={data.style?.paddingRight == null ? undefined : `${data.style.paddingRight}`}
            onChange={(e) => {
              if (data.fixPaddingHorizontal) {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    paddingRight: !!e.target.value ? +e.target.value : null,
                    paddingLeft: !!e.target.value ? +e.target.value : null,
                  },
                });
              } else {
                onChangeData({
                  ...data,
                  style: {
                    ...data.style,
                    paddingRight: !!e.target.value ? +e.target.value : null,
                  },
                });
              }
            }}
            sx={{ flex: 1 }}
          />
          <IconButton
            sx={{ height: 40 }}
            onClick={() => {
              onChangeData({ ...data, fixPaddingHorizontal: !data.fixPaddingHorizontal });
            }}
          >
            <InsertLinkRounded sx={{ color: data.fixPaddingHorizontal ? 'common.black' : 'grey.400' }} />
          </IconButton>
        </Grid>
      </Stack>
      <Divider />
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          배경 색상
        </Typography>
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
      </Stack>
    </>
  );
}
