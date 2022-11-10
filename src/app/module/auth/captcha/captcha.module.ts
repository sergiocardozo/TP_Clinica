import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaptchaComponent } from './captcha.component';



@NgModule({
  declarations: [ CaptchaComponent],
  imports: [
    CommonModule, FormsModule
  ], 
  exports: [ CaptchaComponent]
})
export class CaptchaModule { }
