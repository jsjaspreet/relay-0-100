import humps from 'humps'

export default (pgPool) => {
  return {
    getLinks(limit, query) {
      if (query !== '') {
        return this.getLinksByQuery(limit, query)
      }
      return pgPool.query(`
        select * from links limit $1
      `, [limit]).then(res => humps.camelizeKeys(res.rows))
    },
    getLinksByQuery(limit, query) {
      return pgPool.query(`
        select * from links  where link_title ~* $2 limit $1
      `, [limit, query]).then(res => humps.camelizeKeys(res.rows))
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
    },
    updateLink({ id, link, linkTitle }) {
      return pgPool.query(`
      update links
      set link=$1,
          link_title=$2
      where id=$3
      returning *
      `, [link, linkTitle, id]).then(res => humps.camelizeKeys(res.rows[0]))
    }
  }
}