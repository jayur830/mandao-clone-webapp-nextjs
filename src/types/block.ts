export type Data =
  | {
      type: 'block';
      style?: Partial<{
        flexDirection: 'row' | 'column' | 'row-reverse' | 'column-reverse';
        justifyContent: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
        alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
        gap: number | null;
      }>;
      children?: Data[];
    }
  | {
      type: 'image';
      src?: string;
    }
  | {
      type: 'video';
      url?: string;
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
        borderRadius: number | null;
        paddingTop: number;
        paddingRight: number;
        paddingBottom: number;
        paddingLeft: number;
      }>;
    };
