// 外部笔记数据源配置（基于 Gitee 代码片段 Gist，国内直连无需 VPN）
// 每个笔记本有独立的 Gitee 代码片段，避免单个片段空间不足
// 与说说后台共用同一套 Gitee 认证

export const externalNotebooksConfig = {
	// 是否启用外部笔记数据源
	enable: true,

	// 每个笔记本对应的 Gist ID
	// 在 Gitee「代码片段」新建【公开】片段，文件名 notebooks-entries.json，内容 []
	// 创建后把 Gist ID 填在对应笔记本名后面
	notebookGists: {
		每日总结: "l7ps2oxqiu0ach164fm8j98",
		日记本: "ozbyni30j47xqwf1muplr44",
		日常随笔: "kltdurzg0afowi8ne1p7227",
		喜马拉雅: "84mb9i1czwhdqtuykpjng71",
		我和宝宝的日常: "w5079ofx8szml4jatkib316",
		记录100件事: "nvzaf0rxpbc3eukwo1m9s65",
	} as Record<string, string>,

	// 笔记模板（Admin 页面快速选择）
	// {name} 会被替换为今天的日期，如 2026-06-11
	templates: [
		{
			id: "daily",
			icon: "📅",
			name: "每日总结",
			title: "{name} 每日总结",
			content: "✅️今天做了：  \n🤔今日感悟：  \n⏰明天计划：",
		},
		{
			id: "diary",
			icon: "📖",
			name: "日记",
			title: "{name}",
			content: "## 天气\n\n## 今天发生了什么\n\n## 心情\n\n## 想说的话\n\n",
		},
		{
			id: "reading",
			icon: "📚",
			name: "读书笔记",
			title: "",
			content:
				"## 📖 书籍信息\n\n- 书名：\n- 作者：\n- 阅读进度：\n\n## 核心观点\n\n## 精彩摘录\n\n> \n\n## 我的思考\n\n",
		},
		{
			id: "idea",
			icon: "💡",
			name: "灵感",
			title: "💡 {name} 灵感",
			content: "## 灵感来源\n\n## 具体想法\n\n## 下一步行动\n\n- [ ] \n",
		},
		{
			id: "todo",
			icon: "✅",
			name: "待办",
			title: "📋 {name} 待办",
			content:
				"## 重要且紧急\n\n- [ ] \n\n## 重要不紧急\n\n- [ ] \n\n## 紧急不重要\n\n- [ ] \n\n## 其他\n\n- [ ] \n",
		},
		{
			id: "free",
			icon: "📝",
			name: "空白",
			title: "",
			content: "",
		},
	] as Array<{
		id: string;
		icon: string;
		name: string;
		title: string;
		content: string;
	}>,

	// 后台登录密码的 SHA-256 哈希（与说说后台共用，临时密码 firefly123，请自行更换）
	adminPasswordHash:
		"d896b9ccfb2ab4593844ee89f0777a72057dfe766b8c090a1889c85cfb2fe6d5",

	// 预留：浏览器后台实际使用页面里手动填写、存于 localStorage 的 Gitee 令牌，此处通常留空
	githubToken: process.env.GITHUB_TOKEN || "",
};
