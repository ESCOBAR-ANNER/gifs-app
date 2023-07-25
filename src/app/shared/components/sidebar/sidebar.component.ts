import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'share-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private gifService: GifsService){
  }

  get tags(){

    return this.gifService.tagsHistory;
  }

  searchGifs(tag: string){
    this.gifService.searchTag(tag);
  }
}
