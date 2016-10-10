import { Injectable }     from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { privateConfig } from '../app.private-config';

import { Company }           from './company';

@Injectable()
export class CompanySearchService {

  private headers = new Headers({
    'Content-Type': 'application/json'
    , 'Authorization': 'Basic ' + btoa(privateConfig.loginAndPassword)
  });
  private companiesUrl = privateConfig.api.companies; // 'app/companies';  // URL to web api

  constructor(private http: Http) {}

  search(term: string): Promise<Company[]> {
    return this.http.get(this.companiesUrl + '?name=' + term, {headers: this.headers})
        .toPromise()
        .then(function(response) {
          let companies = response.json()._embedded.companies;
          companies.forEach((company: Company) => {
            company.id = company.uuid;
          });
          return companies as Company[];
        });
        // .catch(this.handleError);

  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/