export default function getChapterInfo() {
  const observer = new IntersectionObserver((e) => {
    e.forEach((dom) => {
      // isIntersecting为true则dom出现在页面上
      if (dom.isIntersecting) {
        window.adjustObj.cid = dom.target.textContent;
      }
    })
  }, {})
  let doms = document.getElementsByClassName('.chapterId')
  for (let i = 0; i< doms.length; i++) {
    observer.observe(doms[i])
    if(doms[i].target.textContent === 'chapterId') {
      window.adjustObj.currentFlag = i
    }
  }
}
