// 获取currentFlag cid
export default function getChapterInfo() {
  const textContentArr = []
  const observer = new IntersectionObserver((e) => {
    e.forEach((dom) => {
      // isIntersecting为true则dom出现在页面上
      if (dom.isIntersecting) {
        textContentArr.push(dom.target.textContent)
        textContentArr.sort((a, b) => a - b);
        window.adjustObj.cid = textContentArr[0] || 0;
        const index = doms.findIndex(val => val.target.textContent === dom.target.textContent);
        window.adjustObj.currentFlag = index + 1;
      } else {
        const index = textContentArr.indexOf(dom.target.textContent)
        index !== -1 && textContentArr.splice(index, 1);
      }
    })
  }, {})
  let doms = document.getElementsByClassName('.chapterId')
  for (let i = 0; i< doms.length; i++) {
    observer.observe(doms[i])
  }
}
