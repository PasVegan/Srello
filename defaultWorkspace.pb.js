// fires only for "users" records
onRecordCreate((e) => {
    // e.app
    const name = e.record.getString("name")

    let collection = $app.findCollectionByNameOrId("workspaces")

    let record = new Record(collection)

    record.set("name", name + "'s workspace")
    record.set("description", "Your default workspace")
    $app.save(record);

    e.record.set("workspaces", record.id)

    e.next()
}, "users")