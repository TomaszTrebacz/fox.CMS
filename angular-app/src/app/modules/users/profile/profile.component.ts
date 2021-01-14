import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { Observable } from 'rxjs';
import { Post, User } from 'src/app/core/models';
import { first, map, tap } from 'rxjs/operators';
import { PostsService } from 'src/app/core/services/posts/posts.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id: string;
  user: Observable<User>;
  posts: Observable<Post[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UserService,
    private postsService: PostsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      this.user = this.usersService
        .getUser(this.id)
        .pipe(map((result) => result));

      this.posts = this.postsService.findUserPosts(this.id).pipe(
        map((result) => result),
        tap((result) => console.log(result))
      );
    });
  }

  deleteUser() {
    this.usersService
      .deleteUser(this.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/admin/workboard`);
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully deleted!',
            detail: `User has been deleted!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'User has not been deleted',
            detail: error.message,
          });
        },
      });
  }
}
