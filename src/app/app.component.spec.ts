import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('должен создать компонент', () => {
    expect(component).toBeTruthy();
  });

  it('должен отображать заголовок', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Список пользователей');
  });

  it('должен фильтровать пользователей по поиску', () => {
    component.searchTerm = 'Анна';
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.user-item'));
    expect(items.length).toBe(1);
    expect(items[0].nativeElement.textContent).toContain('Анна');
  });

  it('должен фильтровать по статусу "активные"', () => {
    component.filterStatus = 'active';
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.user-item'));
    expect(items.length).toBe(3); // Анна, Светлана, Дмитрий
  });

  it('должен показывать email при клике на пользователя', () => {
    const user = component.users[0];
    component.onSelectUser(user);
    fixture.detectChanges();
    const emailElement = fixture.nativeElement.querySelector('.selected-user');
    expect(emailElement).toBeTruthy();
    expect(emailElement.textContent).toContain(user.email);
  });
});