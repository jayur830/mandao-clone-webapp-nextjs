'use client';

import { ContentCopy, Download, OpenInNew } from '@mui/icons-material';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { Data } from '@/types/block';
import { generateStandaloneHtml } from '@/utils/generateHtml';

export interface PublishModalProps {
  open: boolean;
  onClose(): void;
  data: Data[];
}

export default function PublishModal({ open, onClose, data }: PublishModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  const base64Str = typeof window !== 'undefined' ? Buffer.from(JSON.stringify(data), 'utf8').toString('base64') : '';
  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/preview/${base64Str}` : '';

  const handleDownloadHtml = () => {
    const htmlContent = generateStandaloneHtml(data);
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mandao-promotion-${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle fontWeight={700}>프로모션 페이지 배포 및 내보내기</DialogTitle>
      <DialogContent>
        <Stack
          spacing={3}
          paddingTop={1}
        >
          {copied && <Alert severity="success">공유 URL이 클립보드에 복사되었습니다!</Alert>}

          {/* 옵션 1: 단일 HTML 다운로드 */}
          <Box
            padding={2}
            sx={{
              border: '1px solid #E0E0E0',
              borderRadius: 2,
              backgroundColor: '#FAFAFA',
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
            >
              📦 단일 정적 HTML 파일 다운로드
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              marginBottom={2}
            >
              서버나 데이터베이스 없이 어디서나 브라우저로 바로 열 수 있는 완성된 HTML 파일을 다운로드합니다.
            </Typography>
            <Button
              variant="contained"
              startIcon={<Download />}
              onClick={handleDownloadHtml}
              fullWidth
              size="medium"
            >
              독립형 HTML 파일 다운로드 (.html)
            </Button>
          </Box>

          <Divider />

          {/* 옵션 2: 웹 공유 URL */}
          <Box
            padding={2}
            sx={{
              border: '1px solid #E0E0E0',
              borderRadius: 2,
              backgroundColor: '#FAFAFA',
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight={700}
              gutterBottom
            >
              🔗 실시간 웹 미리보기 및 공유 URL
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              marginBottom={1.5}
            >
              현재 작업한 프로모션 데이터를 담은 고유 URL을 생성하여 공유합니다.
            </Typography>
            <TextField
              fullWidth
              size="small"
              value={shareUrl}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleCopyUrl}
                      edge="end"
                      title="URL 복사"
                    >
                      <ContentCopy fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ marginBottom: 1.5 }}
            />
            <Stack
              direction="row"
              spacing={1}
            >
              <Button
                variant="outlined"
                startIcon={<ContentCopy />}
                onClick={handleCopyUrl}
                fullWidth
                size="small"
              >
                URL 복사하기
              </Button>
              <Button
                variant="outlined"
                startIcon={<OpenInNew />}
                href={shareUrl}
                target="_blank"
                fullWidth
                size="small"
              >
                새 탭에서 열기
              </Button>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="inherit"
        >
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
