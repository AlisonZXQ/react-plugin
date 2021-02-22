import React from 'react';
import { render } from 'react-dom';
import 'es6-promise/auto';
import AddFeedback from './addFeedback';
import DisplayFeedback from './displayFeedback';
import './styles/global.less';

class Feedback {
  constructor (options = {}) {
    this.options = options
    this.Component = options.type === 'display' ? DisplayFeedback : AddFeedback
  }

  render (container, callback) {
    let node = null
    container = container || this.options.container

    if (!container) throw new Error(`Container is required: ${container}`)

    if (!(container instanceof HTMLElement)) {
      node = window.document.getElementById(container)
      if (!node) throw new Error(`Container not found, window.document.getElementById: ${container}`)
    } else {
      node = container
    }

    if (!callback) {
      callback = () => {}
    }
    console.log('this.options', this.options);

    return render(<this.Component options={this.options}/>, node, callback)
  }
}

module.exports = Feedback
