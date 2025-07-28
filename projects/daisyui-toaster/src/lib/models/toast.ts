export interface Toast {
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  duration?: number; // ms
  showClose?: boolean;
  closeOnClick?: boolean;
  callback?: () => void;
}

export interface ToastMessage extends Toast {
  id: number;
}

export enum ToastSeverity {
  Custom = 'custom',
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}
