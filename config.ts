export const frontEndConfig = {
  AUTH: {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    RESET: "/reset",
    REQUEST_VERIFICATION: "/request-verification",
    VERIFY: "/verify",
  },
  PROTECTED: {
    FEED: "/feed",
    PROFILE: "/profile",
  },
  API: {
    USER: "/api/auth-user",
    LOGOUT: "/api/logout",
    SET_COOKIE: "/api/set-cookie",
  },
};
export const backEndConfig = {
  AUTH: {
    CSRF: "/sanctum/csrf-cookie",
    RESET_PASSWORD: "/auth/reset-password",
    SIGN_IN: "/auth/login",
    SIGN_UP: "/auth/register",
    USER: "/auth/user",
    LOGOUT:"/auth/logout",
    GET_USER_PROFILE: "/user/get-user-profile/",
  },
};
