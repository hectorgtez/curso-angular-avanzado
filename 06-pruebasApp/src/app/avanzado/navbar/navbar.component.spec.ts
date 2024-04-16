import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe de tener un link a la página de médicos', () => {
    const debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    let existe = false;
    for (const elemento of debugElements) {
      if (elemento.attributes['routerLink'] === '/medicos') {
        existe = true;
        break;
      }
    }

    expect(existe).toBeTruthy();
  });
});
