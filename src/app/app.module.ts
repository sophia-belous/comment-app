import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';

import {
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
  MatDividerModule,
  MatButtonModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatOptionModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommentListComponent } from "./components/comment-list/comment-list.component";
import { CommentPageComponent } from "./components/comment-page/comment-page.component";
import { CommentItemComponent } from "./components/comment-item/comment-item.component";
import { CommentInputComponent } from "./components/comment-input/comment-input.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagsInputComponent } from './components/tags-input/tags-input.component';
import { CommentFilterBarComponent } from './components/comment-filter-bar/comment-filter-bar.component';
import { FilterByTagPipe } from './pipes/filter-by-tag.pipe';
import { ParseCalculationPipe } from './pipes/parse-calculation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CommentListComponent,
    CommentPageComponent,
    CommentItemComponent,
    CommentInputComponent,
    TagsInputComponent,
    CommentFilterBarComponent,
    FilterByTagPipe,
    ParseCalculationPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
