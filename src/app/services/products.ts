import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Product, ProductsData } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly PRODUCTS_DATA_URL = '/data/products.json';

  // Estado
  allProducts = signal<Product[]>([]);   // Siempre contiene todo
  selectedCategory = signal<string>(''); // Categoría seleccionada
  loading = signal<boolean>(false);
  lastUpdate = signal<string>('');

  // Vista filtrada (se recalcula sola)
  products = computed(() => {
    const category = this.selectedCategory().toLowerCase();
    const items = this.allProducts();

    if (!category) return items; // Si no hay categoría, muestra todo

    return items.filter(p => p.category.toLowerCase() === category);
  });

  constructor(private http: HttpClient) {}

  init(): void {
    this.loadProductsData().subscribe();
  }

  loadProductsData(): Observable<ProductsData> {
    this.loading.set(true);

    return this.http.get<ProductsData>(this.PRODUCTS_DATA_URL).pipe(
      tap((data) => {
        this.allProducts.set(data.products);
        this.lastUpdate.set(data.lastUpdate);
      }),
      catchError(() => {
        const fallback = { lastUpdate: new Date().toISOString(), products: [] };
        this.allProducts.set(fallback.products);
        this.lastUpdate.set(fallback.lastUpdate);
        return of(fallback);
      }),
      tap(() => this.loading.set(false))
    );
  }

  refresh(): void {
    this.loadProductsData().subscribe();
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  getProductById(id: number): Product | undefined {
    return this.allProducts().find(p => p.id === id);
  }
  
}
