import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  activeNavigation = new BehaviorSubject('siteDetails');
  constructor() { }
}
