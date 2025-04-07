import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Book } from '../models/book.model';
import { BaseApi } from '../core/base-api';

@Injectable({ providedIn: 'root' })
export class BookService extends BaseApi {
  private booksUrl = 'books';

  constructor(public override http: HttpClient) {
    super(http);
  }

    private _books: BehaviorSubject<Book[]> = new BehaviorSubject([]);

    
    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for filtered users
     */
    get books$(): Observable<Book[]> {
      return this._books.asObservable();
  }

  /**
     * Methods for books managing
     */

  getBooks(): Observable<Book[]> {
    return this.get(this.booksUrl).pipe(
      tap((books: Book[]) => this._books.next(books))
    )
  }

  createNewBook(book: Book): Observable<Book> {
    return this.post('books', book);
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(`http://localhost:3000/books/${id}`);
  }
  
  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>('http://localhost:3000/books', book);
  }
  
  updateBook(id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`http://localhost:3000/books/${id}`, book);
  }
  
  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:3000/books/${id}`);
  }

  updateCheckedOut(id: string, checkedOut: boolean): Observable<Book> {
    return this.http.patch<Book>(`http://localhost:3000/books/${id}`, { checkedOut });
  }
  
  
}
