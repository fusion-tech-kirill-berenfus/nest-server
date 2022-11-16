import { UserRole } from 'src/enums/rolesEnum';

export type TokenUserInfo = {
  sub: number;
  role: UserRole;
};

export type TokenBodyType = TokenUserInfo & {
  iat: number;
  exp: number;
};
