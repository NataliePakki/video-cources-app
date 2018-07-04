import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { BreadcrumbsComponent } from './core/breadcrumbs/breadcrumbs.component';
import { CourseListComponent } from './course-list/course-list/course-list.component';
import { FooterComponent } from './core/footer/footer.component';
import { ToolboxComponent } from './course-list/toolbox/toolbox.component';
import { CourseListItemComponent } from './course-list/course-list-item/course-list-item.component';
import { FormsModule } from '@angular/forms';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent,
        HeaderComponent,
        BreadcrumbsComponent,
        CourseListItemComponent,
        CourseListComponent,
        FooterComponent,
        ToolboxComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
