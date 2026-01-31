import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import * as nestAccessControl from "nest-access-control";
import { InjectRolesBuilder } from "nest-access-control";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AclValidateRequestInterceptor implements NestInterceptor {
    constructor(
        @Inject(nestAccessControl.ROLES_BUILDER_TOKEN) private readonly rolesBuilder: nestAccessControl.RolesBuilder,
        private readonly reflector: Reflector
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const resource = context.getClass().name.replace("Controller", "");
        const action = "update"; // Or determine dynamically

        const permissions = this.rolesBuilder.permission({
            role: (context.switchToHttp().getRequest().user as any).roles,
            action,
            possession: "any",
            resource,
        });

        // Validation logic here typically...
        // For now we just pass through
        return next.handle();
    }
}
