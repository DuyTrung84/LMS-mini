import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ACGuard, RolesBuilder } from "nest-access-control";

@Injectable()
export class GqlACGuard extends ACGuard<any> {
    constructor(
        reflector: Reflector,
        rolesBuilder: RolesBuilder
    ) {
        super(reflector, rolesBuilder);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // Add your custom logic here if needed
        return super.canActivate(context);
    }
}
