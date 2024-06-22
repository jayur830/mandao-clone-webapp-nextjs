import { FileUploadOutlined } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Divider, Grid, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

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
  onChangeImage(base64: string): void;
}

export default function ImageControl({ onChangeImage }: ImageControlProps) {
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [file, setFile] = useState<File | null | undefined>();
  const [url, setUrl] = useState<string>('');

  return (
    <>
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
                  onChangeImage((await getBase64(e.target.files[0])) as unknown as string);
                }
              }}
              style={{ display: 'none' }}
            />
            <label htmlFor="img-upload">
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
                onChangeImage(url);
              }}
            >
              적용
            </Button>
          </>
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
      </Stack>
    </>
  );
}
