import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  DaisyUiToasterComponent,
  ToastService,
  ToastSeverity,
} from '../../../../dist/daisyui-toaster';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DaisyUiToasterComponent, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: [],
})
export class App {
  protected readonly toastService = inject(ToastService);
  protected readonly ToastSeverity = ToastSeverity;
  protected severity = ToastSeverity.Custom;
  protected summary = '';
  protected detail = '';
  protected duration = 3000;
  protected showClose = true;
  protected closeOnClick = true;

  protected sendClosableToast(): void {
    this.toastService.add({
      severity: ToastSeverity.Success,
      summary: 'Success',
      detail: 'This is a success toast!',
      duration: 5000,
      showClose: true,
      closeOnClick: true,
    });
  }

  protected sendAutocloseToast(): void {
    this.toastService.add({
      severity: ToastSeverity.Info,
      summary: 'Info',
      detail: 'This is an info toast that closes in 5 seconds!',
      duration: 5000,
      showClose: false,
      closeOnClick: false,
    });
  }

  protected sendCallbackToast(): void {
    this.toastService.add({
      severity: ToastSeverity.Success,
      summary: 'Success',
      detail: 'This is a success toast with a callback!',
      duration: 5000,
      showClose: true,
      closeOnClick: false,
      callback: (): void => {
        alert('Toast clicked!');
      },
    });
  }

  protected sendCustomToast(): void {
    this.toastService.add({
      severity: this.severity,
      summary: this.summary,
      detail: this.detail,
      duration: this.duration,
      showClose: this.showClose,
      closeOnClick: this.closeOnClick,
    });
  }
}
