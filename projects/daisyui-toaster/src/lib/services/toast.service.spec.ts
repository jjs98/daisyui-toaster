import { Toast, ToastSeverity } from '../models/toast';
import {
  ToastConfig,
  ToastHorizontalPosition,
  ToastVerticalPosition,
} from '../models/toastconfig';

import { ToastService } from './toast.service';

describe('ToastService', (): void => {
  it('should be created', (): void => {
    const service = new ToastService();
    expect(service).toBeTruthy();
  });

  it('should initialize with default values', (): void => {
    const service = new ToastService();
    expect(service.zIndex).toEqual(1000);
    expect(service.verticalPosition).toEqual(ToastVerticalPosition.Top);
    expect(service.horizontalPosition).toEqual(ToastHorizontalPosition.End);
    expect(service.defaultDuration).toEqual(5000);
    expect(service.defaultShowClose).toEqual(true);
    expect(service.defaultCloseOnClick).toEqual(false);
  });

  it('should initialize with given config', (): void => {
    const config: ToastConfig = {
      zIndex: 1000,
      verticalPosition: ToastVerticalPosition.Top,
      horizontalPosition: ToastHorizontalPosition.End,
      defaultDuration: 2000,
      defaultShowClose: false,
      defaultCloseOnClick: true,
    };
    const service = new ToastService(config);
    expect(service.zIndex).toEqual(config.zIndex);
    expect(service.verticalPosition).toEqual(config.verticalPosition);
    expect(service.horizontalPosition).toEqual(config.horizontalPosition);
    expect(service.defaultDuration).toEqual(config.defaultDuration);
    expect(service.defaultShowClose).toEqual(config.defaultShowClose);
    expect(service.defaultCloseOnClick).toEqual(config.defaultCloseOnClick);
  });

  it('should initialize with undefined config values', (): void => {
    const config: ToastConfig = {
      zIndex: undefined,
      verticalPosition: undefined,
      horizontalPosition: undefined,
      defaultDuration: undefined,
      defaultShowClose: undefined,
      defaultCloseOnClick: undefined,
    };
    const service = new ToastService(config);
    expect(service.zIndex).toEqual(1000);
    expect(service.verticalPosition).toEqual(ToastVerticalPosition.Top);
    expect(service.horizontalPosition).toEqual(ToastHorizontalPosition.End);
    expect(service.defaultDuration).toEqual(5000);
    expect(service.defaultShowClose).toEqual(true);
    expect(service.defaultCloseOnClick).toEqual(false);
  });

  describe('add', (): void => {
    it('should add a toast with default values', (): void => {
      const service = new ToastService();
      const toast: Toast = {};
      service.add(toast);
      const toasts = service.toasts();
      expect(toasts.length).toBe(1);
      expect(toasts[0].id).toEqual(1);
      expect(toasts[0].severity).toEqual(undefined);
      expect(toasts[0].summary).toEqual('');
      expect(toasts[0].detail).toEqual('');
      expect(toasts[0].duration).toEqual(5000);
      expect(toasts[0].showClose).toEqual(true);
      expect(toasts[0].closeOnClick).toEqual(false);
    });

    it('should add a toast with custom values', (): void => {
      const service = new ToastService();
      const toast: Toast = {
        severity: ToastSeverity.Success,
        summary: 'Test Toast',
        detail: 'This is a test toast',
        duration: 3000,
        showClose: false,
        closeOnClick: true,
      };
      service.add(toast);
      const toasts = service.toasts();
      expect(toasts.length).toBe(1);
      expect(toasts[0].id).toEqual(1);
      expect(toasts[0].severity).toEqual(toast.severity);
      expect(toasts[0].summary).toEqual(toast.summary);
      expect(toasts[0].detail).toEqual(toast.detail);
      expect(toasts[0].duration).toEqual(toast.duration);
      expect(toasts[0].showClose).toEqual(toast.showClose);
      expect(toasts[0].closeOnClick).toEqual(toast.closeOnClick);
    });

    it('should add a toast with custom config values', (): void => {
      const config: ToastConfig = {
        defaultDuration: 2000,
        defaultShowClose: false,
        defaultCloseOnClick: true,
      };
      const service = new ToastService(config);
      const toast: Toast = {};
      service.add(toast);
      const toasts = service.toasts();
      expect(toasts.length).toBe(1);
      expect(toasts[0].id).toEqual(1);
      expect(toasts[0].severity).toEqual(undefined);
      expect(toasts[0].summary).toEqual('');
      expect(toasts[0].detail).toEqual('');
      expect(toasts[0].duration).toEqual(2000);
      expect(toasts[0].showClose).toEqual(false);
      expect(toasts[0].closeOnClick).toEqual(true);
    });

    it('should increment id for each toast added', (): void => {
      const service = new ToastService();
      const toast: Toast = {};
      service.add(toast);
      service.add(toast);
      const toasts = service.toasts();
      expect(toasts.length).toBe(2);
      expect(toasts[0].id).toEqual(1);
      expect(toasts[1].id).toEqual(2);
    });

    it('should remove toast after duration', async (): Promise<void> => {
      const service = new ToastService();
      const toast: Toast = {
        duration: 50,
      };
      service.add(toast);
      await new Promise((r): NodeJS.Timeout => setTimeout(r, 100));
      const toasts = service.toasts();
      expect(toasts.length).toBe(0);
    });

    it('should not remove toast before duration', async (): Promise<void> => {
      const service = new ToastService();
      const toast: Toast = {
        duration: 100,
      };
      service.add(toast);
      await new Promise((r): NodeJS.Timeout => setTimeout(r, 50));
      const toasts = service.toasts();
      expect(toasts.length).toBe(1);
    });
  });

  describe('remove', (): void => {
    it('should remove a toast by id', (): void => {
      const service = new ToastService();
      const toast: Toast = {};
      service.add(toast);
      service.remove(1);
      const toasts = service.toasts();
      expect(toasts.length).toBe(0);
    });

    it('should not remove a toast if id is not found', (): void => {
      const service = new ToastService();
      const toast: Toast = {};
      service.add(toast);
      service.remove(2);
      const toasts = service.toasts();
      expect(toasts.length).toBe(1);
    });
  });

  describe('clear', (): void => {
    it('should clear all toasts', (): void => {
      const service = new ToastService();
      const toast: Toast = {};
      service.add(toast);
      service.clear();
      const toasts = service.toasts();
      expect(toasts.length).toBe(0);
    });
  });
});
