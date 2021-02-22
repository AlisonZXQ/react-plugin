/**
 * config.js:
 *
 * window.GT_CONFIG = {
 *   clientID: '',
 *   clientSecret: '',
 *   owner: '',
 *   repo: '',
 *   admin: [],
 *   distractionFreeMode: false,
 *   pagerDirection: 'last'
 * }
 */
const feedback = new Feedback({
  type: 'display'
})

feedback.render('feedback-container')
