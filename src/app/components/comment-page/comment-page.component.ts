import { Component, OnInit } from "@angular/core";
import { CommentsService } from "src/app/services/comments.service";

@Component({
  selector: "app-comment-page",
  templateUrl: "./comment-page.component.html",
  styleUrls: ["./comment-page.component.scss"]
})
export class CommentPageComponent implements OnInit {
  commentList: any;
  tagList: any;
  selectedTag: string;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.getAllCommentsAndTags();
  }

  getAllCommentsAndTags() {
    this.commentsService.getAll().subscribe(comments => {
      this.commentList = comments;
      this.tagList = this.getAllTags();
    });
  }

  getAllTags() {
    const tagsFromCommentList = this.commentList.reduce((arr, comment) => {
      arr.push(...comment.tags);
      return arr;
    }, []);
    return [...new Set(tagsFromCommentList)];
  }

  filterByTag(tag) {
    this.selectedTag = tag;
  }

  saveComment(data) {
    const saveCommentReq = data.id
      ? this.commentsService.editComment(data)
      : this.commentsService.addComment(data);

    saveCommentReq.subscribe(resultComment => {
      if (data.id) {
        const i = this.commentList.findIndex(com => com.id === data.id);
        this.commentList[i] = resultComment;
      } else {
        this.commentList.push(resultComment);
      }

      this.tagList = this.getAllTags();
    });
  }

  async deleteComment(id) {
    await this.commentsService.deleteComment(id).toPromise();
    const i = this.commentList.findIndex(com => com.id === id);
    this.commentList.splice(i, 1);

    this.tagList = this.getAllTags();
  }
}
