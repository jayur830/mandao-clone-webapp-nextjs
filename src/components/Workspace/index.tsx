'use client';

import { Paper } from '@mui/material';
import { useRef } from 'react';

import { MenuType } from '@/components/ComponentMenu';
import { Data } from '@/types/block';

import Block from './Block';

export interface WorkspaceProps {
  data: Data[];
  onChangeData(data: Data[]): void;
  breakpoint: 'desktop' | 'tablet' | 'mobile';
  selectedComponent: MenuType;
  selectedDataIndex?: number[] | null | undefined;
  onChangeSelectedDataIndex(value: number[]): void;
  onDeleteComponent?(dataIndex: number[]): void;
  zoom?: number;
}

const widthMap = {
  desktop: 1440,
  tablet: 996,
  mobile: 512,
};

function reorderArray<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function Workspace({ data, onChangeData, breakpoint, selectedComponent, selectedDataIndex, onChangeSelectedDataIndex, onDeleteComponent, zoom = 1 }: WorkspaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleReorder = (parentDataIndex: number[], fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0) return;

    if (parentDataIndex.length === 0) {
      if (toIndex >= data.length) return;
      onChangeData(reorderArray(data, fromIndex, toIndex));
      return;
    }

    function map(item: Data, i: number, current: number = 0): Data {
      if (i === parentDataIndex[current]) {
        if (item.type === 'block' && item.children) {
          if (current === parentDataIndex.length - 1) {
            if (toIndex >= item.children.length) return item;
            return {
              ...item,
              children: reorderArray(item.children, fromIndex, toIndex),
            };
          }

          return {
            ...item,
            children: item.children.map((child, j) => map(child, j, current + 1)),
          };
        }
        return item;
      }
      return item;
    }

    onChangeData(data.map((item, i) => map(item, i)));
  };

  const handleDelete = (dataIndex: number[]) => {
    if (onDeleteComponent) {
      onDeleteComponent(dataIndex);
      return;
    }

    if (dataIndex.every((index, i) => index === selectedDataIndex?.[i])) {
      onChangeSelectedDataIndex([]);
    }

    if (dataIndex.length === 1) {
      return onChangeData(data.filter((_, i) => i !== dataIndex[0]));
    }

    function map(item: Data, i: number, current: number = 0): Data {
      if (i === dataIndex[current]) {
        if (item.type === 'block' && item.children) {
          if (current === dataIndex.length - 2) {
            return {
              ...item,
              children: item.children.filter((_, j) => j !== dataIndex[current + 1]),
            };
          }

          return {
            ...item,
            children: item.children.map((child, j) => map(child, j, current + 1)),
          };
        }
        return item;
      }
      return item;
    }

    onChangeData(data.map((item, i) => map(item, i)));
  };

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: widthMap[breakpoint],
        transform: `scale(${zoom})`,
        transformOrigin: 'top center',
        transition: 'width 0.3s ease, transform 0.2s ease',
      }}
    >
      <Paper
        elevation={15}
        sx={{
          position: 'relative',
          height: 'fit-content',
        }}
        onClick={(e) => {
          e.stopPropagation();
          switch (selectedComponent) {
            case 'block':
              onChangeData([
                ...data,
                {
                  type: 'block',
                  fixPaddingHorizontal: true,
                  fixPaddingVertical: true,
                  style: {
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 0,
                    paddingRight: 0,
                    paddingBottom: 0,
                    paddingLeft: 0,
                  },
                },
              ]);
              break;
            case 'image':
              onChangeData([...data, { type: 'image', fullWidth: true }]);
              break;
            case 'video':
              onChangeData([...data, { type: 'video', fullWidth: true }]);
              break;
            case 'carousel':
              onChangeData([...data, { type: 'carousel', items: [] }]);
              break;
            case 'button':
              onChangeData([
                ...data,
                {
                  type: 'button',
                  text: '텍스트',
                  fullWidth: true,
                  style: {
                    backgroundColor: '#0B74E2',
                    color: '#FFFFFF',
                    borderRadius: 4,
                  },
                },
              ]);
              break;
            case 'text':
              onChangeData([
                ...data,
                {
                  type: 'text',
                  value: '텍스트',
                },
              ]);
              break;
          }
        }}
      >
        <Block
          selectedComponent={selectedComponent}
          onClick={(dataIndex) => {
            function recursive(state: Data[], index: number): Data[] {
              if (index < dataIndex.length) {
                return state.map((item, i) => {
                  if (i === dataIndex[index]) {
                    switch (item.type) {
                      case 'block':
                        return {
                          ...item,
                          children: recursive(item.children || [], index + 1),
                        };
                      default:
                        return item;
                    }
                  }

                  return item;
                });
              }

              switch (selectedComponent) {
                case 'block':
                  return [
                    ...state,
                    {
                      type: 'block',
                      fixPaddingHorizontal: true,
                      fixPaddingVertical: true,
                      style: {
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: 0,
                        paddingRight: 0,
                        paddingBottom: 0,
                        paddingLeft: 0,
                      },
                    },
                  ];
                case 'timer': {
                  // 기본 마감 시간을 현재 기준 3일 후로 설정
                  const d = new Date();
                  d.setDate(d.getDate() + 3);
                  d.setHours(23, 59, 0, 0);
                  const pad = (n: number) => String(n).padStart(2, '0');
                  const targetDateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

                  return [
                    ...state,
                    {
                      type: 'timer',
                      targetDate: targetDateStr,
                      label: '🔥 특가 마감까지 남은 시간',
                      style: {
                        fontSize: 18,
                        color: '#FFFFFF',
                        backgroundColor: '#1F1F1F',
                        borderRadius: 8,
                      },
                    },
                  ];
                }
                case 'form':
                  return [
                    ...state,
                    {
                      type: 'form',
                      title: '🎁 이벤트 응모 & 알림 신청',
                      fields: [
                        { id: '1', label: '이름', placeholder: '성함을 입력하세요', type: 'text', required: true },
                        { id: '2', label: '연락처', placeholder: '010-0000-0000', type: 'tel', required: true },
                        { id: '3', label: '개인정보 수집 및 활용에 동의합니다', placeholder: '', type: 'checkbox', required: true },
                      ],
                      buttonText: '신청하기',
                      successMessage: '이벤트 신청이 성공적으로 완료되었습니다!',
                      style: {
                        backgroundColor: '#FFFFFF',
                        borderRadius: 8,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                        padding: 24,
                      },
                    },
                  ];
                case 'image':
                  return [...state, { type: 'image', fullWidth: true }];
                case 'video':
                  return [...state, { type: 'video', fullWidth: true }];
                case 'carousel':
                  return [...state, { type: 'carousel', items: [] }];
                case 'button':
                  return [
                    ...state,
                    {
                      type: 'button',
                      text: '텍스트',
                      fullWidth: true,
                      style: {
                        backgroundColor: '#0B74E2',
                        color: '#FFFFFF',
                        borderRadius: 4,
                      },
                    },
                  ];
                case 'text':
                  return [
                    ...state,
                    {
                      type: 'text',
                      value: '텍스트',
                    },
                  ];
                default:
                  return state;
              }
            }
            onChangeData(recursive(data, 0));
          }}
          onSelect={(dataIndex) => {
            onChangeSelectedDataIndex(dataIndex);
          }}
          onDelete={handleDelete}
          onReorder={handleReorder}
          dataIndex={[]}
          childrenItems={data}
        />
      </Paper>
    </div>
  );
}
