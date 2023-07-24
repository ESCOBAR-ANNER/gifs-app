import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private _tagsHistoy: string[] = [];
  private apiKey: string = 'pL62X6fctZDAhMg4p2BWEd5VKUc2fEtE';

  constructor() { }

  get tagsHistory() {
    return [...this._tagsHistoy];
  }

  private organizeHistory(tag: string) {

    tag.toLocaleLowerCase();

    if (this._tagsHistoy.includes(tag)) {
      this._tagsHistoy = this._tagsHistoy.filter((oldTag) => oldTag !== tag)
    }

    this._tagsHistoy = this._tagsHistoy.splice(0, 10);
  }

  async searchTag(tag: string): Promise<void> {

    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const resp = await fetch('api.giphy.com/v1/gifs/search?api_key=pL62X6fctZDAhMg4p2BWEd5VKUc2fEtE&q=Valorant&limit=10');
    const data = await resp.json();
    console.log(data);
  }
}
