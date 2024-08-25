import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { JWTGuard } from "./auth.guard";
import { PermissionGuard } from "./permission/permission.guard";

export function Role(...permissions: string[]) {
  return applyDecorators(
    SetMetadata('permissions', permissions),
    UseGuards(JWTGuard, PermissionGuard),
  );
}