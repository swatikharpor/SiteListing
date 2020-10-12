import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSiteComponent } from './add-new-site.component';

describe('AddNewSiteComponent', () => {
  let component: AddNewSiteComponent;
  let fixture: ComponentFixture<AddNewSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
