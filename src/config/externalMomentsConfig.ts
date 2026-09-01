// 外部说说数据源配置（基于 Gitee 代码片段 Gist，完全免费、国内直连无需 VPN）
// 数据存储在 Gitee Gist 中，通过 Gitee API v5 读写（公开片段，访客匿名可读，后台凭令牌写）
// 添加新说说不会修改仓库中的任何代码
export const externalMomentsConfig = {
	// 是否启用外部说说数据源
	enable: true,
	// Gitee Gist ID（创建代码片段后从 URL 获取，形如 https://gitee.com/<用户>/codes/<ID>）
	gistId: "ir8tpxezjmcby92kvqluw97",
	// Gist 中的文件名
	fileName: "moments.json",
	// 默认作者信息（可改成你的昵称；头像可换成你自己的图片链接）
	defaultAuthor: "超人不会飞",
	defaultAvatar:
		"https://i.postimg.cc/7YLVJqnp/wei-xin-tu-pian-2026-05-07-020150-883.jpg",
	// 后台登录密码的 SHA-256 哈希（明文密码不存入代码）
	// 生成方式：printf '%s' "你的密码" | sha256sum
	// 当前临时密码为 firefly123，上线后请改成你自己的
	adminPasswordHash:
		"d896b9ccfb2ab4593844ee89f0777a72057dfe766b8c090a1889c85cfb2fe6d5",
	// 预留：构建期环境变量令牌（浏览器后台实际使用页面里手动填写、存于 localStorage 的 Gitee 令牌，此处通常留空）
	githubToken: process.env.GITHUB_TOKEN || "",
};
