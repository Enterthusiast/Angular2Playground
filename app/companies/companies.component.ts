import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { AppConfig } from '../app.config';

import { Company }                from './company';
import { CompanyService }         from './company.service';

@Component({
  selector: 'companies',
  templateUrl: AppConfig.repoPath.companies + '/companies.component.html',
  styleUrls:  [AppConfig.repoPath.companies + '/companies.component.css']
})
export class CompaniesComponent implements OnInit {
  heroes: Company[];
  selectedCompany: Company;

  constructor(
    private heroService: CompanyService,
    private router: Router) { }

  getCompanies(): void {
    this.heroService
        .getCompanies()
        .then(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedCompany = null;
      });
  }

  delete(hero: Company): void {
    this.heroService
        .delete(hero.id)
        .then(() => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedCompany === hero) { this.selectedCompany = null; }
        });
  }

  ngOnInit(): void {
    this.getCompanies();
  }

  onSelect(hero: Company): void {
    this.selectedCompany = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCompany.id]);
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/