import { ImageOutlined, SmartButtonOutlined, SmartDisplayOutlined, ViewAgendaOutlined, ViewCarouselOutlined } from '@mui/icons-material';
import { IconButton, List, ListItem, Paper, Tooltip } from '@mui/material';

export interface ComponentMenuProps {
  selectedMenu: 'block' | 'image' | 'video' | 'carousel' | 'button' | null | undefined;
  onChangeSelectedMenu(value: 'block' | 'image' | 'video' | 'carousel' | 'button' | null | undefined): void;
}

export default function ComponentMenu({ selectedMenu, onChangeSelectedMenu }: ComponentMenuProps) {
  return (
    <Paper
      square
      elevation={15}
      sx={{ width: 70, height: '100%', paddingY: 2 }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          '.MuiListItem-root': {
            justifyContent: 'center',
            padding: 0,
            '.MuiSvgIcon-root': { color: 'common.black' },
          },
        }}
      >
        {/* Block */}
        <ListItem>
          <Tooltip
            placement="right"
            title="블록"
          >
            <IconButton
              sx={{ backgroundColor: selectedMenu === 'block' ? '#1F1F1F' : 'transparent' }}
              onClick={() => {
                onChangeSelectedMenu(selectedMenu ? null : 'block');
              }}
            >
              <ViewAgendaOutlined
                fontSize="medium"
                sx={{
                  '&.MuiSvgIcon-root': {
                    fill: selectedMenu === 'block' ? 'white' : 'black',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </ListItem>
        {/* Image */}
        <ListItem>
          <Tooltip
            placement="right"
            title="이미지"
          >
            <IconButton
              sx={{ backgroundColor: selectedMenu === 'image' ? '#1F1F1F' : 'transparent' }}
              onClick={() => {
                onChangeSelectedMenu(selectedMenu ? null : 'image');
              }}
            >
              <ImageOutlined
                fontSize="medium"
                sx={{
                  '&.MuiSvgIcon-root': {
                    fill: selectedMenu === 'image' ? 'white' : 'black',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </ListItem>
        {/* Video (Asset, Youtube) */}
        <ListItem>
          <Tooltip
            placement="right"
            title="비디오 (에셋, 유튜브)"
          >
            <IconButton
              sx={{ backgroundColor: selectedMenu === 'video' ? '#1F1F1F' : 'transparent' }}
              onClick={() => {
                onChangeSelectedMenu(selectedMenu ? null : 'video');
              }}
            >
              <SmartDisplayOutlined
                fontSize="medium"
                sx={{
                  '&.MuiSvgIcon-root': {
                    fill: selectedMenu === 'video' ? 'white' : 'black',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </ListItem>
        {/* Carousel */}
        <ListItem>
          <Tooltip
            placement="right"
            title="캐러셀"
          >
            <IconButton
              sx={{ backgroundColor: selectedMenu === 'carousel' ? '#1F1F1F' : 'transparent' }}
              onClick={() => {
                onChangeSelectedMenu(selectedMenu ? null : 'carousel');
              }}
            >
              <ViewCarouselOutlined
                fontSize="medium"
                sx={{
                  '&.MuiSvgIcon-root': {
                    fill: selectedMenu === 'carousel' ? 'white' : 'black',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </ListItem>
        {/* Button */}
        <ListItem>
          <Tooltip
            placement="right"
            title="버튼"
          >
            <IconButton
              sx={{ backgroundColor: selectedMenu === 'button' ? '#1F1F1F' : 'transparent' }}
              onClick={() => {
                onChangeSelectedMenu(selectedMenu ? null : 'button');
              }}
            >
              <SmartButtonOutlined
                fontSize="medium"
                sx={{
                  '&.MuiSvgIcon-root': {
                    fill: selectedMenu === 'button' ? 'white' : 'black',
                  },
                }}
              />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
    </Paper>
  );
}
