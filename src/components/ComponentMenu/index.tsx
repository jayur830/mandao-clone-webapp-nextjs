import { ImageOutlined, SmartDisplayOutlined, ViewAgendaOutlined, ViewCarouselOutlined } from '@mui/icons-material';
import { IconButton, List, ListItem, Paper } from '@mui/material';

export default function ComponentMenu() {
  return (
    <Paper
      square
      elevation={15}
      sx={{ width: 50, height: '100%' }}
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          '.MuiListItem-root': {
            justifyContent: 'center',
            padding: 0,
            '.MuiSvgIcon-root': { color: 'common.black' },
          },
        }}
      >
        {/* Block */}
        <ListItem>
          <IconButton>
            <ViewAgendaOutlined />
          </IconButton>
        </ListItem>
        {/* Image */}
        <ListItem>
          <IconButton>
            <ImageOutlined />
          </IconButton>
        </ListItem>
        {/* Video (Asset, Youtube) */}
        <ListItem>
          <IconButton>
            <SmartDisplayOutlined />
          </IconButton>
        </ListItem>
        {/* Carousel */}
        <ListItem>
          <IconButton>
            <ViewCarouselOutlined />
          </IconButton>
        </ListItem>
      </List>
    </Paper>
  );
}
