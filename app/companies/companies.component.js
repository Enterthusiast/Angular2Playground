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
var CompaniesComponent = (function () {
    function CompaniesComponent(heroService, router) {
        this.heroService = heroService;
        this.router = router;
    }
    CompaniesComponent.prototype.getCompanies = function () {
        var _this = this;
        this.heroService
            .getCompanies()
            .then(function (heroes) { return _this.heroes = heroes; });
    };
    CompaniesComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.heroService.create(name)
            .then(function (hero) {
            _this.heroes.push(hero);
            _this.selectedCompany = null;
        });
    };
    CompaniesComponent.prototype.delete = function (hero) {
        var _this = this;
        this.heroService
            .delete(hero.id)
            .then(function () {
            _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
            if (_this.selectedCompany === hero) {
                _this.selectedCompany = null;
            }
        });
    };
    CompaniesComponent.prototype.ngOnInit = function () {
        this.getCompanies();
    };
    CompaniesComponent.prototype.onSelect = function (hero) {
        this.selectedCompany = hero;
    };
    CompaniesComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedCompany.id]);
    };
    CompaniesComponent = __decorate([
        core_1.Component({
            selector: 'companies',
            templateUrl: app_config_1.AppConfig.repoPath.companies + '/companies.component.html',
            styleUrls: [app_config_1.AppConfig.repoPath.companies + '/companies.component.css']
        }), 
        __metadata('design:paramtypes', [company_service_1.CompanyService, router_1.Router])
    ], CompaniesComponent);
    return CompaniesComponent;
}());
exports.CompaniesComponent = CompaniesComponent;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=companies.component.js.map