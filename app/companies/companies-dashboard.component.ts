import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AppConfig } from '../app.config';

import { Company }        from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'companies-dashboard',
  templateUrl: AppConfig.repoPath.companies + '/companies-dashboard.component.html',
  styleUrls: [AppConfig.repoPath.companies + '/companies-dashboard.component.css']
})
export class CompaniesDashboardComponent implements OnInit {
  companies: Company[] = [];

  constructor(
    private router: Router,
    private companyService: CompanyService) {
  }

  ngOnInit(): void {
    this.companyService.getCompanies()
      .then(companies => this.companies = companies.slice(0, 4));
  }

  gotoDetail(company: Company): void {
    let link = ['/detail', company.id];
    this.router.navigate(link);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/