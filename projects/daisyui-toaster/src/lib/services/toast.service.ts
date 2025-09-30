import { signal } from '@angular/core';

import { Toast, ToastMessage } from '../models/toast';
import {
  ToastConfig,
  ToastHorizontalPosition,
  ToastVerticalPosition,
} from '../models/toastconfig';

export class ToastService {
  public toasts = signal<ToastMessage[]>([]);
  public zIndex = 1000;
  public verticalPosition = ToastVerticalPosition.Top;
  public horizontalPosition = ToastHorizontalPosition.Right;
  public topOffset = 20;
  public bottomOffset = 20;
  public leftOffset = 20;
  public rightOffset = 20;
  public defaultDuration = 5000;
  public defaultShowClose = true;
  public defaultCloseOnClick = false;
  public maxToasts = 5;

  private idCounter = 0;

  public constructor(toastConfig?: ToastConfig) {
    if (toastConfig) {
      this.zIndex = toastConfig.zIndex ?? this.zIndex;
      this.verticalPosition =
        toastConfig.verticalPosition ?? this.verticalPosition;
      this.horizontalPosition =
        toastConfig.horizontalPosition ?? this.horizontalPosition;
      this.defaultDuration =
        toastConfig.defaultDuration ?? this.defaultDuration;
      this.defaultShowClose =
        toastConfig.defaultShowClose ?? this.defaultShowClose;
      this.defaultCloseOnClick =
        toastConfig.defaultCloseOnClick ?? this.defaultCloseOnClick;
      this.maxToasts = toastConfig.maxToasts ?? this.maxToasts;
      this.topOffset = toastConfig.topOffset ?? this.topOffset;
      this.bottomOffset = toastConfig.bottomOffset ?? this.bottomOffset;
      this.leftOffset = toastConfig.leftOffset ?? this.leftOffset;
      this.rightOffset = toastConfig.rightOffset ?? this.rightOffset;
    }
  }

  public add(config: Toast): void {
    const id = ++this.idCounter;
    const toast: ToastMessage = {
      id,
      severity: config.severity,
      summary: config.summary ?? '',
      detail: config.detail ?? '',
      duration: config.duration ?? this.defaultDuration,
      showClose: config.showClose ?? this.defaultShowClose,
      closeOnClick: config.closeOnClick ?? this.defaultCloseOnClick,
      callback: config.callback,
    };

    let currentToasts = this.toasts().sort((a, b): number => a.id - b.id);
    if (currentToasts.length >= this.maxToasts) {
      currentToasts = currentToasts.slice(
        currentToasts.length - (this.maxToasts - 1)
      );
    }

    this.toasts.set([...currentToasts, toast]);
    setTimeout((): void => this.remove(id), toast.duration);
  }

  public remove(id: number): void {
    this.toasts.set(this.toasts().filter((t): boolean => t.id !== id));
  }

  public clear(): void {
    this.toasts.set([]);
  }
}
