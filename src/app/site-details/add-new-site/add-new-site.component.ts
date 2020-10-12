import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-new-site',
  templateUrl: './add-new-site.component.html',
  styleUrls: ['./add-new-site.component.scss']
})
export class AddNewSiteComponent implements OnInit {
// tslint:disable-next-line:no-output-native
  @Output() closeEventEmitter = new EventEmitter<string>();
  @Output() submitEventEmitter = new EventEmitter<string>();
  siteDetailsForm: FormGroup;
  domainRegex = '^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)[A-Za-z]{2,6}';

  constructor() {
  }


  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.siteDetailsForm = new FormGroup({
      domain: new FormControl('', [Validators.required, Validators.pattern(this.domainRegex)]),
      storage: new FormControl('', Validators.required),
      subdomain: new FormArray([this.createSubDomainForm()]),
      monthlyVisitors: new FormControl('', Validators.required),
    });
  }

  submit() {
    if (this.siteDetailsForm.valid) {
      const lastIndex = this.siteDetailsForm.value.subdomain.length - 1;
      this.siteDetailsForm.value.subdomain[lastIndex] = this.siteDetailsForm.controls.subdomain['controls'][lastIndex].value;
      this.submitEventEmitter.emit(this.siteDetailsForm.value);
    }
  }

  close() {
    this.initializeForm();
    this.closeEventEmitter.emit('close');
  }

  private createSubDomainForm() {
    return new FormGroup({
      name: new FormControl('')
    });
  }

  addNewSubDomain() {
    this.siteDetailsForm.controls.subdomain['controls'].push(this.createSubDomainForm());
  }
}
