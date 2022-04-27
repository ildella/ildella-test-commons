module.exports = coll => {

  const read = async id => {
    const results = await coll.find({id: id}, {}).toArray()
    return results[0]
  }
  const update = async doc => {
    const result = await coll.updateOne({id: doc.id}, {$set: doc})
    return result.result
  }
  const list = () => coll.find({}, {}).skip(0).limit(20).sort({id: -1}).toArray()

  return {
    ...coll,
    read,
    update,
    list,
  }

}
