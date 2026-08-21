'use client';

import { Add, DeleteOutline } from '@mui/icons-material';
import { Button, Divider, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';
import { useColor } from 'react-color-palette';

import ColorPicker from '@/components/ColorPicker';
import { Data, FormField } from '@/types/block';

export interface FormControlProps {
  data: Omit<Extract<Data, { type: 'form' }>, 'type'>;
  onChangeData(data: Omit<Extract<Data, { type: 'form' }>, 'type'>): void;
}

export default function FormControl({ data, onChangeData }: FormControlProps) {
  const [bgColor, setBgColor] = useColor(data.style?.backgroundColor || '#FFFFFF');

  const handleAddField = () => {
    const newField: FormField = {
      id: String(Date.now()),
      label: '새 입력 항목',
      placeholder: '내용을 입력하세요',
      type: 'text',
      required: false,
    };
    onChangeData({
      ...data,
      fields: [...(data.fields || []), newField],
    });
  };

  const handleUpdateField = (id: string, updated: Partial<FormField>) => {
    onChangeData({
      ...data,
      fields: (data.fields || []).map((f) => (f.id === id ? { ...f, ...updated } : f)),
    });
  };

  const handleDeleteField = (id: string) => {
    onChangeData({
      ...data,
      fields: (data.fields || []).filter((f) => f.id !== id),
    });
  };

  return (
    <>
      <Grid padding={2}>
        <Typography
          variant="h5"
          fontWeight={700}
        >
          📝 이벤트 응모 & 사전예약 폼
        </Typography>
      </Grid>

      {/* 기본 정보 설정 */}
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          폼 기본 설정
        </Typography>
        <TextField
          size="small"
          label="폼 제목"
          value={data.title || ''}
          onChange={(e) => onChangeData({ ...data, title: e.target.value })}
        />
        <TextField
          size="small"
          label="제출 버튼 문구"
          value={data.buttonText || '신청하기'}
          onChange={(e) => onChangeData({ ...data, buttonText: e.target.value })}
        />
        <TextField
          size="small"
          label="제출 완료 알림 메시지"
          value={data.successMessage || '신청이 완료되었습니다!'}
          onChange={(e) => onChangeData({ ...data, successMessage: e.target.value })}
        />
      </Stack>

      <Divider />

      {/* 수집 필드 관리 */}
      <Stack
        gap={2}
        padding={2}
      >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            수집할 입력 항목
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<Add />}
            onClick={handleAddField}
          >
            항목 추가
          </Button>
        </Grid>

        {(data.fields || []).map((field, idx) => (
          <Stack
            key={field.id || idx}
            gap={1}
            padding={1.5}
            border="1px solid #E0E0E0"
            borderRadius={2}
            bgcolor="#FAFAFA"
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                fontWeight={700}
              >
                항목 #{idx + 1}
              </Typography>
              <IconButton
                size="small"
                onClick={() => handleDeleteField(field.id)}
                sx={{ color: 'error.main' }}
              >
                <DeleteOutline fontSize="small" />
              </IconButton>
            </Grid>

            <Grid
              container
              gap={1}
            >
              <TextField
                size="small"
                label="라벨"
                value={field.label}
                onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                sx={{ flex: 2 }}
              />
              <Select
                size="small"
                value={field.type}
                onChange={(e) =>
                  handleUpdateField(field.id, {
                    type: e.target.value as FormField['type'],
                  })
                }
                sx={{ flex: 1.5 }}
              >
                <MenuItem value="text">텍스트</MenuItem>
                <MenuItem value="tel">전화번호</MenuItem>
                <MenuItem value="email">이메일</MenuItem>
                <MenuItem value="checkbox">동의 체크박스</MenuItem>
              </Select>
            </Grid>

            {field.type !== 'checkbox' && (
              <TextField
                size="small"
                label="플레이스홀더"
                value={field.placeholder}
                onChange={(e) => handleUpdateField(field.id, { placeholder: e.target.value })}
              />
            )}

            <Select
              size="small"
              value={field.required ? 'required' : 'optional'}
              onChange={(e) => handleUpdateField(field.id, { required: e.target.value === 'required' })}
            >
              <MenuItem value="required">필수 입력</MenuItem>
              <MenuItem value="optional">선택 입력</MenuItem>
            </Select>
          </Stack>
        ))}
      </Stack>

      <Divider />

      {/* 스타일 설정 */}
      <Stack
        gap={2}
        padding={2}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          스타일 설정
        </Typography>
        <Grid
          container
          gap={2}
        >
          <TextField
            label="모서리 둥글기"
            type="number"
            size="small"
            value={data.style?.borderRadius ?? 8}
            onChange={(e) => {
              onChangeData({
                ...data,
                style: {
                  ...data.style,
                  borderRadius: e.target.value !== '' ? +e.target.value : null,
                },
              });
            }}
            InputProps={{ endAdornment: 'px' }}
            sx={{ flex: 1 }}
          />
          <Select
            size="small"
            value={data.style?.boxShadow || '0 4px 16px rgba(0,0,0,0.08)'}
            onChange={(e) => {
              onChangeData({
                ...data,
                style: {
                  ...data.style,
                  boxShadow: e.target.value,
                },
              });
            }}
            sx={{ flex: 1 }}
          >
            <MenuItem value="none">그림자 없음</MenuItem>
            <MenuItem value="0 4px 16px rgba(0,0,0,0.08)">약한 그림자</MenuItem>
            <MenuItem value="0 8px 24px rgba(0,0,0,0.15)">보통 그림자</MenuItem>
          </Select>
        </Grid>

        <ColorPicker
          flex={1}
          label="배경 색상"
          colorValue={bgColor}
          onChangeColor={(c) => {
            setBgColor(c);
            onChangeData({
              ...data,
              style: { ...data.style, backgroundColor: c.hex },
            });
          }}
        />
      </Stack>
    </>
  );
}
