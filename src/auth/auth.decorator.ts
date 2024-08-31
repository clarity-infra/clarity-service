import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { IsPublic } from "./auth.reflector";

/**
 * only authenticated user can access this context
 * 
 */
export function Authenticated()
{
  return applyDecorators(
    IsPublic(false),
    ApiBearerAuth()
  );
}

/**
 * all user can access this context
 * 
 */
export function Public() {
  return applyDecorators(
    IsPublic(true),
  )
}