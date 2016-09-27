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
var app_config_1 = require('../app.config');
var company_service_1 = require('./company.service');
var CompaniesDashboardComponent = (function () {
    function CompaniesDashboardComponent(router, companyService) {
        this.router = router;
        this.companyService = companyService;
        this.companies = [];
    }
    CompaniesDashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyService.getCompanies()
            .then(function (companies) { return _this.companies = companies.slice(0, 4); });
    };
    CompaniesDashboardComponent.prototype.gotoDetail = function (company) {
        var link = ['/detail', company.id];
        this.router.navigate(link);
    };
    CompaniesDashboardComponent = __decorate([
        core_1.Component({
            selector: 'companies-dashboard',
            templateUrl: app_config_1.AppConfig.repoPath.companies + '/companies-dashboard.component.html',
            styleUrls: [app_config_1.AppConfig.repoPath.companies + '/companies-dashboard.component.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, company_service_1.CompanyService])
    ], CompaniesDashboardComponent);
    return CompaniesDashboardComponent;
}());
exports.CompaniesDashboardComponent = CompaniesDashboardComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=companies-dashboard.component.js.map