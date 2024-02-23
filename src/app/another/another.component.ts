import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-another',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './another.component.html',
  styleUrl: './another.component.scss'
})
export class AnotherComponent {
}
