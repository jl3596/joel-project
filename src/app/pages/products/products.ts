import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/products';
import { Router } from '@angular/router';
import { Category } from '../../services/category';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  constructor(private router: Router, private categoryState: Category) {}
  categorias = [
    { nombre: 'Sports', activo: true },
    { nombre: 'Design', activo: false },
  ];

  oferta = {
    titulo: 'Ofertas',
    descripcion: 'En Tableros y Melaminas',
    img: 'https://via.placeholder.com/300x150',
  };

  private productService = inject(ProductService);

  readonly itemsPerPage = 8;
  currentPage = signal(1);

  products = this.productService.products;

  totalProducts = computed(() => this.products().length);
  totalPages = computed(() =>
    Math.ceil(this.totalProducts() / this.itemsPerPage)
  );

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

  ngOnInit() {
    const catFromService = this.categoryState.getCategory();
    if (catFromService) {
      this.filterByCategory(catFromService);
    } else {
      const categoriaActiva = this.categorias.find((c) => c.activo);
      if (categoriaActiva) this.filterByCategory(categoriaActiva.nombre);
    }

    // Inicializa productos **después** de establecer el filtro de categoría
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

  filterByCategory(cat: string) {
    this.categorias = this.categorias.map((c) => ({
      ...c,
      activo: c.nombre === cat,
    }));
    this.productService.setCategory(cat);
  }

  clearFilter() {
    this.productService.setCategory('');
  }
}
