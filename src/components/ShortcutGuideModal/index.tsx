'use client';

import { Close, KeyboardOutlined, LightbulbOutlined } from '@mui/icons-material';
import { Box, Chip, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

export interface ShortcutGuideModalProps {
  open: boolean;
  onClose(): void;
}

const SHORTCUTS = [
  {
    category: '히스토리 (History)',
    keys: ['Cmd / Ctrl', 'Z'],
    description: '작업 실행 취소 (Undo)',
  },
  {
    category: '히스토리 (History)',
    keys: ['Cmd / Ctrl', 'Shift', 'Z'],
    description: '작업 다시 실행 (Redo)',
  },
  {
    category: '단축키 가이드',
    keys: ['?'],
    description: '키보드 단축키 및 사용 가이드 열기',
  },
];

const BUILDER_TIPS = [
  {
    title: '🔀 드래그 앤 드롭으로 자유로운 순서 변경',
    desc: '캔버스 상에서 각 블록의 좌측 드래그 핸들(⋮⋮)을 잡고 끌어서 자유롭게 순서를 바꿀 수 있습니다.',
  },
  {
    title: '🌲 레이어 계층 트리 탐색',
    desc: '상단 툴바의 계층 트리 아이콘을 클릭하면 전체 중첩 블록 구조를 한눈에 보고 직접 선택/삭제할 수 있습니다.',
  },
  {
    title: '📌 화면 하단 고정 바 (Sticky CTA)',
    desc: '구매/신청 버튼이나 블록 속성에서 [화면 하단 고정 바]를 켜면 스크롤 시에도 화면 하단에 플로팅 바로 유지됩니다.',
  },
  {
    title: '🚀 1-Click 독립형 HTML 내보내기',
    desc: '우측 하단 [배포하기] 버튼을 통해 서버 없이 브라우저에서 바로 열 수 있는 단일 HTML 파일을 즉시 다운로드할 수 있습니다.',
  },
];

export default function ShortcutGuideModal({ open, onClose }: ShortcutGuideModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
        >
          <KeyboardOutlined color="primary" />
          <Typography
            variant="h6"
            fontWeight={700}
          >
            만다오 빌더 단축키 & 가이드
          </Typography>
        </Stack>
        <IconButton
          onClick={onClose}
          size="small"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* 단축키 테이블 */}
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              marginBottom={1}
            >
              ⌨️ 키보드 단축키
            </Typography>
            <TableContainer
              component={Paper}
              elevation={0}
              sx={{ border: '1px solid #E0E0E0', borderRadius: 2 }}
            >
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#F8F9FA' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, width: 140 }}>분류</TableCell>
                    <TableCell sx={{ fontWeight: 700, width: 220 }}>단축키</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>설명</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SHORTCUTS.map((item, idx) => (
                    <TableRow
                      key={idx}
                      hover
                    >
                      <TableCell sx={{ color: 'text.secondary', fontSize: 13 }}>{item.category}</TableCell>
                      <TableCell>
                        <Stack
                          direction="row"
                          spacing={0.5}
                        >
                          {item.keys.map((k, kIdx) => (
                            <Chip
                              key={kIdx}
                              label={k}
                              size="small"
                              sx={{
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                backgroundColor: '#EEEEEE',
                                borderRadius: 1,
                              }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500, fontSize: 13 }}>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Divider />

          {/* 빌더 활용 꿀팁 */}
          <Box>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              marginBottom={1.5}
            >
              <LightbulbOutlined sx={{ color: '#F59E0B' }} />
              <Typography
                variant="subtitle1"
                fontWeight={700}
              >
                💡 빌더 활용 꿀팁
              </Typography>
            </Stack>

            <Grid
              container
              spacing={1.5}
            >
              {BUILDER_TIPS.map((tip, idx) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  key={idx}
                >
                  <Box
                    sx={{
                      p: 2,
                      backgroundColor: '#F9FAFB',
                      border: '1px solid #E5E7EB',
                      borderRadius: 2,
                      height: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      marginBottom={0.5}
                    >
                      {tip.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      lineHeight={1.5}
                    >
                      {tip.desc}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
