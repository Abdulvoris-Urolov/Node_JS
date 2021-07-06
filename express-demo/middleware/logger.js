function log(req, res, next) {
    console.log('Log yozish..');
    next();
};

function authion(req, res, next){
    console.log('Autentifikatsiya qilish..');
    next();
}

module.exports.nameLog= log;
module.exports.nameAuth= authion;