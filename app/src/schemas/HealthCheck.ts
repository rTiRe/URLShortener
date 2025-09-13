import { HealthStatus } from "../enums/HealthStatus";

export interface HealthCheck {
  name: string
  status: HealthStatus
}
