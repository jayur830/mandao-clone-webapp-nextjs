import { Grid, Typography } from '@mui/material';

export default function CarouselBlock() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height={200}
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
