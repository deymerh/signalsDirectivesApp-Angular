import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user-interface';
@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
})
export class UserInfoPageComponent implements OnInit {

  private readonly usersService = inject(UserService);
  public userId = signal<number>(1);
  public currentUser = signal<User | undefined>(undefined);
  public userWasFound = signal<boolean>(true);
  public fullName = computed<string>(() => {
    if (!this.currentUser) return 'Usuario no encontrado';
    return `${this.currentUser()?.first_name} ${this.currentUser()?.last_name}`;
  });

  ngOnInit(): void {
    this.loadUser(this.userId());
  }

  loadUser(user: number) {
    if (user <= 0) return;

    this.userId.set(user);
    this.currentUser.set(undefined);

    this.usersService.getUserById(this.userId()).subscribe({
      next: (user) => {
        this.currentUser.set(user);
        this.userWasFound.set(true);
      },
      error: () => {
        this.userWasFound.set(false);
        this.currentUser.set(undefined);
      }
    });

  }

}
