import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Product, ProductsData } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Ruta correcta si lo pones en src/assets/products/products.json
  private readonly PRODUCTS_DATA_URL = '/data/products.json';

  // Signals
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  lastUpdate = signal<string>('');

  constructor(private http: HttpClient) {}

  /** Carga inicial, llamarlo desde el componente */
  init(): void {
    this.loadProductsData().subscribe();
  }

  /** Cargar datos desde el JSON */
  loadProductsData(): Observable<ProductsData> {
    this.loading.set(true);

    return this.http.get<ProductsData>(this.PRODUCTS_DATA_URL).pipe(
      tap((data: ProductsData) => {
        this.products.set(data.products);
        this.lastUpdate.set(data.lastUpdate);
      }),
      catchError((error) => {
        this.products.set([]);
        this.lastUpdate.set(new Date().toISOString());
        return of({
          lastUpdate: new Date().toISOString(),
          products: [],
        });
      }),
      tap(() => this.loading.set(false))
    );
  }

  /** Refrescar datos manualmente */
  refresh(): void {
    this.loadProductsData().subscribe();
  }

  /** Buscar por ID */
  getProductById(id: number): Product | undefined {
    return this.products().find(product => product.id === id);
  }
}
