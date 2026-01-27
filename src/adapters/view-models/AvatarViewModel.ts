export interface AvatarViewModel {
  readonly src: string | null;
  readonly alt: string;
  readonly fallback: string | null;
  readonly size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  readonly shape: 'circle' | 'square';
  readonly ring: boolean;
  readonly status: 'online' | 'offline' | 'away' | 'busy' | null;
  readonly hasImage: boolean;
  readonly hasStatus: boolean;
  readonly styles: {
    readonly dimension: number;
    readonly fontSize: number;
    readonly borderRadius: number;
    readonly backgroundColor: string;
    readonly textColor: string;
    readonly ringColor: string;
  };
  readonly statusStyles?: {
    readonly color: string;
    readonly label: string;
  };
}
