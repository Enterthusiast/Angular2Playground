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
var config_1 = require('./config');
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
        this.headers = new http_1.Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(config_1.AppConfig.loginAndPassword)
        });
        this.heroesUrl = 'http://dev-api.origami-company.avengersleague.com/companies'; // 'app/heroes';  // URL to web api
    }
    HeroService.prototype.getHeroes = function () {
        return this.http.get(this.heroesUrl, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var heroes = response.json()._embedded.companies;
            heroes.forEach(function (hero) {
                //hero.id = hero.uuid;
            });
            return heroes;
        })
            .catch(this.handleError);
    };
    HeroService.prototype.getHero = function (id) {
        return this.http.get(this.heroesUrl + '/' + id, { headers: this.headers })
            .toPromise()
            .then(function (response) {
            var hero = response.json();
            hero.id = response.json().uuid;
            return hero;
        })
            .catch(this.handleError);
        //return this.getHeroes()
        //           .then(heroes => heroes.find(hero => hero.id === id));
    };
    HeroService.prototype.delete = function (id) {
        var url = this.heroesUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    HeroService.prototype.create = function (name) {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    HeroService.prototype.update = function (hero) {
        var url = this.heroesUrl + "/" + hero.id;
        // todo don't modify the hero object
        //delete hero._embedded;
        //delete hero._links;
        //delete hero.id;
        //delete hero.uuid;
        //delete hero.slug;
        //delete hero.media_url;
        //delete hero.updated_at;
        //delete hero.updated_by;
        //delete hero.created_at;
        //delete hero.created_by;
        var postHero = hero;
        return this.http
            .put(url, { company: hero }, { headers: this.headers })
            .toPromise()
            .then(function () { return hero; })
            .catch(this.handleError);
    };
    HeroService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    HeroService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HeroService);
    return HeroService;
})();
exports.HeroService = HeroService;
/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/ 
//# sourceMappingURL=hero.service.js.map