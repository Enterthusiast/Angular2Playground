import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { AppConfig } from '../app.config';

import { CompanySearchService } from './company-search.service';
import { Company } from './company';

@Component({
  selector: 'company-search',
  templateUrl: AppConfig.repoPath.companies + '/company-search.component.html',
  styleUrls:  [ AppConfig.repoPath.companies + '/company-search.component.css'],
  providers: [CompanySearchService]
})
export class CompanySearchComponent implements OnInit {
  companies: Observable<Company[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private companySearchService: CompanySearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.companies = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.companySearchService.search(term)
        // or the observable of empty companies if no search term
        : Observable.of<Company[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Company[]>([]);
      });
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