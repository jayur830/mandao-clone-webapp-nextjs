import { Cancel } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';

export interface CarouselBlockProps {
  dataIndex: number[];
  onSelect(dataIndex: number[]): void;
  onDelete(dataIndex: number[]): void;
}

export default function CarouselBlock({ dataIndex, onSelect, onDelete }: CarouselBlockProps) {
  return (
    <Grid
      className="block carousel"
      container
      justifyContent="center"
      alignItems="center"
      height={200}
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
      }}
    >
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
