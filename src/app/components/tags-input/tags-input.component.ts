import { COMMA, ENTER, SPACE } from "@angular/cdk/keycodes";
import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Input
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: "app-tags-input",
  templateUrl: "./tags-input.component.html",
  styleUrls: ["./tags-input.component.scss"]
})
export class TagsInputComponent implements AfterViewInit {
  @Input() allTags: any;
  @Input() tags: string[];

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, SPACE, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;

  selectedTag = -1;
  displayedTags = [];

  @ViewChild("tagInput", { static: false }) tagInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;

  constructor() {}

  ngAfterViewInit() {
    if (this.allTags) {
      this.filteredTags = this.tagCtrl.valueChanges.pipe(
        startWith(null),
        map((tag: string | null) =>
          tag ? this._filter(tag) : this.allTags.slice()
        )
      );

      this.filteredTags.subscribe(filteredTags => {
        this.displayedTags = filteredTags;
      });
      this.matAutocomplete._keyManager.change.subscribe(index => {
        if (index >= 0) {
          this.selectedTag = index;
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || "").trim()) {
        this.tags.push(value.trim());
      }

      if (input) {
        input.value = "";
      }

      this.tagCtrl.setValue(null);
    } else {
      if (this.selectedTag >= 0) {
        this.tags.push(this.displayedTags[this.selectedTag]);
        this.tagInput.nativeElement.value = "";
        this.tagCtrl.setValue(null);
      } else if (
        this.tagInput.nativeElement.value !== "" &&
        this.displayedTags.length === 0
      ) {
        this.tags.push(this.tagInput.nativeElement.value);
        this.tagInput.nativeElement.value = "";
        this.tagCtrl.setValue(null);
      }
    }
    this.selectedTag = -1;
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = "";
    this.tagCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter(
      tag =>
        tag.toLowerCase().indexOf(filterValue) === 0 &&
        !this.tags.find(existingTag => existingTag === tag)
    );
  }
}
