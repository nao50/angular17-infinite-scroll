import { Component, EventEmitter, effect, input, OnInit, Output } from '@angular/core';
import { JsonPipe, NgOptimizedImage  } from '@angular/common';
import { Item, ItemDetail } from '../interface/item';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [JsonPipe, NgOptimizedImage],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  // @Input({required: true}) item!: ItemDetail;
  readonly item = input.required<ItemDetail>();
  @Output() loaded = new EventEmitter<number>();

  constructor() {
    effect(() => {
      this.loaded.emit(this.item().id);
    });
  }
}
