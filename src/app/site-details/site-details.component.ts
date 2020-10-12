import {Component, OnInit} from '@angular/core';
import {SiteDetailsApiService} from './services/site-details-api.service';

@Component({
  selector: 'app-site-details',
  templateUrl: './site-details.component.html',
  styleUrls: ['./site-details.component.scss']
})
export class SiteDetailsComponent implements OnInit {
  searchTerm: string;

  constructor(private siteDetailsApiService: SiteDetailsApiService) {
  }

  domainList = [];
  initialDomainList = [];
  pageSize = 3;

  ngOnInit(): void {
    this.siteDetailsApiService.getSiteDetails().subscribe((res) => {
      this.domainList = this.initialDomainList = res;
    });
  }

  calculateUsedStoragePercentage(usedStorage: string, storage: string) {
    return usedStorage && storage ?
      (Number(usedStorage.slice(0, usedStorage.indexOf('g'))) / Number(storage.slice(0, storage.indexOf('g')))) * 100 : '';
  }

  getBackgroundImageValue(usedDomains: number, availableDomains: number) {
    if (usedDomains && availableDomains) {
      const usedDomainPercentage = ((usedDomains / availableDomains) * 100);
      const deg = (usedDomainPercentage / 100) * 360;
      if (usedDomainPercentage <= 180) {
        return 'linear-gradient(' + (90 + deg) + 'deg, #5B7CFD 50%, transparent 50%), linear-gradient(90deg, #ccc 50%, transparent 50%)';
      } else {
        return 'linear-gradient(' + (deg - 90) + 'deg, #5B7CFD 50%, transparent 50%), linear-gradient(90deg, #ccc 50%, transparent 50%)';
      }
    }
  }

  getVisitorRangeColor(monthlyVisitor: number) {
    switch (true) {
      case (0 <= monthlyVisitor && monthlyVisitor < 500) :
        return '#FFCF27';
      case (500 <= monthlyVisitor && monthlyVisitor < 1000) :
        return '#33CC86';
      case (1000 <= monthlyVisitor && monthlyVisitor < 2000) :
        return '#FFAE33';
      case (2000 <= monthlyVisitor && monthlyVisitor < 5000) :
        return '#E2A7f1';
      default:
        return '#4B68DB';
    }
  }

  getDomainTagClassName(domainTag: string) {
    if (!domainTag) {
      return '';
    }
    switch (domainTag.toLowerCase()) {
      case 'primary':
        return 'primary';
      case 'staging':
        return 'primary';
      case 'add on':
        return 'add-on';
      default:
        return '';
    }
  }

  calculateVisitorPercentage(monthlyVisitor: number, monthlyVisitorCapacity: number) {
    return (monthlyVisitor / monthlyVisitorCapacity) * 100;
  }

  openModal() {
    document.getElementById('add-new-site').style.display = 'block';
  }

  close() {
    document.getElementById('add-new-site').style.display = 'none';
  }

  submit(newSiteData) {
    this.siteDetailsApiService.postSiteDetails(newSiteData).subscribe(() => {
      location.reload();
    }, (() => document.getElementById('add-new-site').style.display = 'block'));
  }

  search() {
    this.domainList = [];
    this.initialDomainList.forEach((domain) => {
      if (domain.domain.includes(this.searchTerm)) {
        this.domainList.push(domain);
      } else {
        domain.subdomain.forEach((subDomain) => {
          if (subDomain.name.includes(this.searchTerm)) {
            const domainIndex = this.domainList.findIndex((filteredDomain) => filteredDomain.id === domain.id);
            if (domainIndex === -1) {
              const filteredDomain = Object.assign({}, domain);
              filteredDomain.subdomain = [subDomain];
              this.domainList.push(filteredDomain);
            } else {
              this.domainList[domainIndex].subdomain.push(subDomain);
            }
          }
        });
      }
    });
  }

  changePageSize(action: string) {
    if (action === 'inc') {
      this.pageSize = this.pageSize + 2;
    } else {
      this.pageSize = this.pageSize - 2;
    }
    this.domainList = this.initialDomainList.slice(0, this.pageSize - 1);
  }
}
