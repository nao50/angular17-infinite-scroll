import { Component, OnInit, AfterViewInit, inject, signal, computed, ViewChild, HostListener } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { ApiService } from '../service/api.service';
import { Item, ItemDetail } from '../interface/item';
import { ItemComponent } from '../item/item.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, ItemComponent],
  providers: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit, AfterViewInit {
  apiService = inject(ApiService);
  router = inject(Router);
  item = computed(() => this.apiService.item());
  count = computed(() => this.apiService.count());
  scrollY = computed(() => this.apiService.scrollY());
  lastIndex = computed(() => this.apiService.lastIndex());
  // viewportScroller = inject(ViewportScroller);
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.apiService.scrollY.update(() => window.scrollY);
  }

  ngOnInit() {
    if (this.item().length == 0) {
      this.apiService.scrollY.update(() => 0);
      this.getItem()
    }
  }

  ngAfterViewInit(): void {
    // this.viewportScroller.scrollToPosition([0, this.apiService.scrollY()]); 
    window.scrollTo(0, this.apiService.scrollY());
  }

  getItem(next?: string) {
    this.apiService.getItem();
  }

  loaded(id: number) {
    if ( this.lastIndex() < this.count() && this.item().at(-5)?.id === id) {
      this.getItem();
    }
  }

}
