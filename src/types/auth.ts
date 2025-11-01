export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  ranking?: number;
  totalScore?: number;
  quizzesCompleted?: number;
  joinDate?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}