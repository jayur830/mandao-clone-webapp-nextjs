import { PanoramaOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';

import { Data } from '@/types/block';

export interface ImageBlockProps extends Omit<Extract<Data, { type: 'image' }>, 'type'> {
  dataIndex: number[];
  onSelect(dataIndex: number[]): void;
}

export default function ImageBlock({ dataIndex, onSelect, src }: ImageBlockProps) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
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
      }}
    >
      {src ? (
        <Image
          src={src}
          alt="image"
          width={720}
          height={480}
          style={{ width: '100%', height: 'auto' }}
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
    </Grid>
  );
}
