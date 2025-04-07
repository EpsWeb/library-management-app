import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { combineLatest, first, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
  standalone: false
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;

  constructor(private route: ActivatedRoute, private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

      this.bookService.getBook(id)
      .pipe(
        first(),
        tap((book: Book) => this.book = book)
      )
      .subscribe()
  }

  onDelete() {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(this.book!.id).subscribe(() => {
        alert('Book deleted!');
        this.router.navigate(['/books']);
      });
    }
  }
  
  toggleCheckOut() {
    if (!this.book) return;
    const newStatus = !this.book.checkedOut;
    this.bookService.updateCheckedOut(this.book.id, newStatus).subscribe(updated => {
      this.book = updated;
    });
  }  
  
}
