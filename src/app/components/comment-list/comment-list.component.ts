import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {

  @Input() commentList: Array<any>;
  @Input() tagList: Array<any>;
  @Output() onEditComment: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteComment: EventEmitter<any> = new EventEmitter();

  saveComment(data) {
    this.onEditComment.emit(data);
  }

  deleteComment(id) {
    this.onDeleteComment.emit(id);
  }

}
