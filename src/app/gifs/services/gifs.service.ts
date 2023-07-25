import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistoy: string[] = [];
  private apiKey: string = 'pL62X6fctZDAhMg4p2BWEd5VKUc2fEtE';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Local storage ready')
  }

  get tagsHistory() {
    return [...this._tagsHistoy];
  }

  private organizeHistory(tag: string) {

    tag.toLocaleLowerCase();

    if (this._tagsHistoy.includes(tag)) {
      this._tagsHistoy = this._tagsHistoy.filter((oldTag) => oldTag !== tag)
    }
    this._tagsHistoy.unshift(tag);
    this._tagsHistoy = this._tagsHistoy.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {

    localStorage.setItem('history', JSON.stringify(this._tagsHistoy));

  }

  private loadLocalStorage(): void {

    if (!localStorage.getItem('history')) return;
    this._tagsHistoy = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistoy.length === 0) return;
    this.searchTag(this._tagsHistoy[0]);
  }

  searchTag(tag: string): void {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)


    this.http.get<SearchResponse>(`${this.serviceURL}/search`, { params })
      .subscribe(resp => {

        this.gifList = resp.data;
        console.log({ gifs: this.gifList });
      });

    //const resp = await fetch('api.giphy.com/v1/gifs/search?api_key=pL62X6fctZDAhMg4p2BWEd5VKUc2fEtE&q=Valorant&limit=10');
    //const data = await resp.json();
    //console.log(data);
  }
}
