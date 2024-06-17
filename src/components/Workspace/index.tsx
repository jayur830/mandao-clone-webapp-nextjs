import { Paper } from '@mui/material';

export interface WorkspaceProps {
  breakpoint: 'desktop' | 'tablet' | 'mobile';
}

const widthMap = {
  desktop: 1440,
  tablet: 996,
  mobile: 512,
};

export default function Workspace({ breakpoint }: WorkspaceProps) {
  return (
    <Paper
      elevation={15}
      sx={{
        width: '100%',
        maxWidth: widthMap[breakpoint],
        height: 'fit-content',
        minHeight: 500,
      }}
    >
      Workspace
    </Paper>
  );
}
