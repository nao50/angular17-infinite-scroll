import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Item, ItemDetail } from '../interface/item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #http = inject(HttpClient);

  constructor() { }

  // getItem(){
  //   const limit = 10;
  //   const offset = 0;

  //   return this.#http.get<Item>('https://pokeapi.co/api/v2/pokemon/?' + `limit=${limit}&offset=${offset}`).subscribe((res) => {
  //     res.results.map(result => {
  //       return this.#http.get<ItemDetail>(result.url)
  //     });
  //   })


  //   // return await fetch('https://pokeapi.co/api/v2/pokemon/?' + `limit=${limit}&offset=${offset}`, {
  //   //   method: 'GET',
  //   // })
  // }

  getItem(): Observable<Item & { details: ItemDetail[] }> {
    const limit = 10;
    const offset = 0;

    return this.#http.get<Item>(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      .pipe(
        mergeMap(item => {
          const requests = item.results.map(result => this.#http.get<ItemDetail>(result.url).pipe(
            map(detail => ({ ...detail, imageUrl: detail.sprites.other['official-artwork'].front_default }))
          ));
          // const requests = item.results.map(result => this.#http.get<ItemDetail>(result.url));
          return forkJoin(requests).pipe(
            map(details => ({ ...item, details }))
          );
        })
      );
  }

  //       imageUrl: json['sprites']['other']['official-artwork']['front_default'],
}

