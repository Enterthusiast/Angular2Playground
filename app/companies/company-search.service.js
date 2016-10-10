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
var http_1 = require('@angular/http');
var app_private_config_1 = require('../app.private-config');
var CompanySearchService = (function () {
    function CompanySearchService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(app_private_config_1.privateConfig.loginAndPassword)
        });
        this.companiesUrl = app_private_config_1.privateConfig.api.companies; // 'app/companies';  // URL to web api
    }
    CompanySearchService.prototype.search = function (term) {
        return this.http.get(this.companiesUrl + '?name=' + term, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var companies = response.json()._embedded.companies;
            companies.forEach(function (company) {
                company.id = company.uuid;
            });
            return companies;
        });
        // .catch(this.handleError);
    };
    CompanySearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompanySearchService);
    return CompanySearchService;
}());
exports.CompanySearchService = CompanySearchService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=company-search.service.js.map