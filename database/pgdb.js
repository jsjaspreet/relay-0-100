import humps from 'humps'

export default (pgPool) => {
  return {
    getLinks() {
      return pgPool.query(`
        select * from links
      `).then(res => humps.camelizeKeys(res.rows))
    }
  }
}