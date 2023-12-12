import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError } from "rxjs";
import { AuthenticateResponse } from "../_Auth/AuthenticateResponse";
import { API_URL_DEBUG } from "../constants/constants";
import { Wall } from "../_Models/wall";
import { UserWallProgress } from "../_Models/userWallProgress";

@Injectable({
    providedIn: 'root'
  })
  export class WallServiceService { 

    baseURL = API_URL_DEBUG;

    constructor(private http: HttpClient) { }

    getUser(){
      return JSON.parse(localStorage.getItem("user")!) as AuthenticateResponse;
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

    allWalls(): Observable<Wall[]>{
              
        var _url = this.baseURL + `/wall/all`;
        return this.http.get<Wall[]>(_url).pipe(catchError(async (err) => []));
    }

    getWall(wallId: string): Observable<Wall>{
      var _url = this.baseURL +  `/wall/${encodeURIComponent(wallId)}`;
      return this.http.get<Wall>(_url).pipe(catchError(async (err) => new Wall()));
    }

    markWallAsRemoved(id: string): Observable<boolean>{

      var requestOptions = this.generateRequestOptions();

      var _url = this.baseURL + `/wall/disable/` + id;
      return this.http.get<boolean>(_url, requestOptions).pipe(catchError(async (err) => false));
    }

    deleteWall(id: string): Observable<number>{

      var requestOptions = this.generateRequestOptions();

      var _url = this.baseURL + `/wall/remove/` + id;
      return this.http.get<number>(_url, requestOptions).pipe(catchError(async (err) => 0));
    }

    addWall(wall: Wall): Observable<Wall> {

      var requestOptions = this.generateRequestOptions();

      var _url = this.baseURL + '/wall/add';
      return this.http.post<Wall>(_url, wall, requestOptions).pipe(catchError(async (err) => new Wall));
    }

    editWall(wall: Wall): Observable<Wall> {

      var requestOptions = this.generateRequestOptions();

      var _url = this.baseURL + '/wall/modify';
      return this.http.post<Wall>(_url, wall, requestOptions).pipe(catchError(async (err) => new Wall));
    }

  }