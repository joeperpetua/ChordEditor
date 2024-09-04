import { Component, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
    selector: 'navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [RouterLink, RouterLinkActive, CommonModule]
})
export class Navbar {
    title = "SongChord";
    menuOpened = false;
    navbarItems = [
        {'text': 'Home', 'url': '/create'},
        {'text': 'About SongChord', 'url': '/about'}
    ]

    constructor(
        @Inject(DOCUMENT) public document: Document,
        public auth: AuthService
    ) {}

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }
}