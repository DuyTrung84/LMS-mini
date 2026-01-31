import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserServiceBase } from "./base/user.service.base";
import { User as PrismaUser, Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService extends UserServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async findByUsername(username: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async findByEmail(email: string): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({
      where: { email: email },
    });
  }

  async createUser(args: Prisma.UserCreateArgs): Promise<PrismaUser> {
    const password = await bcrypt.hash(args.data.password, 10);
    return this.prisma.user.create({
      ...args,
      data: {
        ...args.data,
        password,
      },
    });
  }
}
