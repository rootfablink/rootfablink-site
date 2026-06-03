import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  health() {
    return {
      service: "rootfablink-api",
      status: "ok",
      architecture: ["auth", "companies", "products", "rfqs", "messaging", "verification", "logistics", "admin"]
    };
  }
}
