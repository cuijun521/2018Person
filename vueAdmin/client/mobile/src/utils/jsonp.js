export default (url, query) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  const callbackFnName = "callback"+(+new Date());
  return new Promise((resolve, reject) => {
    window[callbackFnName] = (data) => {
      window.callbackFnName = null;
      resolve(data)
    }
    script.src = url+'?callback='+callbackFnName;
    document.body.appendChild(script);
    script.onerror = function (...rest) {
      reject(rest);
    }
  })
};
