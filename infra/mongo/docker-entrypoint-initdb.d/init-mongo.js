db = db.getSiblingDB('sats')
db.createUser({
  user: "sw",
  pwd: "secret",
  roles: [{
    role: "readWrite",
    db: "sats"
  }]
})

db = db.getSiblingDB('admin')
db.shutdownServer()
