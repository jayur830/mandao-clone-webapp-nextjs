'use client';

import { Close, DeleteOutline, FolderOpenOutlined, ImageOutlined, SmartButtonOutlined, SmartDisplayOutlined, TextFormatOutlined, ViewAgendaOutlined, ViewCarouselOutlined } from '@mui/icons-material';
import { Box, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';

import { Data } from '@/types/block';

export interface LayerTreePanelProps {
  open: boolean;
  onClose(): void;
  data: Data[];
  selectedDataIndex?: number[] | null | undefined;
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
}

function getItemInfo(item: Data): { label: string; icon: React.ReactElement } {
  switch (item.type) {
    case 'block':
      return {
        label: item.children && item.children.length > 0 ? `블록 (${item.children.length}개)` : '블록',
        icon: (
          <FolderOpenOutlined
            fontSize="small"
            sx={{ color: '#F59E0B' }}
          />
        ),
      };
    case 'image':
      return {
        label: item.src ? '이미지 (등록됨)' : '이미지',
        icon: (
          <ImageOutlined
            fontSize="small"
            sx={{ color: '#3B82F6' }}
          />
        ),
      };
    case 'video':
      return {
        label: item.src ? '비디오 (등록됨)' : '비디오',
        icon: (
          <SmartDisplayOutlined
            fontSize="small"
            sx={{ color: '#EF4444' }}
          />
        ),
      };
    case 'carousel':
      return {
        label: `캐러셀 (${item.items?.length || 0} 슬라이드)`,
        icon: (
          <ViewCarouselOutlined
            fontSize="small"
            sx={{ color: '#8B5CF6' }}
          />
        ),
      };
    case 'button':
      return {
        label: `버튼: "${item.text}"`,
        icon: (
          <SmartButtonOutlined
            fontSize="small"
            sx={{ color: '#10B981' }}
          />
        ),
      };
    case 'text':
      return {
        label: `텍스트: "${item.value.slice(0, 15)}${item.value.length > 15 ? '...' : ''}"`,
        icon: (
          <TextFormatOutlined
            fontSize="small"
            sx={{ color: '#6B7280' }}
          />
        ),
      };
    default:
      return { label: '요소', icon: <ViewAgendaOutlined fontSize="small" /> };
  }
}

function TreeNodes({
  items,
  parentIndex = [],
  selectedDataIndex,
  onSelect,
  onDelete,
  depth = 0,
}: {
  items: Data[];
  parentIndex?: number[];
  selectedDataIndex?: number[] | null;
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
  depth?: number;
}) {
  return (
    <List
      dense
      disablePadding
    >
      {items.map((item, i) => {
        const currentIndex = [...parentIndex, i];
        const isSelected = Boolean(selectedDataIndex) && selectedDataIndex!.length === currentIndex.length && selectedDataIndex!.every((val, idx) => val === currentIndex[idx]);

        const { label, icon } = getItemInfo(item);

        return (
          <Box key={i}>
            <ListItemButton
              selected={isSelected}
              onClick={() => onSelect(currentIndex)}
              sx={{
                paddingLeft: 2 + depth * 2,
                borderRadius: 1,
                marginY: 0.3,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(0, 159, 255, 0.12)',
                  borderLeft: '3px solid #009FFF',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 28 }}>{icon}</ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: isSelected ? 700 : 500,
                  noWrap: true,
                }}
              />
              <IconButton
                size="small"
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(currentIndex);
                }}
                sx={{ opacity: 0.6, ':hover': { opacity: 1, color: 'error.main' } }}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
            </ListItemButton>

            {item.type === 'block' && item.children && item.children.length > 0 && (
              <TreeNodes
                items={item.children}
                parentIndex={currentIndex}
                selectedDataIndex={selectedDataIndex}
                onSelect={onSelect}
                onDelete={onDelete}
                depth={depth + 1}
              />
            )}
          </Box>
        );
      })}
    </List>
  );
}

export default function LayerTreePanel({ open, onClose, data, selectedDataIndex, onSelect, onDelete }: LayerTreePanelProps) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          backgroundColor: '#FFFFFF',
          padding: 2,
        },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={1.5}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          🌲 레이어 계층 구조
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
        >
          <Close />
        </IconButton>
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        marginBottom={2}
      >
        컴포넌트 트리를 한눈에 확인하고 직접 선택하거나 관리할 수 있습니다.
      </Typography>

      <Divider sx={{ marginBottom: 1 }} />

      <Box sx={{ overflowY: 'auto', flex: 1 }}>
        {data.length === 0 ? (
          <Box
            padding={4}
            textAlign="center"
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              배치된 컴포넌트가 없습니다.
            </Typography>
          </Box>
        ) : (
          <TreeNodes
            items={data}
            selectedDataIndex={selectedDataIndex}
            onSelect={onSelect}
            onDelete={onDelete}
          />
        )}
      </Box>
    </Drawer>
  );
}
