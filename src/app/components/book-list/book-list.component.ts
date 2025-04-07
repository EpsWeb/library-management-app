import { Component, DestroyRef, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  standalone: false
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  filteredBooks: Book[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  sortKey: keyof Book = 'title';
  sortAsc = true;

  constructor(private bookService: BookService, private router: Router, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    this.bookService.getBooks()
    .pipe(
      tap(data => this.onGetBooks(data)),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe();
  }

  private onGetBooks(data) {
      this.books = data;
      this.applyFilter('');
  }

  applyFilter(query: string) {
    const lowerQuery = query.toLowerCase();
    this.filteredBooks = this.books
      .filter(book => book.title.toLowerCase().includes(lowerQuery))
      .sort((a, b) => {
        const valA = a[this.sortKey].toString().toLowerCase();
        const valB = b[this.sortKey].toString().toLowerCase();
        return (valA < valB ? -1 : 1) * (this.sortAsc ? 1 : -1);
      });
    this.currentPage = 1;
  }

  setSort(key: keyof Book) {
    if (this.sortKey === key) this.sortAsc = !this.sortAsc;
    else {
      this.sortKey = key;
      this.sortAsc = true;
    }
    this.applyFilter('');
  }

  viewBook(id: string) {
    this.router.navigate(['/books', id]);
  }

  addBook() {
    this.router.navigate(['/book/add']);
  }

  get pagedBooks(): Book[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredBooks.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.itemsPerPage);
  }

  changePage(step: number) {
    this.currentPage += step;
  }
}
