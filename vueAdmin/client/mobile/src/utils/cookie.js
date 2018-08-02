const CookieUtil = {
  set(
    name, value, expires, domain, path, secure
  ) {
    let cookieText = '';
    cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value); //解决特殊符号问题

    if (expires instanceof Date) {
      cookieText += '; expires=' + expires.toGMTString();
    }
    if (path) {
      cookieText += '; path=' + path;
    }
    if (domain) {
      cookieText += '; domain=' + domain;
    }
    if (secure) {
      cookieText += '; secure';
    }
    document.cookie = cookieText;
  },
  get(name) {
    const cookieName = encodeURIComponent(name) + '=';
    const cookieStart = document.cookie.indexOf(cookieName);
    let cookieValue = '';
    if (cookieStart > -1) {
      let cookieEnd = document.cookie.indexOf(';', cookieStart);
      if (cookieEnd == -1) {
        cookieEnd = document.cookie.length;
      }
      cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
  },
  // 删除cookie
  unset(name, domain, path, secure) {
    this.set(name, '', Date(0), domain, path, secure);
  },
};
export default CookieUtil;

// // 测试
// CookieUtil.set('name', 'zhang');
// var name = CookieUtil.get('name');
// alert(name); // zhang
// CookieUtil.unset('name');
// alert(CookieUtil.get('name')); // 空
