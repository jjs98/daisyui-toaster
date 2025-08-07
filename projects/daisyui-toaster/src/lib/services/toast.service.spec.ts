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
    const config: ToastConfig = {
      zIndex: 1000,
      verticalPosition: ToastVerticalPosition.Top,
      horizontalPosition: ToastHorizontalPosition.End,
    };
    const service = new ToastService(config);
    expect(service.zIndex).toEqual(config.zIndex);
    expect(service.verticalPosition).toEqual(config.verticalPosition);
    expect(service.horizontalPosition).toEqual(config.horizontalPosition);
  });

  it('should initialize with given config', (): void => {
    const config: ToastConfig = {
      zIndex: 1000,
      verticalPosition: ToastVerticalPosition.Top,
      horizontalPosition: ToastHorizontalPosition.End,
    };
    const service = new ToastService(config);
    expect(service.zIndex).toEqual(config.zIndex);
    expect(service.verticalPosition).toEqual(config.verticalPosition);
    expect(service.horizontalPosition).toEqual(config.horizontalPosition);
  });
});
