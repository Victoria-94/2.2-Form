import { Component } from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzColDirective} from "ng-zorro-antd/grid";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
} from '@angular/forms';

import {NzDatePickerComponent} from "ng-zorro-antd/date-picker";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {ApiService} from "../../services/api.service";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";
import {NzNotificationService} from "ng-zorro-antd/notification";
import { Validators as MyValidators } from '@angular/forms';


@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzDatePickerComponent,
    NzButtonComponent,
    NzInputNumberComponent
  ],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css',
})
export class ProductsFormComponent {
    validateForm1: FormGroup<{
    productName: FormControl<string>;
    description: FormControl<string>;
    quantityInStock: FormControl<number>;
    unitPrice: FormControl<number>;
  }>;

  submitForm1(): void {
    if (this.validateForm1.valid) {
      console.log('submit', this.validateForm1.value);
        this.apiService.createProducts(this.validateForm1.value).subscribe(() => {
          this.createNotification('success', `${this.validateForm1.value.productName} ${this.validateForm1.value.description}`,"producto creado exitosamente")
      this.validateForm1.reset();
        }
      );
    } else {
      Object.values(this.validateForm1.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, title:string,  message: string): void {
    this.notification.create(
      type,
      title,message
    );
  }

  constructor(
    private fb: NonNullableFormBuilder,
  private apiService: ApiService,
    private notification: NzNotificationService
  ) {
    const { required } = MyValidators;
    this.validateForm1 = this.fb.group({
      productName: ['', [required]],
      description: ['', [required]],
      quantityInStock: [0, [required]],
      unitPrice: [0, [required]]
    });
  }
}

