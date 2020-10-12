import { Component, OnInit } from '@angular/core';
import {SideNavService} from './service/side-nav.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  activeNavigation: string ;

  constructor(private sideNavService: SideNavService) { }

  ngOnInit(): void {
    this.sideNavService.activeNavigation.subscribe((res) => this.activeNavigation = res);
  }

}
