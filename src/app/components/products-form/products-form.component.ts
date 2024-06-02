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
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent {
    validateForm: FormGroup<{
    productName: FormControl<string>;
    descrition: FormControl<string>;
    stock: FormControl<string>;
    unitPrice: FormControl<string>;
  }>;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
        this.apiService.create(this.validateForm.value).subscribe(() => {
          this.createNotification('success', `${this.validateForm.value.productName} ${this.validateForm.value.productName}` ,"Employee has been created successfully!")
      this.validateForm.reset();
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
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
    this.validateForm = this.fb.group({
      productName: ['', [required]],
      descrition: ['', [required]],
      stock: ['', [required]],
      unitPrice: ['', [required]],
    });
  }
}

