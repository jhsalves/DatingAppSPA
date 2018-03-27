import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AlertifyService } from './services/alertify.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './gards/auth.guard';
import { PreventUsavedChanges} from './gards/prevent-usaved-changes.guard';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';
import { appRoutes } from './routes';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';
import { AuthModule } from './auth/auth.module';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { ListsResolver } from './resolvers/lists.resolver';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { MessagesResolver } from './resolvers/message.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    MemberCardComponent,
    MemberDetailComponent,
    ListsComponent,
    MessagesComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent
],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AuthModule,
    TabsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    ListsResolver,
    PreventUsavedChanges,
    MessagesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
