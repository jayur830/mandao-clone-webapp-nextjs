import { ImageOutlined, SmartButtonOutlined, SmartDisplayOutlined, ViewAgendaOutlined, ViewCarouselOutlined } from '@mui/icons-material';
import { IconButton, List, ListItem, Paper, Tooltip } from '@mui/material';

export default function ComponentMenu() {
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
            <IconButton title="Block">
              <ViewAgendaOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </ListItem>
        {/* Image */}
        <ListItem>
          <Tooltip
            placement="right"
            title="이미지"
          >
            <IconButton title="Image">
              <ImageOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </ListItem>
        {/* Video (Asset, Youtube) */}
        <ListItem>
          <Tooltip
            placement="right"
            title="비디오 (에셋, 유튜브)"
          >
            <IconButton title="Video (Asset, Youtube)">
              <SmartDisplayOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </ListItem>
        {/* Carousel */}
        <ListItem>
          <Tooltip
            placement="right"
            title="캐러셀"
          >
            <IconButton title="Carousel">
              <ViewCarouselOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </ListItem>
        {/* Button */}
        <ListItem>
          <Tooltip
            placement="right"
            title="버튼"
          >
            <IconButton title="Button">
              <SmartButtonOutlined fontSize="medium" />
            </IconButton>
          </Tooltip>
        </ListItem>
      </List>
    </Paper>
  );
}
