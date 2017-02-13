import pg from 'pg'
import pgConfigs from '../../postgres/config'

const nodeEnv = process.env.NODE_ENV || "development"
// PG setup
const pgConfig = pgConfigs[nodeEnv]
const pgPool = new pg.Pool(pgConfig)

export default pgPool