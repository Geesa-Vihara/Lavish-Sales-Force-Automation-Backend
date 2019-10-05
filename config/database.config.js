require('dotenv').config();

module.exports = {
    url: `${process.env.DBURL}`,
    secretOrKey: `${process.env.SECRETORKEY}`
}