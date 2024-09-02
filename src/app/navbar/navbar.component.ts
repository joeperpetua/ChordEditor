import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    imports: [RouterLink, RouterLinkActive]
})
export class Navbar {
    title = "ChordEditor";
    menuOpened = false;
    navbarItems = [
        {'text': 'Home', 'url': '/create'},
        {'text': 'About', 'url': '/about'},
    ]

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }
}