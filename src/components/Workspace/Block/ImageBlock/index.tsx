import { Cancel, PanoramaOutlined } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

import { Data } from '@/types/block';

export interface ImageBlockProps extends Omit<Extract<Data, { type: 'image' }>, 'type'> {
  dataIndex: number[];
  setHovered(value: boolean): void;
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
}

export default function ImageBlock({ dataIndex, setHovered: setParentHovered, onSelect, onDelete, src, fullWidth, style }: ImageBlockProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Grid
      className="block image"
      position="relative"
      display="flex"
      flexDirection="column"
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
        <Image
          src={src}
          alt="image"
          width={720}
          height={480}
          style={style ?? { width: '100%', height: 'auto' }}
        />
      ) : (
        <>
          <PanoramaOutlined
            fontSize="large"
            sx={{ color: 'grey.400' }}
          />
          <Typography
            variant="h6"
            fontWeight={600}
            color="grey.400"
          >
            이미지를 올리세요.
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
