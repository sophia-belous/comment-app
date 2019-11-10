import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Output() onEdit: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<any> = new EventEmitter();
  @Input() comment: any;

  editComment() {
    this.onEdit.emit();
  }

  deleteComment() {
    this.onDelete.emit(this.comment.id);
  }
}
