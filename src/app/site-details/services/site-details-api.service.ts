import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteDetailsApiService {

  constructor(private httpClient: HttpClient) {
  }

  getSiteDetails(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/sites');
  }

  postSiteDetails(siteDetails): Observable<any> {
    return this.httpClient.post('http://localhost:3000/sites', siteDetails);

  }
}
