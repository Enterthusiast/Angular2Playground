"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var Observable_1 = require('rxjs/Observable');
var Subject_1 = require('rxjs/Subject');
var app_config_1 = require('../app.config');
var company_search_service_1 = require('./company-search.service');
var CompanySearchComponent = (function () {
    function CompanySearchComponent(companySearchService, router) {
        this.companySearchService = companySearchService;
        this.router = router;
        this.searchTerms = new Subject_1.Subject();
    }
    // Push a search term into the observable stream.
    CompanySearchComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    CompanySearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companies = this.searchTerms
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) { return term // switch to new observable each time
            ? _this.companySearchService.search(term)
            : Observable_1.Observable.of([]); })
            .catch(function (error) {
            // TODO: real error handling
            console.log(error);
            return Observable_1.Observable.of([]);
        });
    };
    CompanySearchComponent.prototype.gotoDetail = function (company) {
        var link = ['/detail', company.id];
        this.router.navigate(link);
    };
    CompanySearchComponent = __decorate([
        core_1.Component({
            selector: 'company-search',
            templateUrl: app_config_1.AppConfig.repoPath.companies + '/company-search.component.html',
            styleUrls: [app_config_1.AppConfig.repoPath.companies + '/company-search.component.css'],
            providers: [company_search_service_1.CompanySearchService]
        }), 
        __metadata('design:paramtypes', [company_search_service_1.CompanySearchService, router_1.Router])
    ], CompanySearchComponent);
    return CompanySearchComponent;
}());
exports.CompanySearchComponent = CompanySearchComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=company-search.component.js.map