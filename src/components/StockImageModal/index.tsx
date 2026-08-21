'use client';

import { Check, Close } from '@mui/icons-material';
import { Box, Card, CardActionArea, CardMedia, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

import { STOCK_CATEGORIES, STOCK_IMAGES, StockImageItem } from '@/constants/stockImages';

export interface StockImageModalProps {
  open: boolean;
  onClose(): void;
  onSelectImage(url: string): void;
}

export default function StockImageModal({ open, onClose, onSelectImage }: StockImageModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<StockImageItem['category']>('food');

  const filteredImages = STOCK_IMAGES.filter((img) => img.category === selectedCategory);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, minHeight: 560 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
          >
            🖼️ 무료 고화질 프로모션 이미지 갤러리
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            원하는 프로모션 이미지를 선택하면 바로 컴포넌트에 적용됩니다.
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={(_, val) => setSelectedCategory(val)}
          variant="scrollable"
          scrollButtons="auto"
        >
          {STOCK_CATEGORIES.map((cat) => (
            <Tab
              key={cat.key}
              value={cat.key}
              label={cat.label}
              sx={{ fontWeight: 700, textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Grid
          container
          spacing={2}
        >
          {filteredImages.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
            >
              <Card
                elevation={2}
                sx={{
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    '.select-overlay': { opacity: 1 },
                  },
                }}
              >
                <CardActionArea
                  onClick={() => {
                    onSelectImage(item.url);
                    onClose();
                  }}
                >
                  <CardMedia
                    component="img"
                    height="160"
                    image={item.url}
                    alt={item.alt}
                    sx={{ objectFit: 'cover' }}
                  />
                  <Box p={1.5}>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      noWrap
                    >
                      {item.title}
                    </Typography>
                  </Box>

                  {/* 호버 시 오버레이 */}
                  <Box
                    className="select-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0, 159, 255, 0.75)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: '#FFFFFF',
                      opacity: 0,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <Check
                      fontSize="large"
                      sx={{ mb: 0.5 }}
                    />
                    <Typography
                      variant="body2"
                      fontWeight={700}
                    >
                      선택하여 적용
                    </Typography>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
