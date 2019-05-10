// import '@babel/polyfill'  // 暂时不需要全部编译

import $ from 'jquery'

import _ from 'lodash'

let text = _.join(['hello', 'world'], '-')

$('.app').text(text)