export type User = {
  email: string;
  id: number;
};

export const useAuthUser = () => {
  return useState<User | null>("user", () => null);
};
