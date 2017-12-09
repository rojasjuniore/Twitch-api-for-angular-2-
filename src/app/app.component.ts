import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

declare const Twitch: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  CLIENT_ID = '<CLIENT_ID>';
  title = 'app';

  user: Object;
  stream_key = '';
  hidden: boolean;


  constructor() {

    Twitch.init(
      {
        clientId: this.CLIENT_ID,
        redirect_uri: 'https://rojasjuniore.github.io/Twitch-api-for-angular-2-/'
      }, (error, status) => {
        if (status.authenticated) {
          this.getUser();
          this.channel();
          this.hidden = true;
        } else {
          this.hidden = false;
          console.log(error);
        }
      });
  }

  public login() {
    Twitch.login({
      redirect_uri: 'https://rojasjuniore.github.io/Twitch-api-for-angular-2-/',
      scope: ['user_read', 'channel_read', 'channel_editor'],

    }, );
  }

  public logout() {
    Twitch.logout((error) => {
      // the user is now logged out
      console.log(error);
    });

    this.user = '';
    localStorage.clear();
    sessionStorage.removeItem('twitch_oauth_session');
    setTimeout(() => {
      location.reload();
    }, 1000);

  }

  public getUser() {
    Twitch.api(
      {
        method: 'user'
      }, (error, user) => {

        this.user = {
          bio: user.bio,
          created_at: user.created_at,
          display_name: user.display_name,
          email: user.email,
          logo: user.logo,
          name: user.name
        };
        console.log(this.user);

      });
  }

  public channel() {
    Twitch.api(
      {
        method: 'channel'
      }, (error, channel) => {
        this.stream_key = channel.stream_key;
      });

  }
}
