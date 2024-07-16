import 'react-color-palette/css';

import { FormControl, Grid, GridProps, Popover, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { ColorPicker as _ColorPicker, IColor } from 'react-color-palette';

export interface ColorPickerProps extends GridProps {
  label?: string;
  colorValue: IColor;
  onChangeColor(value: IColor): void;
}

export default function ColorPicker({ label, colorValue, onChangeColor, ...props }: ColorPickerProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [delayLoad, setDelayLoad] = useState<boolean>(false);

  useEffect(() => {
    if (!!anchorEl) {
      setTimeout(() => {
        setDelayLoad(true);
      }, 100);
    } else {
      setDelayLoad(false);
    }
  }, [anchorEl]);

  return (
    <>
      <Grid
        container
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
        sx={{ cursor: 'pointer' }}
        {...props}
      >
        <FormControl
          component={TextField}
          fullWidth
          label={label}
          value={colorValue.hex.toUpperCase()}
          InputProps={{
            disabled: true,
            startAdornment: (
              <Grid
                width={20}
                borderRadius={1}
                marginRight={1}
                sx={{
                  backgroundColor: colorValue.hex.toUpperCase(),
                  aspectRatio: '1 / 1',
                }}
              />
            ),
          }}
          sx={{
            '.Mui-disabled': {
              WebkitTextFillColor: 'black',
              color: 'common.black',
            },
          }}
        />
      </Grid>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {delayLoad && (
          <_ColorPicker
            color={colorValue}
            onChange={onChangeColor}
            height={120}
          />
        )}
      </Popover>
    </>
  );
}
