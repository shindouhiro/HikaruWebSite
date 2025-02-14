import { useEffect, useState } from 'react';
import { getToken } from '@/utils/cookies';

export default function LoginBox() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // 在客户端渲染时获取 token
    setToken(getToken());
  }, []);

  // 使用 token 的其他逻辑...
  return (
    // ...
  );
} 
