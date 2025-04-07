import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookFormComponent } from './book-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { of } from 'rxjs';

describe('BookFormComponent', () => {
  let component: BookFormComponent;
  let fixture: ComponentFixture<BookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [BookFormComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: BookService, useValue: {
          addBook: () => of({}),
          updateBook: () => of({}),
          getBook: () => of({ title: '', author: '', publishedDate: '', description: '', id: 1, checkedOut: false })
        }}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create form with 4 controls', () => {
    expect(component.bookForm.contains('title')).toBeTruthy();
    expect(component.bookForm.contains('author')).toBeTruthy();
    expect(component.bookForm.contains('publishedDate')).toBeTruthy();
    expect(component.bookForm.contains('description')).toBeTruthy();
  });
});
