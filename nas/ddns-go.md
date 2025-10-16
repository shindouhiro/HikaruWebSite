## ddns-go 是一个开源的动态域名解析（DDNS）工具
+ ddns-go 本身并不提供 DNS 服务，它只是一个 中间人，帮你把你当前的公网 IP 更新到域名服务商的 DNS 解析记录里
+ DNS 服务商不会让任何人随便改你域名的解析记录。
+ 需要你提供一对 API Key / Secret（类似账号密码），才能确认你是域名的所有者，有权限修改


## 阿里云获取API  API Key / Secret
登录阿里云控制台
👉 阿里云控制台

进入 AccessKey 管理页面

点击右上角头像 → AccessKey 管理

或者直接访问 👉 AccessKey 管理

新建 AccessKey

默认账号（主账号）可能提示安全风险，推荐 创建子账号（RAM 用户） 来管理，避免主账号泄露。

在 RAM 控制台里给子账号授权：

AliyunDNSFullAccess（管理域名解析的权限）

然后在子账号下新建 AccessKey。

记录 AccessKey ID 和 AccessKey Secret

只会显示一次 Secret，请务必保存好。

这两个值就对应 ddns-go 里填写的 Key 和 Secret。


## 注意事项

建议 不要直接用主账号 AccessKey，因为权限过大。

最好单独创建一个 RAM 用户，只赋予 域名解析相关权限，这样即使泄露，风险也小。

AccessKey Secret 丢失后无法找回，只能删除重建。
