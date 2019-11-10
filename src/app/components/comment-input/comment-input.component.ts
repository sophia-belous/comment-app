import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-comment-input",
  templateUrl: "./comment-input.component.html",
  styleUrls: ["./comment-input.component.scss"]
})
export class CommentInputComponent implements OnInit {
  @Output() onSend: EventEmitter<any> = new EventEmitter();
  @Input() comment: any;
  @Input() tagList: any;
  commentTags: string[];

  saveCommentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    const title = this.comment ? this.comment.title : "";
    const text = this.comment ? this.comment.text : "";
    this.commentTags = this.comment ? this.comment.tags : [];
    this.saveCommentForm = this.formBuilder.group({
      title: new FormControl(title, [Validators.required, Validators.maxLength(120)]),
      text: new FormControl(text, [Validators.required, Validators.maxLength(500)])
    });
  }

  saveComment() {
    const tags = [...new Set(this.commentTags)];
    const data = this.comment
      ? {
        id: this.comment.id,
        ...this.saveCommentForm.value,
        tags
      }
      : { ...this.saveCommentForm.value, tags };

    this.onSend.emit(data);
    this.reset();
  }

  reset() {
    if (this.comment) {
      delete this.comment.editable;
    } else {
      this.saveCommentForm.reset();
      this.commentTags = [];
    }
  }
}
