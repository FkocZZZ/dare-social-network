import { Injectable } from '@angular/core';
import { HttpClientAuth } from '../../util/http-client-auth';
import { ProfileModel } from '../../model/profile.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpClient: HttpClientAuth) {}

  createProfile(profile: ProfileModel) {
    return this.httpClient.post('profile', profile);
  }

  getById(uid: string): Observable<ProfileModel> {
    console.log('uid', uid);
    return this.httpClient.get(
      `profile?uid=${uid}`,
    ) as Observable<ProfileModel>;
  }
}
