import { PanoramaOutlined, VideoCameraBackOutlined } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';

import { Data } from '..';

export interface BlockProps {
  onClick(dataIndex: number[]): void;
  dataIndex: number[];
  childrenItems: Data[];
}

export default function Block({ onClick, dataIndex, childrenItems }: BlockProps) {
  return (
    <Grid
      onClick={(e) => {
        e.stopPropagation();
        onClick(dataIndex);
      }}
    >
      {childrenItems.map((item, i) => {
        switch (item.type) {
          case 'block':
            if (item.children && item.children.length > 0) {
              return (
                <Block
                  key={i}
                  onClick={onClick}
                  dataIndex={[...dataIndex, i]}
                  childrenItems={item.children}
                />
              );
            }

            return (
              <Grid
                key={i}
                container
                justifyContent="center"
                alignItems="center"
                height={200}
                onClick={(e) => {
                  e.stopPropagation();
                  onClick([...dataIndex, i]);
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={600}
                  color="grey.400"
                >
                  블록
                </Typography>
              </Grid>
            );
          case 'image':
            return (
              <Grid
                key={i}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                height={200}
                sx={{ cursor: 'pointer' }}
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
            );
          case 'video':
            return (
              <Grid
                key={i}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                height={200}
                sx={{ cursor: 'pointer' }}
              >
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
              </Grid>
            );
          case 'carousel':
            return (
              <Grid
                key={i}
                container
                justifyContent="center"
                alignItems="center"
                height={200}
              >
                <Typography>Carousel</Typography>
              </Grid>
            );
          case 'button':
            return (
              <Button
                key={i}
                variant="contained"
                fullWidth
              >
                Button
              </Button>
            );
          default:
            return null;
        }
      })}
    </Grid>
  );
}
