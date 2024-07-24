import { Cancel } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { useState } from 'react';

export interface CarouselBlockProps {
  dataIndex: number[];
  setHovered(value: boolean): void;
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
}

export default function CarouselBlock({ dataIndex, setHovered: setParentHovered, onSelect, onDelete }: CarouselBlockProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Grid
      className="block carousel"
      position="relative"
      container
      justifyContent="center"
      alignItems="center"
      height={200}
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
      <Typography>Carousel</Typography>
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
