import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public baseUrl: string =  "https://reqres.in/api";

  constructor(private http: HttpClient) {}

  public obterTodos(page: number = 1) {
    return this.http.get(`${this.baseUrl}/users?page=${page}`);
  }
  
  public cadastrar(user: any) {
    return this.http.post(`${this.baseUrl}/users`, user);
  }

  public atualizar(id: number, user: any) {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  public buscarPorId(id: number) {
    return this.http.get(`${this.baseUrl}/users/${id}`);
  }

  public deletar(id: number) {
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
}
