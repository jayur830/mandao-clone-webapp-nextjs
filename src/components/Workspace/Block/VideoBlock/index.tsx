import { Cancel, VideoCameraBackOutlined } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

import { Data } from '@/types/block';

export interface VideoBlockProps extends Omit<Extract<Data, { type: 'video' }>, 'type'> {
  dataIndex: number[];
  setHovered(value: boolean): void;
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
}

export default function VideoBlock({ dataIndex, setHovered: setParentHovered, onSelect, onDelete, src, fullWidth, style }: VideoBlockProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Grid
      className="block video"
      position="relative"
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
      onMouseEnter={() => {
        setParentHovered(false);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setParentHovered(true);
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
      <Grid
        position="absolute"
        top={0}
        left={0}
        border="3px solid #009FFF"
        width="100%"
        height="100%"
        sx={{
          transition: 'opacity 0.15s ease',
          opacity: +hovered,
        }}
      />
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
