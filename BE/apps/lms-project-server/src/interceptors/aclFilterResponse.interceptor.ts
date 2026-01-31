import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as nestAccessControl from "nest-access-control";
import { InjectRolesBuilder } from "nest-access-control";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AclFilterResponseInterceptor implements NestInterceptor {
    constructor(
        @Inject(nestAccessControl.ROLES_BUILDER_TOKEN) private readonly rolesBuilder: nestAccessControl.RolesBuilder,
        private readonly reflector: Reflector
    ) { }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => {
                const permissions = this.rolesBuilder.permission({
                    role: (context.switchToHttp().getRequest().user as any).roles,
                    action: "read",
                    possession: "any",
                    resource: context.getClass().name.replace("Controller", ""),
                });
                return permissions.filter(data);
            })
        );
    }
}
