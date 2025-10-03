import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DoacaoService {
  private apiUrl = 'http://localhost:3000/api/doacao'; // backend

  constructor(private http: HttpClient) {}

  doar(valor: number, email: string) {
    return this.http.post<{ url: string }>(this.apiUrl, {
      valor,
      descricao: 'Doação FaculRide',
      email
    });
  }
}
