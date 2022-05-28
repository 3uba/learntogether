const admin = require("../../lib/admin")

export default async function handler(req,res) {

    if(req.method === 'GET') {
    
        res.status(200).json({"message": "get method"})
        
    } else if (req.method === 'POST') {

        const uid = await req.body.uid
        
        // const user = await admin.auth().getUser(uid);
        res.status(200).json({ "message": "all right" })
    }
    
}
