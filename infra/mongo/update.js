    db = db.getSiblingDB('sats')
    db.auth('sw','u123ikLp8#1*');

db.profiles.update({uid:"s5id1B9F43B993AA96392zpBkkCp"},{$set:{"firebase_uid":"jAVgTXT0GFQpLDhS5HHRaxHkIlI2"}})
db.profiles.remove({uid:"s5id9jSTNHRJd4kDWBPZR"})

    db.profiles.find({},{email:1,uid:1}).pretty()

    let objs = db.tfas.find({},{email:1}).toArray()
    let uid_set = objs.map((obj)=>{
        return db.profiles.findOne({email:obj.email},{email:1,uid:1})
    });

    uid_set.map((obj)=>{
        if(obj===null) return;
        db.tfas.updateOne({email:obj.email},{$set:{uid: obj.uid}})
        // print(obj.email,obj.uid)
        return;
    });

    db.tfas.update({},{$set: {"verified": true}}, false, true)    
    db.tfas.update({},{$set: {"verified": true}}, false, true)


    FC66kSEleVNDaC0HNs7zb22YMyf2

    
    db.profiles.remove({"sats_uid":"s5id57r41EgHg9Pjck1UA"})

    db.profiles.updateOne({"sats_uid":"s5idk6274DD4AzDADBEEzA2A22C9"},{$set:{"firebase_uid":"gbgmi0QbJROIxvbCoRMbL6Nb4sB2"}})

    s5idDAFA47DAA6ADkBA9B3F93p9D
    s5id9jSTNHRJd4kDWBPZR
    nttXknbVVDOlJHV9ox5zRxZKrrs2


    db.profiles.update(
        {},
        [
            {"$set": {"uid": { "$concat": ["$sats_uid"]}}}
        ]
    )