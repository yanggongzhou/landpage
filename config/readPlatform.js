const fs = require('fs');

let platforms = []
const files = fs.readdirSync('./platform')
files.forEach(function (item, index) {
  let stat = fs.statSync("./platform/" + item)
  if (!stat.isDirectory()) {
    platforms.push({
      name: item.replace('.json', ''),
      config: JSON.stringify(require('../platform/' + item)) || ''
    })
  }
})

module.exports = platforms
