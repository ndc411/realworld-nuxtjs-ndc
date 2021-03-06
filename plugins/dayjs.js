/**
 Created by dechuan on 2021/02/26 02
 */
import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
