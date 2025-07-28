import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastService } from '../../services/toast.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'daisyui-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daisyui-toaster.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaisyUiToasterComponent {
  protected readonly toastService = inject(ToastService);

  protected remove(id: number): void {
    this.toastService.remove(id);
  }
}
