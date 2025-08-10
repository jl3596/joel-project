import { Component } from '@angular/core';
import { SafePipe } from '../../safe-pipe'; 

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [SafePipe],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map {
  loading = true;
  mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13896.587772197332!2d-76.9476135813079!3d-12.207729102814897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b95f1c46182f%3A0x31417858e84c6dc6!2sMunicipalidad%20de%20Villa%20El%20Salvador!5e0!3m2!1ses!2spe!4v1754788731430!5m2!1ses!2spe';

 ngOnInit() {
    // Seguridad: quitar loader aunque no se dispare load
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  onMapLoad(iframe: HTMLIFrameElement) {
    this.loading = false;
    iframe.style.opacity = '1'; // Activa el fade-in del mapa
  }
}
