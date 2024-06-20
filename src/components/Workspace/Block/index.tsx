import { PanoramaOutlined, VideoCameraBackOutlined } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';

import { Data } from '..';

export interface BlockProps {
  onClick(): void;
  childrenItems: Data[];
}

export default function Block({ onClick, childrenItems }: BlockProps) {
  return (
    <Grid
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {childrenItems.map((item, i) => {
        switch (item.type) {
          case 'block':
            if (item.children && item.children.length > 0) {
              return (
                <Grid
                  key={i}
                  container
                  justifyContent="center"
                  alignItems="center"
                  height={200}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                >
                  <Block
                    onClick={onClick}
                    childrenItems={item.children}
                  />
                </Grid>
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
                  onClick();
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
