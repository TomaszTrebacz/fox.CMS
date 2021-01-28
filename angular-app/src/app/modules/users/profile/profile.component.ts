import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user/user.service';
import { Observable } from 'rxjs';
import { Post, User } from 'src/app/core/models';
import { first, map, tap, toArray } from 'rxjs/operators';
import { PostsService } from 'src/app/core/services/posts/posts.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userRole } from 'src/app/core/enums';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EnumI, enumtoArray } from 'src/app/core/utils';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id: string;
  changeRoleForm: FormGroup;
  user: Observable<User>;
  posts: Observable<Post[]>;
  roles: EnumI<userRole>[];
  error: '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UserService,
    private postsService: PostsService,
    private authService: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = params.get('id');

      this.user = this.usersService.getUser(this.id);

      this.posts = this.postsService.findUserPosts(this.id);

      this.roles = enumtoArray(userRole);

      this.changeRoleForm = this.fb.group({
        id: [this.id, Validators.required],
        role: ['', Validators.required],
      });
    });
  }

  hasFormErrors(): boolean {
    return !this.changeRoleForm.valid;
  }

  onSubmit(): void {
    if (this.changeRoleForm.invalid) {
      return;
    }

    this.changeRoleForm.value.role = this.changeRoleForm.value.role.name;

    this.authService
      .changeRole(this.changeRoleForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully changed!',
            detail: `Role has been changed!`,
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

  deleteUser(): void {
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
            summary: 'Error!',
            detail: error.message,
          });
        },
      });
  }
}
