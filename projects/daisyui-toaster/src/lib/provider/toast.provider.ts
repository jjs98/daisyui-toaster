import { Provider, InjectionToken } from '@angular/core';

import { ToastConfig } from '../models/toastconfig';
import { ToastService } from '../services/toast.service';

export const TOAST_CONFIG = new InjectionToken<ToastConfig>('TOAST_CONFIG');

export function provideToastService(toastConfig?: ToastConfig): Provider[] {
  return [
    { provide: TOAST_CONFIG, useValue: toastConfig ?? {} },
    {
      provide: ToastService,
      useFactory: (config: ToastConfig): ToastService =>
        new ToastService(config),
      deps: [TOAST_CONFIG],
    },
  ];
}
