import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { AppConfig } from '../app.config';

import { Company }        from './company';
import { CompanyService } from './company.service';

@Component({
  selector: 'companies-detail',
  templateUrl: AppConfig.repoPath.companies + '/company-detail.component.html',
  styleUrls: [AppConfig.repoPath.companies + '/company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  company: Company;

  constructor(
    private companyService: CompanyService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.companyService.getCompany(id)
        .then(company => this.company = company);
    });
  }

  save(): void {
    this.companyService.update(this.company)
      .then(this.goBack);
  }

  goBack(): void {
    window.history.back();
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/