import { PrismaClient } from "@prisma/client";
import { AuthenticationError } from "../../utils/errors";

export class PrismaDbClient {
  prisma = new PrismaClient();

  getUser = async (username: string) => {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });
      return user;
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  changeAuthStatus = async (username: string): Promise<{ user: { username: string; name: string; role: string; description: string; lastActiveTime: Date; isLoggedIn: boolean; }, error?: string;}> => {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        throw AuthenticationError()
      }

      const updatedUser = await this.prisma.user.update({
        where: {
          username,
        },
        data: {
          isLoggedIn: !user.isLoggedIn,
          lastActiveTime: new Date(),
        },
      });
      
      return { user: updatedUser, error: null };
    } catch (e) {
      console.log(e);
      return { user: null, error: e}
    }
  };

  updateUser = async ({ userInfo, userId }: { userInfo: { name?: string; profileDescription?: string; }, userId: string;}) => {
    const { name, profileDescription: description } = userInfo;
    try {
      return this.prisma.user.update({
        where: {
          username: userId,
        },
        data: {
          ...(name && { name }),
          ...(description && { description }),
        },
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };
}
