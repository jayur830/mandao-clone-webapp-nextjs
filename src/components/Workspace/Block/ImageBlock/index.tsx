import { PanoramaOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

export interface ImageBlockProps {
  dataIndex: number[];
  onSelect(dataIndex: number[]): void;
}

export default function ImageBlock({ dataIndex, onSelect }: ImageBlockProps) {
  return (
    <>
      <Grid
        container
        direction="column"
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
      </Grid>
    </>
  );
}
