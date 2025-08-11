import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Category {
   private selectedCategory = signal<string | null>(null);

  setCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  getCategory(): string | null {
    return this.selectedCategory();
  }
}
