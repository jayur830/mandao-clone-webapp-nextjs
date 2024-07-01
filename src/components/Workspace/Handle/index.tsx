import { Grid } from '@mui/material';
import { PropsWithChildren } from 'react';

import HandleIcon from '@/assets/handle.svg';

export interface HandleProps {
  onClick?(): void;
  active?: boolean;
}

export default function Handle({ children, onClick, active }: PropsWithChildren<HandleProps>) {
  return (
    <Grid
      container
      paddingX={1}
      paddingBottom={1}
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        ':hover': {
          backgroundColor: 'grey.100',
        },
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        paddingY={1}
      >
        <HandleIcon />
      </Grid>
      <Grid
        container
        // borderRadius={2}
        // boxShadow="0 4px 10px #0000001A"
      >
        {children}
      </Grid>
    </Grid>
  );
}
