import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { IsPublic } from "./auth.reflector";

export function Authenticated()
{
  return applyDecorators(
    IsPublic(false),
    ApiBearerAuth()
  );
}

export function Public() {
  return applyDecorators(
    IsPublic(true),
  )
}