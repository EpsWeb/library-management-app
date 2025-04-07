import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: false
})
export class SearchBarComponent {
  searchQuery = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchQuery);
  }
}
