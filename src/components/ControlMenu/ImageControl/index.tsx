import { FileUploadOutlined } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Checkbox, Divider, FormControlLabel, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { Data } from '@/types/block';

function getBase64(file: File) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise<FileReader['result']>((resolve) => {
    reader.onload = (e) => {
      resolve(e.target?.result || '');
    };
  });
}

export interface ImageControlProps {
  data: Omit<Extract<Data, { type: 'image' }>, 'type'>;
  onChangeData(data: Omit<Extract<Data, { type: 'image' }>, 'type'>): void;
}

export default function ImageControl({ data, onChangeData }: ImageControlProps) {
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [file, setFile] = useState<File | null | undefined>();
  const [url, setUrl] = useState<string>('');
  const [focusedOnDrag, setFocusedOnDrag] = useState<boolean>(false);

  const actionType = data.action?.type || 'none';

  return (
    <>
      <Grid padding={2}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          이미지
        </Typography>
      </Grid>
      <Stack
        gap={2}
        padding={2}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            이미지 소스
          </Typography>
          <ButtonGroup>
            <Button
              variant={uploadType === 'file' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => {
                if (uploadType !== 'file') {
                  setUploadType('file');
                }
              }}
            >
              파일
            </Button>
            <Button
              variant={uploadType === 'link' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => {
                if (uploadType !== 'link') {
                  setUploadType('link');
                }
              }}
            >
              링크
            </Button>
          </ButtonGroup>
        </Grid>

        {uploadType === 'file' && (
          <>
            <input
              id="img-upload"
              type="file"
              onChange={async (e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                  onChangeData({ ...data, src: (await getBase64(e.target.files[0])) as unknown as string });
                }
              }}
              style={{ display: 'none' }}
            />
            <label
              htmlFor="img-upload"
              onDragEnter={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFocusedOnDrag(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setFocusedOnDrag(false);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                setFocusedOnDrag(false);
                setFile(e.dataTransfer.files[0]);
                onChangeData({ ...data, src: (await getBase64(e.dataTransfer.files[0])) as unknown as string });
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                border="2px dotted #DDDDDD"
                borderRadius={3}
                padding={4}
                sx={{
                  backgroundColor: '#EEEEEE',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  filter: `brightness(${focusedOnDrag ? 1.04 : 1})`,
                  ':hover': {
                    backgroundColor: '#E7E7E7',
                  },
                }}
              >
                {file ? (
                  <Grid>
                    <Typography color="grey.500">{file.name}</Typography>
                  </Grid>
                ) : (
                  <>
                    <FileUploadOutlined
                      fontSize="large"
                      sx={{ color: 'grey.500' }}
                    />
                    <Typography color="grey.500">이미지를 올리세요.</Typography>
                  </>
                )}
              </Box>
            </label>
          </>
        )}
        {uploadType === 'link' && (
          <>
            <TextField
              fullWidth
              size="small"
              placeholder="https://example.com/image.jpg"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={() => {
                onChangeData({ ...data, src: url });
              }}
            >
              적용
            </Button>
          </>
        )}
      </Stack>
      <Divider />

      {/* 클릭 액션/이벤트 설정 */}
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          클릭 인터랙션 (이벤트)
        </Typography>
        <Select
          size="small"
          value={actionType}
          onChange={(e) => {
            const nextType = e.target.value as 'none' | 'link' | 'alert';
            onChangeData({
              ...data,
              action: {
                ...data.action,
                type: nextType,
                url: data.action?.url || '',
                target: data.action?.target || '_blank',
                alertMessage: data.action?.alertMessage || '이미지를 클릭했습니다!',
              },
            });
          }}
        >
          <MenuItem value="none">동작 없음</MenuItem>
          <MenuItem value="link">웹 링크로 이동</MenuItem>
          <MenuItem value="alert">알림 팝업(Alert) 띄우기</MenuItem>
        </Select>

        {actionType === 'link' && (
          <Stack gap={1.5}>
            <TextField
              size="small"
              label="이동할 URL"
              placeholder="https://example.com"
              value={data.action?.url || ''}
              onChange={(e) => {
                onChangeData({
                  ...data,
                  action: {
                    ...data.action,
                    type: 'link',
                    url: e.target.value,
                  },
                });
              }}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="새 창(새 탭)에서 열기"
              checked={data.action?.target !== '_self'}
              onChange={(_, checked) => {
                onChangeData({
                  ...data,
                  action: {
                    ...data.action,
                    type: 'link',
                    target: checked ? '_blank' : '_self',
                  },
                });
              }}
            />
          </Stack>
        )}

        {actionType === 'alert' && (
          <TextField
            size="small"
            label="표시할 알림 메시지"
            placeholder="알림 문구를 입력하세요"
            value={data.action?.alertMessage || ''}
            onChange={(e) => {
              onChangeData({
                ...data,
                action: {
                  ...data.action,
                  type: 'alert',
                  alertMessage: e.target.value,
                },
              });
            }}
          />
        )}
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
          크기
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
    </>
  );
}
