import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Item, ItemDetail } from '../interface/item';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  #http = inject(HttpClient);
  item = signal<ItemDetail[]>([]);
  count = signal(0);
  scrollY = signal(0);
  lastIndex = signal(0);
  next = signal('');  

  constructor() { }

  getItem(next?: string) {
    const limit = 15;
    const offset = 0;

    const url = this.next() ? this.next() : `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`

    this.#http.get<Item>(url)
    .pipe(
      mergeMap(item => {
        const requests = item.results.map(result => this.#http.get<ItemDetail>(result.url).pipe(
          map(detail => ({ ...detail, imageUrl: detail.sprites.other['official-artwork'].front_default }))
        ));
        return forkJoin(requests).pipe(
          map(details => ({ ...item, details }))
        );
      })
    ).subscribe((res) => {
      this.count.update(() => res.count);
      this.lastIndex.update(lastIndex => lastIndex + res.details.length);
      this.next.update(() => res.next ? res.next : '');
      this.item.update(i => {
        return [...i, ...res.details];
      });
    });

  }

}

