'use client';

import { useCallback, useEffect, useState } from 'react';

import { Data } from '@/types/block';

export function useHistory(initialPresent: Data[], onStateChange?: (state: Data[]) => void) {
  const [past, setPast] = useState<Data[][]>([]);
  const [present, setPresent] = useState<Data[]>(initialPresent);
  const [future, setFuture] = useState<Data[][]>([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const undo = useCallback(() => {
    if (!canUndo) return;

    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);

    setPast(newPast);
    setFuture([present, ...future]);
    setPresent(previous);
    onStateChange?.(previous);
  }, [canUndo, past, present, future, onStateChange]);

  const redo = useCallback(() => {
    if (!canRedo) return;

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
    onStateChange?.(next);
  }, [canRedo, past, present, future, onStateChange]);

  const set = useCallback(
    (newPresent: Data[], shouldRecordHistory: boolean = true) => {
      if (newPresent === present) return;

      if (shouldRecordHistory) {
        setPast((prevPast) => [...prevPast, present]);
        setFuture([]);
      }
      setPresent(newPresent);
      onStateChange?.(newPresent);
    },
    [present, onStateChange],
  );

  const resetHistory = useCallback(
    (newPresent: Data[]) => {
      setPast([]);
      setPresent(newPresent);
      setFuture([]);
      onStateChange?.(newPresent);
    },
    [onStateChange],
  );

  // 키보드 단축키 핸들러 (Cmd/Ctrl + Z, Cmd/Ctrl + Shift + Z, Cmd/Ctrl + Y)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 텍스트 인풋 중일 때는 기본 편집기 undo 동작 허용
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const isCmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (isCmdOrCtrl && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (isCmdOrCtrl && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  return {
    state: present,
    set,
    undo,
    redo,
    resetHistory,
    canUndo,
    canRedo,
  };
}
