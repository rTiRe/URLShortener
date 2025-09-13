import { Pool } from 'pg'

import { HealthStatus } from '../enums/HealthStatus'
import { HealthCheck } from '../schemas/HealthCheck'
import logger from '../logger'
import config from '../config'

const MIN_POOL_SIZE = 1
const MAX_POOL_SIZE = 15
const IDLE_TIMEOUT = 300_000
const MAX_USES = 50_000

class PostgresStorage {
  private _dbUrl: string
  private _pool: Pool | null = null

  constructor(dbUrl: string) {
    this._dbUrl = dbUrl
  }

  async connect(): Promise<void> {
    this._pool = new Pool({
      connectionString: this._dbUrl,
      min: MIN_POOL_SIZE,
      max: MAX_POOL_SIZE,
      idleTimeoutMillis: IDLE_TIMEOUT,
      maxUses: MAX_USES,
    })
    await this._pool.query('SELECT 1')
    logger.debug('[✅] Connected to PostgreSQL')
  }

  get pool(): Pool {
    if (!this._pool) {
      throw new Error('Pool is not initialized. Call connect() first.')
    }
    return this._pool
  }

  async disconnect(): Promise<void> {
    if (this._pool) {
      await this._pool.end()
      logger.debug('[❌] PostgreSQL pool closed')
    }
  }

  async healthcheck(): Promise<HealthCheck> {
    let status: HealthStatus = HealthStatus.HEALTHY
    try {
      await this.pool.query('SELECT 1')
    } catch (err) {
      logger.error('PostgreSQL healthcheck failed:', err)
      status = HealthStatus.UNHEALTHY
    }
    return {
      name: 'PostgreSQL healthcheck',
      status,
    }
  }
}

export default new PostgresStorage(config.DB_URL)
