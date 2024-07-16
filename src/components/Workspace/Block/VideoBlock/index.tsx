import { Cancel, VideoCameraBackOutlined } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';

import { Data } from '@/types/block';

export interface VideoBlockProps extends Omit<Extract<Data, { type: 'video' }>, 'type'> {
  dataIndex: number[];
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
}

export default function VideoBlock({ dataIndex, onSelect, onDelete, src, fullWidth, style }: VideoBlockProps) {
  return (
    <Grid
      className="block video"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      width={fullWidth ? '100%' : style?.width ?? 'auto'}
      minHeight={200}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(dataIndex);
      }}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'grey.100',
        },
        '& video, & iframe': {
          width: '100%',
          aspectRatio: '16 / 9',
          border: 'none',
        },
      }}
    >
      {src ? (
        src.startsWith('https://youtube.com/embed/') ? (
          <iframe src={src} />
        ) : (
          <video
            autoPlay={false}
            controls
          >
            <source src={src} />
          </video>
        )
      ) : (
        <>
          <VideoCameraBackOutlined
            fontSize="large"
            sx={{ color: 'grey.400' }}
          />
          <Typography
            variant="h6"
            fontWeight={600}
            color="grey.400"
          >
            비디오를 올리세요.
          </Typography>
        </>
      )}
      <IconButton
        className="delete-component-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(dataIndex);
        }}
      >
        <Cancel />
      </IconButton>
    </Grid>
  );
}
