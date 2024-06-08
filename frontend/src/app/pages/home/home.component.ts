import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/books.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books = [];

  constructor(
    private bookService: BookService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe({
      next: (res) => (this.books = res.data),
      error: (err) => this.toastr.error(err.message, 'Error'),
    });
  }
}
