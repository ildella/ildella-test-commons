module.exports = coll => {
  const read = async id => {
    const results = await coll.find({id}, {}).toArray()
    return results[0]
  }
  const update = async document => {
    const result = await coll.updateOne({id: document.id}, {$set: document})
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
