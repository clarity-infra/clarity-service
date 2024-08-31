import { PlatformManagerInterceptor } from "@clarity/platform-manager/platform-manager.interceptor";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PlatformInterceptor extends PlatformManagerInterceptor {}