'use client';

import { Add, CollectionsBookmarkOutlined, DeleteOutline, FileUploadOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Grid, IconButton, List, ListItem, ListItemText, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import StockImageModal from '@/components/StockImageModal';
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

export interface CarouselControlProps {
  data: Extract<Data, { type: 'carousel' }>;
  onChangeData(data: Extract<Data, { type: 'carousel' }>): void;
}

export default function CarouselControl({ data, onChangeData }: CarouselControlProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [stockModalOpen, setStockModalOpen] = useState<boolean>(false);

  const items = data.items || [];

  const handleAddImageSlide = (src: string) => {
    const newItem: Data = {
      type: 'image',
      src,
      fullWidth: true,
    };
    onChangeData({
      ...data,
      items: [...items, newItem],
    });
  };

  const handleRemoveSlide = (index: number) => {
    onChangeData({
      ...data,
      items: items.filter((_, i) => i !== index),
    });
  };

  return (
    <>
      <Grid padding={2}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          캐러셀
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
          슬라이드 추가 ({items.length}개)
        </Typography>

        <input
          id="carousel-img-upload"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            if (e.target.files && e.target.files[0]) {
              const base64 = (await getBase64(e.target.files[0])) as unknown as string;
              handleAddImageSlide(base64);
              e.target.value = '';
            }
          }}
          style={{ display: 'none' }}
        />
        <label htmlFor="carousel-img-upload">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            border="2px dotted #DDDDDD"
            borderRadius={3}
            padding={3}
            sx={{
              backgroundColor: '#EEEEEE',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              ':hover': {
                backgroundColor: '#E7E7E7',
              },
            }}
          >
            <FileUploadOutlined
              fontSize="large"
              sx={{ color: 'grey.500' }}
            />
            <Typography color="grey.500">이미지 파일 추가</Typography>
          </Box>
        </label>

        <Stack
          direction="row"
          gap={1}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (imageUrl) {
                handleAddImageSlide(imageUrl);
                setImageUrl('');
              }
            }}
            startIcon={<Add />}
          >
            추가
          </Button>
        </Stack>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<CollectionsBookmarkOutlined />}
          onClick={() => setStockModalOpen(true)}
          sx={{ fontWeight: 700, mt: 1 }}
        >
          무료 스톡 이미지에서 슬라이드 추가
        </Button>
      </Stack>

      <StockImageModal
        open={stockModalOpen}
        onClose={() => setStockModalOpen(false)}
        onSelectImage={(selectedUrl) => {
          handleAddImageSlide(selectedUrl);
        }}
      />

      <Divider />

      <Stack
        gap={1}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          슬라이드 목록
        </Typography>
        {items.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            등록된 슬라이드가 없습니다.
          </Typography>
        ) : (
          <List dense>
            {items.map((item, i) => (
              <ListItem
                key={i}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => handleRemoveSlide(i)}
                  >
                    <DeleteOutline />
                  </IconButton>
                }
                sx={{
                  border: '1px solid #EEEEEE',
                  borderRadius: 1,
                  marginBottom: 1,
                }}
              >
                <ListItemText
                  primary={`슬라이드 ${i + 1}`}
                  secondary={item.type === 'image' ? (item.src ? item.src.substring(0, 30) + '...' : '이미지') : item.type}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Stack>
    </>
  );
}
