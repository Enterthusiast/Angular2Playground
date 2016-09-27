import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Config } from '../config';

import { Company } from './company';

@Injectable()
export class CompanyService {

  private headers = new Headers({
    'Content-Type': 'application/json'
    , 'Authorization': 'Basic ' + btoa(Config.loginAndPassword)
  });
  private companiesUrl = Config.api.companies; // 'app/companies';  // URL to web api

  constructor(private http: Http) { }

  getCompanies(): Promise<Company[]> {
    return this.http.get(this.companiesUrl, {headers: this.headers})
               .toPromise()
               .then(function(response) {
                   let companies = response.json()._embedded.companies;
                   companies.forEach((company: Company) => {
                        company.id = company.uuid;
                   });
                   return companies as Company[];
               })
               .catch(this.handleError);
  }

  getCompany(id: string): Promise<Company> {
    return this.http.get(this.companiesUrl + '/' + id, {headers: this.headers})
        .toPromise()
        .then(function(response) {
            let company = response.json() as Company;
            company.id = response.json().uuid;
            return company;
        })
        .catch(this.handleError);
    //return this.getCompanies()
    //           .then(companies => companies.find(company => company.id === id));
  }

  delete(id: string): Promise<void> {
    let url = `${this.companiesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Company> {
    return this.http
      .post(this.companiesUrl, { company: { name: name, status: 'ENA' } }, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(company: Company): Promise<Company> {
    const url = `${this.companiesUrl}/${company.id}`;
      // todo don't modify the company object
      delete company._embedded;
      delete company._links;
      delete company.id;
      delete company.uuid;
      delete company.slug;
      delete company.media_url;
      delete company.updated_at;
      delete company.updated_by;
      delete company.created_at;
      delete company.created_by;
      let postCompany = company;

    return this.http
      .put(url, { company: company }, {headers: this.headers})
      .toPromise()
      .then(() => company)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/