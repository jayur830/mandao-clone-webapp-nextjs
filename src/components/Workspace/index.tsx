import { PanoramaOutlined, PhotoSizeSelectActualOutlined, VideoCameraBackOutlined } from '@mui/icons-material';
import { Button, Grid, Paper, Typography } from '@mui/material';
import { useState } from 'react';

export interface WorkspaceProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  selectedComponent?: 'block' | 'image' | 'video' | 'carousel' | 'button';
}

type Data =
  | {
      type: 'block';
      children?: Data[];
    }
  | {
      type: 'image';
      url?: string;
    }
  | {
      type: 'video';
      url?: string;
    }
  | {
      type: 'carousel';
      items: Data[];
    }
  | {
      type: 'button';
      text: string;
    };

const widthMap = {
  desktop: 1440,
  tablet: 996,
  mobile: 512,
};

export default function Workspace({ breakpoint, selectedComponent }: WorkspaceProps) {
  const [data, setData] = useState<Data[]>([]);

  return (
    <>
      <Paper
        elevation={15}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: widthMap[breakpoint],
          height: 'fit-content',
          minHeight: 500,
          transition: 'all 0.3s ease',
        }}
        onClick={(e) => {
          e.stopPropagation();
          switch (selectedComponent) {
            case 'block':
              setData((state) => [...state, { type: 'block' }]);
              break;
            case 'image':
              setData((state) => [...state, { type: 'image' }]);
              break;
            case 'video':
              setData((state) => [...state, { type: 'video' }]);
              break;
            case 'carousel':
              setData((state) => [...state, { type: 'carousel', items: [] }]);
              break;
            case 'button':
              setData((state) => [...state, { type: 'button', text: '텍스트' }]);
              break;
          }
        }}
      >
        {data.map((item, i) => {
          switch (item.type) {
            case 'block':
              return (
                <Grid
                  key={i}
                  container
                  justifyContent="center"
                  alignItems="center"
                  height={200}
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
      </Paper>
    </>
  );
}
