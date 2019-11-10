import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-filter-bar',
  templateUrl: './comment-filter-bar.component.html',
  styleUrls: ['./comment-filter-bar.component.scss']
})
export class CommentFilterBarComponent {
  @Input() tags: any;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  selectedTag: string;

  selectTag() {
    this.onSelect.emit(this.selectedTag);
  }

}
