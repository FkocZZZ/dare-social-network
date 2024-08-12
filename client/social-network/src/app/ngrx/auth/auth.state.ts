import { AuthCredentialModel } from '../../model/auth.model';

export interface AuthState {
  idToken: string;
  authCredential: AuthCredentialModel;

  loginWithGoogleSuccess: boolean;
  loading: boolean;
  error: any;
}
