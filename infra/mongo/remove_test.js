
db = db.getSiblingDB('sats')
db.auth('sw','u123ikLp8#1*');
db.btxs.find({},{risk_profile:0}).pretty()
db.btxs.update({txid:"s5rec58hS3H6eKHChvQ85C"},{$set:{amount:2000}})


db = db.getSiblingDB('sats')
db.auth('auth_server','supersecret');
db.profiles.drop()
db.pins.drop()
db.tfas.drop()
db.sessions.drop()
db.btxs.drop()


