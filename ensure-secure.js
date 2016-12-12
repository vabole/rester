/**
 * Created by vabole on 12.12.16.
 */
'use strict';
module.exports =function ensureSecure(req, res, next){
    if(req.secure){
        // OK, continue
        return next();
    };
    // handle port numbers if you need non defaults
    // res.redirect('https://' + req.host + req.url); // express 3.x
    res.redirect('https://' + req.hostname + req.url); // express 4.x
};