import { Divider, Fade, Grid, Paper } from '@mui/material';
import { useState } from 'react';

export interface WorkspaceProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
}

const widthMap = {
  desktop: 1440,
  tablet: 996,
  mobile: 512,
};

export default function Workspace({ breakpoint }: WorkspaceProps) {
  const [hovered, setHovered] = useState<boolean>(false);

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
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        <Fade in={hovered}>
          <Grid
            container
            height={300}
            padding={1}
            sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          />
        </Fade>
      </Paper>
    </>
  );
}
