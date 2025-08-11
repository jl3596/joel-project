import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../../services/category';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private router: Router, private categoryState: Category) {}

  goToCategory(cat: string) {
    this.categoryState.setCategory(cat);
    this.router.navigate(['/products']);
  }
}
