import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { every, first, map, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Category, Post } from 'src/app/core/models';
import { PostsService } from 'src/app/core/services/posts/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  id: number;
  editPostForm: FormGroup;
  error: '';
  post: Observable<Post>;
  title: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.id = parseInt(this.activatedRoute.snapshot.params['id'], 10);

    this.editPostForm = this.fb.group({
      id: [this.id, Validators.required],
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      text: ['', [Validators.required, Validators.minLength(50)]],
    });

    this.editPostForm.value.id = this.id;

    this.postsService
      .findOne(this.id)
      .pipe(first())
      .subscribe((value) => this.editPostForm.patchValue(value));
  }

  hasFormErrors() {
    return !this.editPostForm.valid;
  }

  onSubmit() {
    if (this.editPostForm.invalid) {
      return;
    }

    this.postsService
      .editPost(this.editPostForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/blog/post/${this.id}`);
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully edited!',
            detail: `Your post has been edited!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error!',
            detail: error.message,
          });
        },
      });
  }
}
