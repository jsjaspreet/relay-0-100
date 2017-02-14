import humps from 'humps'

export default (pgPool) => {
  return {
    getLinks() {
      return pgPool.query(`
        select * from links
      `).then(res => humps.camelizeKeys(res.rows))
    },
    addLink({ link, linkTitle, createdAt }) {
      return pgPool.query(`
        insert into links("link", "link_title", "created_at")
        values
        ($1, $2, $3)
        returning *
     `, [link, linkTitle, createdAt]).then(res => {
        return humps.camelizeKeys(res.rows[0])
      })
    },
    deleteLink({ id }) {
      return pgPool.query(`
      delete from links where id=$1
      returning *
      `, [id]).then(res => humps.camelizeKeys(res.rows[0]))
    }
  }
}