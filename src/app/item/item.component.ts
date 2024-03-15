import { Component, effect, input, output } from '@angular/core';
import { JsonPipe, NgOptimizedImage  } from '@angular/common';
import { ItemDetail } from '../interface/item';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [JsonPipe, NgOptimizedImage],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  readonly item = input.required<ItemDetail>();
  // @Output() loaded = new EventEmitter<number>();
  loaded = output<number>();

  constructor() {
    effect(() => {
      this.loaded.emit(this.item().id);
    });
  }
}
