import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DoacaoService } from '../services/doacao.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html', 
  styleUrls: ['./footer.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class FooterComponent {
  constructor(private doacaoService: DoacaoService) {}

  doar() {
    // aqui você pode colocar valor fixo ou abrir um modal para escolher
    this.doacaoService.doar(15, 'teste@faculride.com').subscribe(res => {
      window.location.href = res.url; // redireciona para o checkout do Mercado Pago
    });
  }
}
