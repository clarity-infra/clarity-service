import { Reflector } from "@nestjs/core";

export const IsPublic = Reflector.createDecorator<boolean>();
export const Permission = Reflector.createDecorator<string[]>();