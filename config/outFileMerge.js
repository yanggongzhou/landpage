const fs = require('fs');
const path = require("path")
const npmLifecycleEvent = process.env.npm_lifecycle_event
console.log('npm_lifecycle_event------>', npmLifecycleEvent)

//'https://hwyc-res-qat.s3.ap-southeast-1.amazonaws.com';
// 'https://landpage.hw.dzods.cn'
let BASE_URL = 'https://landpage.hw.dzods.cn'
// let BASE_URL = 'https://hwyc-res-qat.s3.ap-southeast-1.amazonaws.com';
// if (npmLifecycleEvent === 'build-test') {
//   BASE_URL = 'https://landpage.hw.dzods.cn';
// } else if (npmLifecycleEvent === 'build-stag') {
//
// }

let platforms = []
const files = fs.readdirSync('./platform')
files.forEach(function (item, index) {
  let stat = fs.statSync("./platform/" + item)
  if (!stat.isDirectory()) {
    platforms.push(item.replace('.json', ''))
  }
})

const jsFile = fs.readFileSync('./dist/index.js', 'utf8').replace('//# sourceMappingURL=index.js.map', `//# sourceMappingURL=${BASE_URL}/landpage_model/v3/index.js.map`)
console.log('--------读取jsFile------')
const cssFile = fs.readFileSync('./dist/main.css', 'utf8')
console.log('-------读取cssFile-—-----')
for (let i = 0; i < platforms.length; i++) {
  const plat = platforms[i]
  const filepath = path.join(__dirname, `../dist/${plat}.html`)
  const htmlFile = fs.readFileSync(filepath, 'utf8')
  console.log('-------读取htmlFile-—-----')
  const replaceFile = htmlFile.replace(/<script defer src="index.js?[^*>]*><\/script[^>]*>/, 'replace_bandle_script')
    .replace('replace_bandle_script', `<script id="bandle" type="text/javascript">${jsFile}</script>`)
    .replace(/<link href="main.css?[^*>]* rel="stylesheet">/, `<style type="text/css">${cssFile}</style>`)
  console.log('------替换js css map-—----')
  // fs.writeFile  写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略
  fs.writeFile(filepath, replaceFile, 'utf8', function (error) {
    if (error) {
      console.log(error);
      return false;
    }
    console.log('------写入成功-—----', plat)
  })
}


