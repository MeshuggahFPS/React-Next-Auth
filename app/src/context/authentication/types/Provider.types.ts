import { IFeedback } from "@/src/components/error/Feedback.types";
import { ILoginCredentials } from "./Login.types";
import { IRegisterCredentials } from "./Register.types";
import IUser from "./User.types";

export interface IAuthContext {
  user: IUser | null;
  isAuthenticated: boolean;
  feedback: IFeedback;
  
  login: (credentials: ILoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (newUser: IRegisterCredentials) => Promise<void>;
  reset: () => Promise<void>;
}