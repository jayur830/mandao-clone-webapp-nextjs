import { ImageOutlined, SmartButtonOutlined, SmartDisplayOutlined, ViewAgendaOutlined, ViewCarouselOutlined } from '@mui/icons-material';
import { IconButton, List, ListItem, Paper, Tooltip } from '@mui/material';

const list = [
  {
    title: '블록',
    value: 'block',
    icon: ViewAgendaOutlined,
  },
  {
    title: '이미지',
    value: 'image',
    icon: ImageOutlined,
  },
  {
    title: '비디오',
    value: 'video',
    icon: SmartDisplayOutlined,
  },
  {
    title: '캐러셀',
    value: 'carousel',
    icon: ViewCarouselOutlined,
  },
  {
    title: '버튼',
    value: 'button',
    icon: SmartButtonOutlined,
  },
];

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
          },
        }}
      >
        {list.map(({ title, value, icon: Icon }, i) => (
          <ListItem key={i}>
            <Tooltip
              placement="right"
              title={title}
            >
              <IconButton
                sx={{
                  backgroundColor: selectedMenu === value ? '#1F1F1F' : 'transparent',
                  ':hover': {
                    backgroundColor: selectedMenu === value ? '#1F1F1F' : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
                onClick={() => {
                  const menu = value as Exclude<typeof selectedMenu, null | undefined>;
                  onChangeSelectedMenu(selectedMenu === menu ? null : menu);
                }}
              >
                <Icon
                  fontSize="medium"
                  sx={{
                    '&.MuiSvgIcon-root': {
                      fill: selectedMenu === value ? 'white' : 'black',
                    },
                  }}
                />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
