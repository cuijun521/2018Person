import marked from 'marked';

export default {
  inserted(el, binding) {
    console.log(el, binding);
    el.innerHTML = marked(binding.value);
  },
};
