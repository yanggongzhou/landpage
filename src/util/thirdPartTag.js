import ClientConfig from '../client.config.json'

const { googleCode, microsoftCode } = ClientConfig

/** google分析脚本 */
export function useGoogle () {
  function createGoogleScript (f, b, e, v, n, t, s) {
    t = b.createElement(e)
    t.async = !0
    t.src = v
    s = b.getElementsByTagName('style')[0]
    s.parentNode.insertBefore(t, s)
  }

  createGoogleScript(window, document, 'script', 'https://www.googletagmanager.com/gtag/js?id=' + googleCode)
  window.dataLayer = window.dataLayer || []

  function gtag () {
    (window.dataLayer || []).push(arguments)
  }

  gtag('js', new Date())
  gtag('config', googleCode)
}

/** google分析脚本 */
export function useMicrosoft () {
  /** 微软分析分析 */
  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () {
      (c[a].q = c[a].q || []).push(arguments)
    }
    t = l.createElement(r)
    t.async = 1
    t.src = 'https://www.clarity.ms/tag/' + i
    y = l.getElementsByTagName(r)[0]
    y.parentNode.insertBefore(t, y)
  })(window, document, 'clarity', 'script', microsoftCode)
}
