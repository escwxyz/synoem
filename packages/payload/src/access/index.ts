import type { Access, AccessArgs, User } from "payload";

export const checkRole = (roles: User["roles"] = [], user?: User | null) =>
  !!user?.roles?.some((role: string) => roles?.includes(role));

export const anyone: Access = () => true;

export const admin = ({ req: { user } }: AccessArgs) =>
  checkRole(["admin"], user);

export const adminOrSelf = ({ req: { user } }: AccessArgs) => {
  if (user) {
    if (checkRole(["admin"], user)) {
      return true;
    }

    return {
      id: {
        equals: user.id,
      },
    };
  }

  return false;
};

export const authenticated = ({ req: { user } }: AccessArgs) => !!user;

export const authenticatedOrPublished = ({ req: { user } }: AccessArgs) => {
  if (user) {
    return true;
  }

  return {
    _status: {
      equals: "published",
    },
  };
};
