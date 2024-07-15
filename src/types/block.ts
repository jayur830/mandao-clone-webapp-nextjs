import { CSSProperties } from 'react';

export type Data =
  | {
      type: 'block';
      style?: Partial<{
        flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
        justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
        alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
        gap: number | null;
        paddingTop: number | null;
        paddingRight: number | null;
        paddingBottom: number | null;
        paddingLeft: number | null;
      }>;
      children?: Data[];
    }
  | {
      type: 'image';
      src?: string;
      fullWidth?: boolean;
      style?: Partial<CSSProperties>;
    }
  | {
      type: 'video';
      src?: string;
      fullWidth?: boolean;
      style?: Partial<CSSProperties>;
    }
  | {
      type: 'carousel';
      items: Data[];
    }
  | {
      type: 'button';
      text: string;
      fullWidth?: boolean;
      style?: Partial<{
        fontSize: number;
        fontWeight: 100 | 300 | 400 | 500 | 600 | 700;
        color: string;
        backgroundColor: string;
        borderRadius: number | null;
        paddingTop: number;
        paddingRight: number;
        paddingBottom: number;
        paddingLeft: number;
      }>;
    };
