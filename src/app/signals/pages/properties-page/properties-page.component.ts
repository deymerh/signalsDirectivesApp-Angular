import { Component, OnDestroy, OnInit, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
})
export class PropertiesPageComponent implements OnInit, OnDestroy {

  public counter = signal<number>(10);
  public user = signal<User>({
    id: 1,
    email: 'george.bluth@reqres.in',
    first_name: 'George',
    last_name: 'Bluth',
    avatar: 'https://reqres.in/img/faces/1-image.jpg'
  });
  public fullName = computed(() => `${this.user().first_name} ${this.user().last_name}`);
  public userChangeEffect = effect(() => {
    console.log('first_name: ' + this.user().first_name + 'counter: ' + this.counter());
  });

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update((current) => current + 1);
    }, 1000)
  }

  onFieldUpdated(field: keyof User, value: string) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // this.user.update(current => {
    //   return {
    //     ...current,
    //     [field]: value
    //   };
    // });

    this.user.mutate((currentUser) => {
      switch (field) {
        case 'email':
          currentUser.email = value;
          break;
        case 'first_name':
          currentUser.first_name = value;
          break;
        case 'last_name':
          currentUser.last_name = value;
          break;
        case 'id':
          currentUser.id = Number(value);
          break;
      }
    })
  }

  increaseBy(value: number): void {
    this.counter.update((current) => current + value);
  }

  ngOnDestroy(): void {
    this.userChangeEffect.destroy();
  }
}
