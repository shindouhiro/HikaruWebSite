/** 获取 token */
export function getToken() {
  // 检查是否在浏览器环境
  if (typeof window !== 'undefined') {
    return localStorage.getItem(tokenKey);
  }
  return null;
}

/** 设置 token */
export function setToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(tokenKey, token);
  }
}

/** 移除 token */
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(tokenKey);
  }
} 
