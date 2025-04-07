import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookListComponent },
  { path: 'books/:id', component: BookDetailComponent },
  { path: 'book/add', component: BookFormComponent },
  { path: 'books/:id/edit', component: BookFormComponent }, // <--- добавлено
  { path: 'books/:id', component: BookDetailComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BookListComponent,
    BookDetailComponent,
    BookFormComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
