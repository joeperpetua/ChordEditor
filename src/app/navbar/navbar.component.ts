import { Component } from '@angular/core';

@Component({
    selector: 'navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class Navbar {
    title = "ChordEditor";
    menuOpened = false;
    navbarItems = [
        {'text': 'Home', 'url': '/'},
        {'text': 'About', 'url': '/about'},
    ]

    toggleMenu() {
        this.menuOpened = !this.menuOpened;
    }
}