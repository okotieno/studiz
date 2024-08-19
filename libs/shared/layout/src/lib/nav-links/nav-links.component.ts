import { Component, computed, DestroyRef, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { distinctUntilChanged, filter, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface IMenuItem {
  title: string,
  activeRoutes?: string[],
  icon?: string
  options: {
    icon?: string
    name: string;
    link?: string[],
    nextPage?: string;
    activatingRoutes?: string[],
  }[]
}

interface IMenu {
  [key: string]: IMenuItem;
}

@Component({
  standalone: true,
  imports: [
    IonicModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: 'nav-links.component.html',
  styleUrl: 'nav-links.component.scss'
})
export class NavLinksComponent implements OnInit {
  destroyRef = inject(DestroyRef);

  router = inject(Router);
  currentRoute = signal('');
  activatedRoute = inject(Router);
  // TODO Replace when input fixed
  // activeKey = input('root');

  _activeKey = signal('root');
  @Input()
  set activeKey(value: string) {
    this._activeKey.set(value);
  }

  get activeKey(): Signal<string> {
    return this._activeKey;
  }


  component = NavLinksComponent;
  menu = signal<IMenu>({
    root: {
      title: 'Menu',
      options: [
        {
          name: 'Administration',
          nextPage: 'administration',
          icon: 'user-tie-hair-long',
          activatingRoutes: ['/users']
        }
      ]
    },
    administration: {
      title: 'Administration',
      icon: 'user-tie-hair-long',
      options: [
        {
          name: 'User access management',
          nextPage: 'userAccessManagement',
          icon: 'users-gear',
          activatingRoutes: ['/users', '/roles']
        }
      ]
    },

    userAccessManagement: {
      title: 'Users',
      options: [
        { name: 'Users', link: ['/users'], icon: 'user-pen' }
      ]
    }

  });

  activeMenu: Signal<IMenuItem | undefined> = computed(() => this.menu()[this.activeKey()]);
  activeMenuOptions = computed(() => {

      return (this.activeMenu()?.options ?? []).map((item) => ({
        ...item,
        isActive: item.activatingRoutes?.some((route) => this.currentRoute().includes(route))
      }));
    }
  );

  ngOnInit() {
    this.currentRoute.set(this.router.url);
    this.router.events.pipe(
      filter((res) => res instanceof NavigationEnd),
      map((res) => {
        return (res as NavigationEnd).url;
      }),
      distinctUntilChanged(),
      tap((res) => {
        this.currentRoute.set(res);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }
}
