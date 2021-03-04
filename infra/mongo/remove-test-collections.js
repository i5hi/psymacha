// in mongoose doc.validateSync(); only works with findOneAndUpdate not updateOne

db = db.getSiblingDB('sats')
db.auth('sw','u123ikLp8#1*');
// let eq = {email: 'kyc0@test.com'}
let uq = {uid:"s5idDD774E4EBE2Fp91D444k9BE2"}
// dont delete user profile to maintain the same uid
db.sessions.remove(eq);
db.pins.remove(uq);
db.tfas.remove(eq);
db.baccs.remove(uq);
