import { signal } from '@angular/core';

import { Toast, ToastMessage } from '../models/toast';
import { ToastConfig } from '../models/toastconfig';

export class ToastService {
  public toasts = signal<ToastMessage[]>([]);
  public zIndex = 1000;
  public verticalPosition = 'top';
  public horizontalPosition = 'end';

  private idCounter = 0;

  public constructor(toastConfig?: ToastConfig) {
    if (toastConfig) {
      this.zIndex = toastConfig.zIndex ?? this.zIndex;
      this.verticalPosition =
        toastConfig.verticalPosition ?? this.verticalPosition;
      this.horizontalPosition =
        toastConfig.horizontalPosition ?? this.horizontalPosition;
    }
  }

  public add(config: Toast): void {
    const id = ++this.idCounter;
    const toast: ToastMessage = {
      id,
      severity: config.severity,
      summary: config.summary ?? '',
      detail: config.detail ?? '',
      duration: config.duration ?? 5000,
      showClose: config.showClose ?? true,
      closeOnClick: config.closeOnClick ?? false,
      callback: config.callback,
    };
    this.toasts.set([...this.toasts(), toast]);
    setTimeout((): void => this.remove(id), toast.duration);
  }

  public remove(id: number): void {
    this.toasts.set(this.toasts().filter((t): boolean => t.id !== id));
  }

  public clear(): void {
    this.toasts.set([]);
  }
}
