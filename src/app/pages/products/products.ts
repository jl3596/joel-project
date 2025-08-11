import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private productService = inject(ProductService);

  readonly itemsPerPage = 8;
  currentPage = signal(1);

  // Ahora tomamos los productos del servicio directamente
  products = this.productService.products;

  totalProducts = computed(() => this.products().length);
  totalPages = computed(() => Math.ceil(this.totalProducts() / this.itemsPerPage));

  startIndex = computed(() => (this.currentPage() - 1) * this.itemsPerPage);
  endIndex = computed(() =>
    Math.min(this.startIndex() + this.itemsPerPage, this.totalProducts())
  );

  currentPagePosts = computed(() => {
    const start = this.startIndex();
    const end = this.endIndex();
    return this.products().slice(start, end);
  });

  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];

    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  });

  ngOnInit(): void {
    // Ahora inicializamos el servicio aquí (no en su constructor)
    this.productService.init();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onContinueReading(productId: number): void {
    console.log(`Continue reading product ${productId}`);
  }
}
