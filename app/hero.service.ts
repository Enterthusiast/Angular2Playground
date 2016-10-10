import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { privateConfig } from './app.private-config';
import { Hero } from './hero';

@Injectable()
export class HeroService {

  private headers = new Headers({
    'Content-Type': 'application/json'
    , 'Authorization': 'Basic ' + btoa(privateConfig.loginAndPassword)
  });
  private heroesUrl = privateConfig.api.companies; // 'app/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl, {headers: this.headers})
               .toPromise()
               .then(function(response) {
                   let heroes = response.json()._embedded.companies;
                   heroes.forEach((hero: Hero) => {
                        hero.id = hero.uuid;
                   });
                   return heroes as Hero[];
               })
               .catch(this.handleError);
  }

  getHero(id: string): Promise<Hero> {
    return this.http.get(this.heroesUrl + '/' + id, {headers: this.headers})
        .toPromise()
        .then(function(response) {
            let hero = response.json() as Hero;
            hero.id = response.json().uuid;
            return hero;
        })
        .catch(this.handleError);
    //return this.getHeroes()
    //           .then(heroes => heroes.find(hero => hero.id === id));
  }

  delete(id: string): Promise<void> {
    let url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, { company: { name: name, status: 'ENA' } }, {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
      // todo don't modify the hero object
      delete hero._embedded;
      delete hero._links;
      delete hero.id;
      delete hero.uuid;
      delete hero.slug;
      delete hero.media_url;
      delete hero.updated_at;
      delete hero.updated_by;
      delete hero.created_at;
      delete hero.created_by;
      let postHero = hero;

    return this.http
      .put(url, { company: hero }, {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/