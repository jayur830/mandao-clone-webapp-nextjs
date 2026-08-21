'use client';

import { FileDownloadOutlined, FileUploadOutlined, RedoOutlined, RestartAltOutlined, UndoOutlined } from '@mui/icons-material';
import { AppBar, Button, Grid, IconButton, Snackbar, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { useCallback, useRef, useState } from 'react';

import ComponentMenu from '@/components/ComponentMenu';
import ControlMenu from '@/components/ControlMenu';
import PublishModal from '@/components/PublishModal';
import ResponsiveToolbar from '@/components/ResponsiveToolbar';
import Workspace from '@/components/Workspace';
import { useHistory } from '@/hooks/useHistory';
import { Data } from '@/types/block';

const STORAGE_KEY = 'mandao_builder_data';

export default function Page() {
  const [breakpoint, setBreakpoint] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedComponent, setSelectedComponent] = useState<'block' | 'image' | 'video' | 'carousel' | 'button' | 'text' | null | undefined>();
  const [selectedDataIndex, setSelectedDataIndex] = useState<number[]>();
  const [publishModalOpen, setPublishModalOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialData: Data[] = (() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load saved data:', e);
    }
    return [];
  })();

  const handleSaveToStorage = useCallback((newData: Data[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to auto-save data:', e);
    }
  }, []);

  const { state: data, set: handleDataChange, undo, redo, resetHistory, canUndo, canRedo } = useHistory(initialData, handleSaveToStorage);

  // JSON 파일로 내보내기 (Export)
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mandao-template-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setSnackbarMessage('JSON 파일로 내보내기가 완료되었습니다.');
  };

  // JSON 파일 불러오기 (Import)
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedData)) {
          resetHistory(importedData);
          setSelectedDataIndex(undefined);
          setSnackbarMessage('템플릿 데이터를 성공적으로 불러왔습니다.');
        } else {
          setSnackbarMessage('올바른 JSON 데이터 형식이 아닙니다.');
        }
      } catch (err) {
        console.error('Import error:', err);
        setSnackbarMessage('JSON 파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 초기화 (Reset)
  const handleReset = () => {
    if (window.confirm('작업 중인 모든 블록을 초기화하시겠습니까?')) {
      resetHistory([]);
      setSelectedDataIndex(undefined);
      setSnackbarMessage('초기화되었습니다.');
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: '#1F1F1F' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Grid
            container
            alignItems="flex-end"
            sx={{ width: 'auto' }}
          >
            <Typography
              fontSize={10}
              color="grey.400"
              sx={{ marginRight: 0.5 }}
            >
              300억
            </Typography>
            <Typography
              variant="h5"
              fontWeight={700}
            >
              만다오
            </Typography>
          </Grid>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Tooltip title="실행 취소 (Cmd/Ctrl + Z)">
              <span>
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={undo}
                  disabled={!canUndo}
                >
                  <UndoOutlined />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="다시 실행 (Cmd/Ctrl + Shift + Z)">
              <span>
                <IconButton
                  color="inherit"
                  size="small"
                  onClick={redo}
                  disabled={!canRedo}
                >
                  <RedoOutlined />
                </IconButton>
              </span>
            </Tooltip>

            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              style={{ display: 'none' }}
              onChange={handleImportJson}
            />
            <Tooltip title="JSON 파일 불러오기">
              <Button
                color="inherit"
                size="small"
                startIcon={<FileUploadOutlined />}
                onClick={() => fileInputRef.current?.click()}
                sx={{ textTransform: 'none' }}
              >
                불러오기
              </Button>
            </Tooltip>
            <Tooltip title="JSON 파일로 저장/내보내기">
              <Button
                color="inherit"
                size="small"
                startIcon={<FileDownloadOutlined />}
                onClick={handleExportJson}
                sx={{ textTransform: 'none' }}
              >
                저장하기
              </Button>
            </Tooltip>
            <Tooltip title="전체 초기화">
              <IconButton
                color="inherit"
                size="small"
                onClick={handleReset}
              >
                <RestartAltOutlined />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
      <Grid
        container
        height="calc(100% - 64px)"
        sx={{ backgroundColor: '#DDDDDD' }}
      >
        <ComponentMenu
          selectedMenu={selectedComponent}
          onChangeSelectedMenu={setSelectedComponent}
        />
        <Grid
          position="relative"
          container
          justifyContent="center"
          flex={1}
          height="100%"
          paddingX={3}
          paddingY={16}
          overflow="scroll"
          onClick={() => {
            setSelectedComponent(undefined);
          }}
        >
          <Grid
            position="fixed"
            top={90}
          >
            <ResponsiveToolbar
              breakpoint={breakpoint}
              onChangeBreakpoint={setBreakpoint}
            />
          </Grid>
          <Workspace
            data={data}
            onChangeData={handleDataChange}
            breakpoint={breakpoint}
            selectedComponent={selectedComponent}
            selectedDataIndex={selectedDataIndex}
            onChangeSelectedDataIndex={setSelectedDataIndex}
          />
        </Grid>
        <ControlMenu
          data={data}
          onChangeData={handleDataChange}
          selectedDataIndex={selectedDataIndex}
          onOpenPublish={() => setPublishModalOpen(true)}
        />
      </Grid>
      <PublishModal
        open={publishModalOpen}
        onClose={() => setPublishModalOpen(false)}
        data={data}
      />
      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}
