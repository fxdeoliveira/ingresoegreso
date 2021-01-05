import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
	name: string = '';
	usersubs: Subscription;

	constructor(private auService: AuthService, private router: Router, private store: Store<AppState>) {}

	ngOnInit(): void {
		this.usersubs = this.store
			.select('user')
			.pipe(filter(({ user }) => user != null))
			.subscribe(({ user }) => (this.name = user.nombre));
	}

	ngOnDestroy() {
		this.usersubs.unsubscribe();
	}

	logot() {
		this.auService.logout().then(() => {
			this.router.navigate([ '/login' ]);
		});
	}
}
