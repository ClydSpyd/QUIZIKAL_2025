export interface AuthContextType {
  user: AuthUserData | null;
  login: (
    e: React.FormEvent,
    usernameRef: React.RefObject<HTMLInputElement>,
    passRef: React.RefObject<HTMLInputElement>,
    btnRef: React.RefObject<HTMLInputElement>
  ) => void;
  logout: () => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
  error: string | null;
  setError: (val: string | null) => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}
