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
require('rxjs/add/operator/toPromise');
var config_1 = require('../config');
var CompanyService = (function () {
    function CompanyService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(config_1.Config.loginAndPassword)
        });
        this.companiesUrl = config_1.Config.api.companies; // 'app/companies';  // URL to web api
    }
    CompanyService.prototype.getCompanies = function () {
        return this.http.get(this.companiesUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var companies = response.json()._embedded.companies;
            companies.forEach(function (company) {
                company.id = company.uuid;
            });
            return companies;
        })
            .catch(this.handleError);
    };
    CompanyService.prototype.getCompany = function (id) {
        return this.http.get(this.companiesUrl + '/' + id, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var company = response.json();
            company.id = response.json().uuid;
            return company;
        })
            .catch(this.handleError);
        //return this.getCompanies()
        //           .then(companies => companies.find(company => company.id === id));
    };
    CompanyService.prototype.delete = function (id) {
        var url = this.companiesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    CompanyService.prototype.create = function (name) {
        return this.http
            .post(this.companiesUrl, { company: { name: name, status: 'ENA' } }, { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    CompanyService.prototype.update = function (company) {
        var url = this.companiesUrl + "/" + company.id;
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
        var postCompany = company;
        return this.http
            .put(url, { company: company }, { headers: this.headers })
            .toPromise()
            .then(function () { return company; })
            .catch(this.handleError);
    };
    CompanyService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    CompanyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompanyService);
    return CompanyService;
}());
exports.CompanyService = CompanyService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=company.service.js.map