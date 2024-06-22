import { Button, Grid, Typography } from '@mui/material';

import { Data } from '..';
import CarouselBlock from './CarouselBlock';
import ImageBlock from './ImageBlock';
import VideoBlock from './VideoBlock';

export interface BlockProps {
  onClick(dataIndex: number[]): void;
  onSelect(dataIndex: number[]): void;
  dataIndex: number[];
  childrenItems: Data[];
}

export default function Block({ onClick, onSelect, dataIndex, childrenItems }: BlockProps) {
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
                  onSelect={onSelect}
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
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: 'grey.100',
                  },
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
              <ImageBlock
                key={i}
                dataIndex={[...dataIndex, i]}
                onSelect={onSelect}
              />
            );
          case 'video':
            return (
              <VideoBlock
                key={i}
                dataIndex={[...dataIndex, i]}
                onSelect={onSelect}
              />
            );
          case 'carousel':
            return (
              <CarouselBlock
                key={i}
                dataIndex={[...dataIndex, i]}
                onSelect={onSelect}
              />
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
