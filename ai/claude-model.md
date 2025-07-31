## 解决Claude模型被封

+ 进入Cursor 的setting.json,增加以下配置
+ http.proxy是配置走你的代理地址,根据实际情况更改就可以了
```json
  "cursor.general.disableHttp2": true,
  "cursor.general.disableHttp1SSE": true,
  "http.proxy": "http://127.0.0.1:7890",  
  "http.proxyStrictSSL": false,
  "http.noProxy": [],
```
