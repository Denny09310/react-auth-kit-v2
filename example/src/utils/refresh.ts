import { RefreshTokenCallback } from "react-auth-kit-v2";
import login from "./login";

export default {
  interval: 5 * 1000 * 60,
  apiCallback: async () => {
    try {
      const { token, ...rest } = await login();

      return {
        success: true,
        accessToken: {
          token: token,
          expiresAt: new Date(),
        },
        refreshToken: {
          token: "sample-refresh-token",
          expiresAt: new Date(),
        },
        user: rest,
      };
    } catch (error) {
      return { success: false };
    }
  },
} satisfies RefreshTokenCallback;
