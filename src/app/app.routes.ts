import { Router, Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contact } from './pages/contact/contact';
import { Products } from './pages/products/products';

export const routes: Routes = [
    {path: '',  component: Home},
    {path: 'about',  component: Home},
    {path: 'contact',  component: Contact},
    {path: 'products',  component: Products},
    {path: '**',  redirectTo: ''},
];
