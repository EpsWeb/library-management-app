import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  standalone: false
})
export class BookFormComponent implements OnInit {
  bookForm: FormGroup;

  editing = false;
  bookId!: string;

  constructor(private fb: FormBuilder, private bookService: BookService,
    private destroyRef: DestroyRef, private router: Router, private route: ActivatedRoute
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      publishedDate: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editing = true;
      this.bookId = idParam;
      this.bookService.getBook(this.bookId)
        .pipe(
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(book => {
          this.bookForm.patchValue(book);
        });
    }
  }

  onSubmit() {

    if (this.bookForm.valid) {
      const book = this.bookForm.value as Book;
      if (this.editing) {
        this.bookService.updateBook(this.bookId, book)
          .pipe(
            tap(() => alert('Book updated!')),
            tap(() => this.router.navigate(['books'])),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe();
      } else {
        this.bookService.createNewBook(this.bookForm.value as Book)
        .pipe(
            tap(() => alert('Book is created!')),
            tap(() => this.router.navigate(['books'])),
            takeUntilDestroyed(this.destroyRef)
        )
        .subscribe()
      }
    }
  }
}
