'use client';

import { Box, Button, Checkbox, FormControlLabel, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';

import { Data } from '@/types/block';

export interface FormBlockProps {
  data: Extract<Data, { type: 'form' }>;
  isInteractive?: boolean;
}

export default function FormBlock({ data, isInteractive = true }: FormBlockProps) {
  const [formData, setFormData] = useState<Record<string, string | boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isInteractive) return;

    // 필수 입력값 검증
    for (const field of data.fields || []) {
      const val = formData[field.id];
      if (field.required) {
        if (field.type === 'checkbox' && !val) {
          alert(`[필수 동의] "${field.label}" 항목에 체크해 주세요.`);
          return;
        }
        if (field.type !== 'checkbox' && (!val || String(val).trim() === '')) {
          alert(`[필수 입력] "${field.label}" 항목을 입력해 주세요.`);
          return;
        }
      }
    }

    alert(data.successMessage || '신청이 성공적으로 접수되었습니다!');
    setFormData({});
  };

  const backgroundColor = data.style?.backgroundColor || '#FFFFFF';
  const borderRadius = data.style?.borderRadius != null ? `${data.style.borderRadius}px` : '8px';
  const boxShadow = data.style?.boxShadow && data.style.boxShadow !== 'none' ? data.style.boxShadow : '0 4px 16px rgba(0,0,0,0.08)';

  return (
    <Paper
      elevation={0}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        backgroundColor,
        borderRadius,
        boxShadow,
        padding: 3,
        boxSizing: 'border-box',
      }}
    >
      {data.title && (
        <Typography
          variant="h6"
          fontWeight={700}
          textAlign="center"
          marginBottom={2.5}
        >
          {data.title}
        </Typography>
      )}

      <Stack spacing={2}>
        {(data.fields || []).map((field) => {
          if (field.type === 'checkbox') {
            return (
              <FormControlLabel
                key={field.id}
                control={
                  <Checkbox
                    checked={Boolean(formData[field.id])}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.id]: e.target.checked,
                      }))
                    }
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {field.label} {field.required && <span style={{ color: '#EF4444' }}>*</span>}
                  </Typography>
                }
              />
            );
          }

          return (
            <TextField
              key={field.id}
              size="small"
              fullWidth
              label={
                <span>
                  {field.label} {field.required && <span style={{ color: '#EF4444' }}>*</span>}
                </span>
              }
              placeholder={field.placeholder}
              type={field.type}
              value={(formData[field.id] as string) || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  [field.id]: e.target.value,
                }))
              }
            />
          );
        })}

        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          sx={{
            mt: 1,
            backgroundColor: '#0B74E2',
            fontWeight: 700,
            fontSize: 16,
            height: 48,
          }}
        >
          {data.buttonText || '신청하기'}
        </Button>
      </Stack>
    </Paper>
  );
}
