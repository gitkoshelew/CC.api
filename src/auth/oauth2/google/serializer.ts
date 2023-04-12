import { PassportSerializer } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth.service';
import { GoogleUser } from './google.model';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('GOOGLE_AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: GoogleUser, done: Function) {
    console.log('Deserialize User');
    done(null, user);
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    const googleUser = await this.authService.findGoogleUser(payload.id);
    console.log('Deserialize User');
    console.log(googleUser);
    return googleUser ? done(null, googleUser) : done(null, null);
  }
}
