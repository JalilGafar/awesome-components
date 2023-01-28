import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { ComplexFormService } from '../../services/complex-form.service';

@Component({
  selector: 'app-complex-form',
  templateUrl: './complex-form.component.html',
  styleUrls: ['./complex-form.component.scss']
})
export class ComplexFormComponent implements OnInit {

  loading = false;
  mainForm!: FormGroup;
  personalInfoForm!: FormGroup;
  contactPreferenceCtrl!: FormControl;
  phoneCtrl!: FormControl;
  
  emailCtrl!: FormControl;
  confirmEmailCtrl!: FormControl;
  emailForm!: FormGroup;

  passwordCtrl!: FormControl;
  confirmPasswordCtrl!: FormControl;
  loginInfoForm!: FormGroup;

  showEmailCtrl$!: Observable<boolean>;
  showPhoneCtrl$!: Observable<boolean>;

  constructor(private formBuilder: FormBuilder,
              private complexFormService : ComplexFormService
    ) { }

  ngOnInit(): void {
    this.initFormControls();
    this.initMainForm();
    this.initFormObservables();
  }

  private initFormControls(): void {
    this.personalInfoForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
    this.contactPreferenceCtrl = this.formBuilder.control('email');
    this.phoneCtrl = this.formBuilder.control('');

    this.emailCtrl = this.formBuilder.control('');
    this.confirmEmailCtrl = this.formBuilder.control('');
    this.emailForm = this.formBuilder.group({
      email: this.emailCtrl,
      confirm: this.confirmEmailCtrl
    })

    this.passwordCtrl = this.formBuilder.control('', Validators.required);
    this.confirmPasswordCtrl = this.formBuilder.control('', Validators.required);
    this.loginInfoForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    });
  }

  private initMainForm(): void {
    this.mainForm = this.formBuilder.group({
      personalInfo: this.personalInfoForm,
      contactPreference: this.contactPreferenceCtrl,
      email: this.emailForm,
      phone: this.phoneCtrl,
      loginInfo: this.loginInfoForm
    })
  }

  private initFormObservables() {
    this.showEmailCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map( preference => preference === 'email'  ),
      tap(showEmailCtrl$ => this.setEmailValidators(showEmailCtrl$))
    ) ;

    this.showPhoneCtrl$ = this.contactPreferenceCtrl.valueChanges.pipe(
      startWith(this.contactPreferenceCtrl.value),
      map(preference => preference === 'phone'),
      tap(showPhoneCtrl$ => this.setphoneValidators(showPhoneCtrl$))
    )
  }

  private setphoneValidators (showPhoneCtrl$ : boolean) {
    if (showPhoneCtrl$) {
      //ajout de require
      this.phoneCtrl.addValidators([Validators.required, Validators.minLength(7), Validators.maxLength(7)]);
    }else {
      // supression des requires
      this.phoneCtrl.clearValidators();
    }
    this.phoneCtrl.updateValueAndValidity();
  };

  private setEmailValidators (showEmailCtrl$ : boolean) {
    if (showEmailCtrl$) {
      this.emailCtrl.addValidators([Validators.required, Validators.email]);
      this.confirmEmailCtrl.addValidators([Validators.required, Validators.email]);

    }else {
      this.emailCtrl.clearValidators();
      this.confirmEmailCtrl.clearValidators();
    }
    this.emailCtrl.updateValueAndValidity();
    this.confirmEmailCtrl.updateValueAndValidity();
  };

  onSubmitForm(){
    this.loading = true;
    this.complexFormService.saveUserInfo(this.mainForm.value).pipe(
      tap(saved => {
        this.loading = false;
        if (saved) {
          this.mainForm.reset();
          this.contactPreferenceCtrl.patchValue('email');
        } else {
          console.log('echeque de l\'enregistrement !')
        }
      })
    ).subscribe()
  };

  getControlErrorText (ctrl:AbstractControl) {
    if (ctrl.hasError('required')) {
      return 'Ce champ est requis !';
    }else {
      return 'Ce champ contient une erreur !'
    }
  }

}
