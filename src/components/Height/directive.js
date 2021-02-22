import Vue from 'vue'
export default function () {
  //设置一个屏幕自适应高度
  Vue.directive('height', {
    inserted(el, binding) {
      if (typeof binding.value == 'number') {
        return el.style.height = (window.innerHeight - binding.value) + 'px'
      } else {
        return el.style.height = (window.innerHeight) + 'px'
      }
    },
  });
}