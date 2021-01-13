import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Post } from 'src/app/core/models';
import { PostsService } from 'src/app/core/services/posts/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  id: number;
  post: Observable<Post>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id'), 10);

      this.post = this.postsService.findOne(this.id);
    });
  }

  deletePost() {
    this.postsService
      .deletePost(this.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/admin/workboard`);
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully deleted!',
            detail: `Your post has been deleted!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Post has not been deleted',
            detail: error.message,
          });
        },
      });
  }
}
