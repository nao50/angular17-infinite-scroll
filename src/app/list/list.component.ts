import { Component, OnInit, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ApiService } from '../service/api.service';
import { Item, ItemDetail } from '../interface/item';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [JsonPipe, ItemComponent],
  providers: [ApiService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  protected readonly item = signal<ItemDetail[]>([]);
  private total = 0;
  // protected readonly item = signal<Item & { details: ItemDetail[] }>({
  //   count: 0,
  //   results: [],
  //   details: []
  // });

  apiService = inject(ApiService);

  ngOnInit() {
    this.getItem()
  }

  getItem() {
    // const response = await this.apiService.getItem()
    // const item = await response.json();
    // console.log(item);
  
    this.apiService.getItem().subscribe((res) => {
      console.log('res: ', res)
      // this.item.update(i => {
      //   return [...i, ...i.details];
      // });
      this.item.set(res.details)
    })
  }

  loaded(id: number) {
    if (this.item().length < this.total && this.item().at(-2)?.id === id) {
      // this.getItem(this.questions().length / 5);
      this.getItem();
    }
  }

}
