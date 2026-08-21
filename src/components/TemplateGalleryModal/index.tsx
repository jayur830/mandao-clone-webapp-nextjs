'use client';

import { AutoAwesome } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from '@mui/material';

import { PROMOTION_TEMPLATES, PromotionTemplate } from '@/constants/templates';
import { Data } from '@/types/block';

export interface TemplateGalleryModalProps {
  open: boolean;
  onClose(): void;
  onSelectTemplate(templateData: Data[]): void;
}

export default function TemplateGalleryModal({ open, onClose, onSelectTemplate }: TemplateGalleryModalProps) {
  const handleApply = (template: PromotionTemplate) => {
    onSelectTemplate(template.data);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }}>
        <AutoAwesome color="primary" /> 프로모션 템플릿 갤러리
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="body2"
          color="text.secondary"
          marginBottom={3}
        >
          원하는 기성 프로모션 템플릿을 선택하여 1클릭으로 바로 적용하고 편집할 수 있습니다.
        </Typography>

        <Grid
          container
          spacing={3}
        >
          {PROMOTION_TEMPLATES.map((tmpl) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={tmpl.id}
            >
              <Card
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 2,
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  ':hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6,
                  },
                }}
              >
                {/* 썸네일 헤더 영역 */}
                <Box
                  height={120}
                  bgcolor={tmpl.thumbnailColor}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  position="relative"
                  padding={2}
                >
                  <Chip
                    label={tmpl.badge}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      color: '#FFFFFF',
                      fontWeight: 600,
                    }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#FFFFFF"
                    textAlign="center"
                  >
                    {tmpl.category}
                  </Typography>
                </Box>

                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    gutterBottom
                  >
                    {tmpl.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: 13, lineHeight: 1.5 }}
                  >
                    {tmpl.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ padding: 2, paddingTop: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleApply(tmpl)}
                    sx={{ textTransform: 'none', fontWeight: 700 }}
                  >
                    이 템플릿 적용하기
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
