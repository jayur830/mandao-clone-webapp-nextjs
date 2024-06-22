import { PanoramaOutlined } from '@mui/icons-material';
import { Dialog, Grid, Typography } from '@mui/material';
import { useState } from 'react';

export default function ImageBlock() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

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
          setOpenDialog(true);
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
      <Dialog
        open={openDialog}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            setOpenDialog(false);
          }
        }}
      >
        hello
      </Dialog>
    </>
  );
}
