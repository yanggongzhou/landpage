// 获取currentFlag cid
export default function getChapterInfo() {
  const textContentArr = []
  const observer = new IntersectionObserver((e) => {
    e.forEach((dom) => {
      const chapterItemDom = dom.target.nextSibling
      if (chapterItemDom.className !== 'chapterId') return;
      // isIntersecting为true则dom出现在页面上
      if (dom.isIntersecting) {
        textContentArr.push(chapterItemDom.innerText)
        window.adjustObj.cid = textContentArr[textContentArr.length - 1] || 0;
        const index = chapterDoms.findIndex(val => val.textContent === chapterItemDom.innerText);
        window.adjustObj.currentFlag = index + 1;
      }
    });
    // 显示区域同时存在多个章节默认取显示区域的第一个
    const isMoreChapterIds = e.filter((dom) => dom.target.nextSibling.className === 'chapterId' && dom.isIntersecting);
    if (isMoreChapterIds > 1) {
      window.adjustObj.cid = isMoreChapterIds[0].target.nextSibling.innerText || 0;
      const index = chapterDoms.findIndex(val => val.textContent === chapterItemDom.innerText);
      window.adjustObj.currentFlag = index + 1;
    }
  }, {})
  const chapterDoms = [...document.querySelectorAll('.chapterId')] // 这个是隐藏的所以默认监听pageid
  let doms = [...document.querySelectorAll('.pageid')]
  for (let i = 0; i< doms.length; i++) {
    observer.observe(doms[i])
  }
}
