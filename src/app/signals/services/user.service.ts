import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SingleUserReponse, User } from '../interfaces/user-interface';
import { Observable, map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly httpClient = inject(HttpClient);
  private baseUrl = 'https://reqres.in/api/users';

  getUserById(id: number): Observable<User> {

    return this.httpClient.get<SingleUserReponse>(`${this.baseUrl}/${id}`)
      .pipe(
        map((response) => response.data),
        tap(console.log),
      );

  }
}
