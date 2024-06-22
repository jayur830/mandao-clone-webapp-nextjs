import { Grid, Typography } from '@mui/material';

export interface CarouselBlockProps {
  dataIndex: number[];
  onSelect(dataIndex: number[]): void;
}

export default function CarouselBlock({ dataIndex, onSelect }: CarouselBlockProps) {
  return (
    <Grid
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
    </Grid>
  );
}
