import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
   private apiAuth = `${environment.apiUrl}/auth`;
   private apiUsuario = `${environment.apiUrl}/usuario`;;

  constructor(private http: HttpClient) {}

  // Login
  login(dados: { email: string; senha: string }): Observable<any> {
    return this.http.post<any>(`${this.apiAuth}/login`, dados).pipe(
      tap((res) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('usuario', JSON.stringify(res.usuario));
        }
      })
    );
  }

  // Listar usuários
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUsuario);
  }

  // Buscar usuário por ID
  getUsuarioPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUsuario}/${id}`);
  }

  // Deletar usuário
  deletarUsuario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUsuario}/${id}`);
  }
  // get quantidade
   getQuantidadePorTipo(): Observable<{ tipoUsuario: string, quantidade: number }[]> {
  const token = localStorage.getItem('token');
  const headers = {
    Authorization: `Bearer ${token}`
  };
  return this.http.get<{ tipoUsuario: string, quantidade: number }[]>(`${this.apiUsuario}/quantidadeTipo`, { headers });
}
}



