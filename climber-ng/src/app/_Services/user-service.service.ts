import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { API_URL_DEBUG } from '../constants/constants';
import { AuthenticateRequest } from '../_Auth/AuthenticateRequest';
import { AuthenticateResponse } from '../_Auth/AuthenticateResponse';
import { User } from '../_Models/user';
import { RegisterRequest } from '../_Auth/RegisterRequest';
import { UpdateRequest } from '../_Auth/UpdateRequest';
import { UserWallProgress } from '../_Models/userWallProgress';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseURL = API_URL_DEBUG;

  constructor(private http: HttpClient) { }


  authenticate(username: string, password: string): Observable<AuthenticateResponse>{

    var body = new AuthenticateRequest();
    body.username = username;
    body.password = password;
    return this.http.post<AuthenticateResponse>(this.baseURL + "/users/authenticate", body);
  }

  register(registerModel: RegisterRequest){
    return this.http.post<RegisterRequest>(this.baseURL + "/users/register", registerModel);
  }

  requestPassword(email: string): Observable<boolean>{
    var _url = this.baseURL + `/users/resetPassword?email=${encodeURIComponent(email)}`;

    return this.http.get<boolean>(_url).pipe(catchError(async (err) => false));
  }

  resetPassword(token: string): Observable<boolean>{
    var _url = this.baseURL + `/users/reset?token=${encodeURIComponent(token)}`;

    return this.http.get<boolean>(_url).pipe(catchError(async (err) => false));
  }

  getUser(){
    return JSON.parse(localStorage.getItem("user")!) as AuthenticateResponse;
  }

  getUserFromDB(userId: number): Observable<User>{
    var _url = this.baseURL + `/users/${encodeURIComponent(userId)}`;
    var requestOptions = this.generateRequestOptions();

    return this.http.get<User>(_url, requestOptions).pipe(catchError(async (err) => err));
  }

  getName(userId: number): Observable<string>{
      var _url = this.baseURL + `/users/name?userId=${encodeURIComponent(userId)}`; 
      return this.http.get(_url, {responseType: 'text'}).pipe(catchError(async (err) => err));
  }

  generateRequestOptions(){
    var userData = this.getUser();
        
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.token}`
    });
    
    const requestOptions = { headers: headers };
    return requestOptions;
  }

  getAllUsers(): Observable<User[]>{

    var _url = this.baseURL + '/users';
    var requestOptions = this.generateRequestOptions();

    return this.http.get<User[]>(_url, requestOptions).pipe(catchError(async (err) => []));
  }

  getAllBuilders(): Observable<User[]>{
    var _url = this.baseURL + '/users/builderList';
    var requestOptions = this.generateRequestOptions();

    return this.http.get<User[]>(_url, requestOptions).pipe(catchError(async (err) => []));
  }

  validateLogin(): Observable<number>{
        var userData = this.getUser();
        if(userData != null){
          var _url = this.baseURL + `/users/validate?userId=${encodeURIComponent(userData.id)}&token=${encodeURIComponent(userData.token)}`;
          var requestOptions = this.generateRequestOptions();
  
          return this.http.get<number>(_url, requestOptions).pipe(catchError(async (err) => 0));
        } else {
          return new Observable<0>;
        }
  }

  getProgressList(userId: number): Observable<UserWallProgress[]>{
    var _url = this.baseURL + `/users/progress?userId=${encodeURIComponent(userId)}`; 
    var requestOptions = this.generateRequestOptions();

    return this.http.get<UserWallProgress[]>(_url, requestOptions).pipe(catchError(async (err) => []));
  }

  getProgressListForWall(wallId: string): Observable<UserWallProgress[]>{
    var _url = this.baseURL + `/users/progressForWall?wallId=${encodeURIComponent(wallId)}`; 
    var requestOptions = this.generateRequestOptions();

    return this.http.get<UserWallProgress[]>(_url, requestOptions).pipe(catchError(async (err) => []));
  }

  deleteProgress(id: string): Observable<boolean>{
    var _url = this.baseURL + `/users/deleteProgress?id=${encodeURIComponent(id)}`; 
    var requestOptions = this.generateRequestOptions();

    return this.http.get<boolean>(_url, requestOptions).pipe(catchError(async (err) => false));
  }

  updateProgress(progress: UserWallProgress): Observable<UserWallProgress> {
    var requestOptions = this.generateRequestOptions();

    var _url = this.baseURL + '/users/progress';
    return this.http.post<UserWallProgress>(_url, progress, requestOptions).pipe(catchError(async (err) => new UserWallProgress));
  }

  updateProgressList(progressList: UserWallProgress[]): Observable<UserWallProgress[]>{
    var requestOptions = this.generateRequestOptions();

    var _url = this.baseURL + '/users/progressList';
    return this.http.post<UserWallProgress[]>(_url, progressList, requestOptions).pipe(catchError(async (err) => []));
  }
  
  updatePassword(updateRequest: UpdateRequest): Observable<UpdateRequest | HttpErrorResponse | boolean>{
    if(localStorage.getItem("user") != null || undefined){
   
      var _url = this.baseURL + `/users/updatePassword`;
      var requestOptions = this.generateRequestOptions();

      return this.http.post<UpdateRequest>(_url, updateRequest, requestOptions).pipe(catchError(async (err) => err));
    } else { 
      return new Observable<UpdateRequest>;
    }
  }

  isAdmin(): Observable<boolean>{
    if(localStorage.getItem("user") != null || undefined){
      var userData = this.getUser();
    
      var _url = this.baseURL + `/users/isAdmin?userId=${encodeURIComponent(userData.id)}`;
      var requestOptions = this.generateRequestOptions();

      return this.http.get<boolean>(_url, requestOptions).pipe(catchError(async (err) => false));
    } else {
      return new Observable<false>;
    }
  }

  addBuilder(username: string): Observable<User | HttpErrorResponse>{
    
      var _url = this.baseURL + `/users/enableBuilder?username=${encodeURIComponent(username)}`;
      var requestOptions = this.generateRequestOptions();

      return this.http.get<User>(_url, requestOptions).pipe(catchError(async (err) => err));
  }

  isBuilder(): Observable<boolean>{
    if(localStorage.getItem("user") != null || undefined){
      var userData = this.getUser();
    
      var _url = this.baseURL + `/users/isBuilder?userId=${encodeURIComponent(userData.id)}`;
      var requestOptions = this.generateRequestOptions();

      return this.http.get<boolean>(_url, requestOptions).pipe(catchError(async (err) => false));
    } else {
      return new Observable<false>;
    }
  }
}