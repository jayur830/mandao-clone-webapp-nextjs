import { VideoCameraBackOutlined } from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';

import { Data } from '@/types/block';

export interface VideoBlockProps extends Omit<Extract<Data, { type: 'video' }>, 'type'> {
  dataIndex: number[];
  onSelect(dataIndex: number[]): void;
}

export default function VideoBlock({ dataIndex, onSelect, src, fullWidth, style }: VideoBlockProps) {
  return (
    <Grid
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
      }}
    >
      {src ? (
        <video>
          <source src={src} />
        </video>
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
    </Grid>
  );
}
