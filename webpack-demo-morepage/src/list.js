import $ from 'jquery'

import _ from 'lodash'

import './list.css'

let text = _.join(['hello', 'world', 'list'], '-')

$('.app').text(text)