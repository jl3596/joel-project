import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-whatsapp-button',
  imports: [],
  templateUrl: './whatsapp-button.html',
  styleUrl: './whatsapp-button.css'
})
export class WhatsappButton {
  @Input() phoneNumber: string = '51949073543'; // Número por defecto
  @Input() message: string = 'Hola, me interesa tu servicio'; // Mensaje por defecto

    // Codificar el mensaje para URL
  encodeURI(message: string): string {
    return encodeURIComponent(message);
  }
}
