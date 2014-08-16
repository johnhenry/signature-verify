/**
 * Signature Verify
 * Copyright(c) 2014 John Henry
 * MIT Licensed
 *
 * Verify Digital Signature Information
 *
 * It is assumed that the keys named "signature" and "publickey" have been set
 * on the request object. If a key named "signeduri" has not been set, the signed
 * uri is assumed to be the requesturl.
 * This middleware uses the bitauth library and attaches a "bitauth" object to the
 * request object for use with subsequent middleware. This object has "result" and
 * "error" properties relating to the verification.

 * @param {Boolean} (optional) options.reject = false
 * @param {Boolean} (optional) options.includeBody = true

 * @return {Function}
 * @api public
 */
var bitauth = require("bitauth");
module.exports = function(options){
    options = options || {};
    options.includeBody = options.includeBody === false ? false : true;
    return function(request, response, next) {
        var rawBody = "";
        if(options.includeBody){
            request.on("data", function(chunk) {
                rawBody += chunk;
            });
        }
        var fullUrl = request.signeduri || (request.protocol + "://" + request.get("host") + request.url);
        var data = fullUrl + rawBody;
        bitauth.verifySignature(
            data,
            request.publickey,
            request.signature,
            function(error, result) {
                if(options.reject && (error || !result)){
                    response.setHeader("WWW-Authenticate","DigitalSignature realm=\"*\" domain=\" \" algorithm=\"ECDSA\"");
                    response.json(401, {error : error || "Unknown Error"});
                    return;
                }
                request.verification = {
                    result : result,
                    error : error
                }
                next();
            }
        );
    };
}
