import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  searchQuery: string = '';

  postLít = [
    {
      title: 'Post 1',
      content: 'This is the first post',
    },
    {
      title: 'Post 2',
      content: 'This is the, second post',
    },
  ];
}
