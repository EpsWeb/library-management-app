import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { Book } from '../models/book.model';

describe('BookService', () => {
  let service: BookService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    http = TestBed.inject(HttpTestingController);
  });

  it('should fetch all books', () => {
    const mockBooks: Book[] = [
      { id: '1', title: '1984', author: 'Orwell', publishedDate: '1949', description: 'Dystopian', checkedOut: false }
    ];

    service.getBooks().subscribe(books => {
      expect(books.length).toBe(1);
      expect(books).toEqual(mockBooks);
    });

    const req = http.expectOne('http://localhost:3000/books');
    expect(req.request.method).toBe('GET');
    req.flush(mockBooks);
  });

  afterEach(() => {
    http.verify();
  });
});
