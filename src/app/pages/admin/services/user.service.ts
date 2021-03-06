import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { User } from '../../../shared/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  getAll():Observable<User[]>{
    return this.http
    .get<User[]>(`${environment.BASE_URL}/user`)
    .pipe(catchError(this.handlerError));
  }

  getById(userId:number):Observable<any>{
    return this.http.get<any>(`${environment.BASE_URL}/user/${userId}`)
  }

  new(user:User):Observable<User>{
    return this.http.post<any>(`${environment.BASE_URL}/user`,user)
    .pipe(catchError(this.handlerError));
  }

  update(userId:number, user:User):Observable<User>{
    return this.http.patch<any>(`${environment.BASE_URL}/user/${userId}`,user)
    .pipe(catchError(this.handlerError));
  }

  delete(userId:number):Observable<{}>{
    return this.http.delete<User>(`${environment.BASE_URL}/user/${userId}`)
    .pipe(catchError(this.handlerError));
  }

  handlerError(error:Error):Observable<never>{
    let errorMessage = 'Error desconocido';
    if(error){
        errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
