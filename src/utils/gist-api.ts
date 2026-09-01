// Gitee 代码片段（Gist）数据访问封装
// 说明：片段为公开片段，匿名可读；写入需在 body / query 带 access_token。
// 浏览器端不要使用 raw 地址（Gitee raw 不返回 CORS 头），统一走详情接口取内联文件内容。
const GITEE_API_BASE = "https://gitee.com/api/v5";

export interface ExternalMoment {
	id: string;
	content: string;
	published: string;
	images?: string[];
	tags?: string[];
	location?: string;
	pinned?: boolean;
	author?: string;
	avatar?: string;
}
export interface NotebookData {
	entries: Array<{
		id: string;
		notebook: string;
		title: string;
		date: string;
		content: string;
		createdAt: string;
		updatedAt: string;
	}>;
	metadata: {
		name: string;
		summary?: string;
	};
}

// 读取片段详情中某个文件的文本内容（公开片段，匿名可读）
export async function getGistContent(
	gistId: string,
	fileName: string,
): Promise<string | null> {
	try {
		const response = await fetch(`${GITEE_API_BASE}/gists/${gistId}`);
		if (!response.ok) {
			return null;
		}
		const gist = await response.json();
		const file = gist.files?.[fileName];
		return file?.content || null;
	} catch {
		return null;
	}
}

// 兼容旧命名：同样走详情接口（Gitee raw 无 CORS，不能在浏览器直读）
export async function getGistContentRaw(
	gistId: string,
	fileName: string,
): Promise<string | null> {
	return getGistContent(gistId, fileName);
}

// 更新片段文件（access_token 放在 JSON body）
export async function updateGist(
	gistId: string,
	fileName: string,
	content: string,
	token: string,
): Promise<boolean> {
	const body = JSON.stringify({
		access_token: token,
		files: {
			[fileName]: {
				content: content,
			},
		},
	});
	try {
		const response = await fetch(`${GITEE_API_BASE}/gists/${gistId}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body,
		});
		return response.ok;
	} catch {
		return false;
	}
}

// 创建公开片段。Gitee 要求 description 必填（1-30 字）
export async function createGist(
	fileName: string,
	content: string,
	token: string,
	description = "firefly-data",
	isPublic = true,
): Promise<string | null> {
	const body = JSON.stringify({
		access_token: token,
		description,
		public: isPublic,
		files: {
			[fileName]: {
				content: content,
			},
		},
	});
	try {
		const response = await fetch(`${GITEE_API_BASE}/gists`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body,
		});
		if (!response.ok) {
			return null;
		}
		const gist = await response.json();
		return gist.id;
	} catch {
		return null;
	}
}

export async function deleteGist(
	gistId: string,
	token: string,
): Promise<boolean> {
	try {
		const response = await fetch(
			`${GITEE_API_BASE}/gists/${gistId}?access_token=${encodeURIComponent(token)}`,
			{ method: "DELETE" },
		);
		return response.ok;
	} catch {
		return false;
	}
}

export async function getMomentsFromGist(
	gistId: string,
	fileName: string,
): Promise<ExternalMoment[]> {
	const content = await getGistContent(gistId, fileName);
	if (!content) {
		return [];
	}
	try {
		return JSON.parse(content);
	} catch {
		return [];
	}
}

export async function updateMomentsInGist(
	gistId: string,
	fileName: string,
	moments: ExternalMoment[],
	token: string,
): Promise<boolean> {
	const content = JSON.stringify(moments, null, 2);
	return updateGist(gistId, fileName, content, token);
}

// 笔记本文件在后台按“扁平数组”存取，这里读取后归一为 NotebookData
export async function getNotebookFromGist(
	gistId: string,
): Promise<NotebookData | null> {
	const content = await getGistContent(gistId, "notebooks-entries.json");
	if (!content) {
		return null;
	}
	try {
		const parsed = JSON.parse(content);
		if (Array.isArray(parsed)) {
			return { entries: parsed, metadata: { name: "" } };
		}
		return parsed as NotebookData;
	} catch {
		return null;
	}
}

export async function updateNotebookInGist(
	gistId: string,
	data: NotebookData,
	token: string,
): Promise<boolean> {
	// 与后台保持一致：文件内容存扁平的 entries 数组
	const content = JSON.stringify(data.entries ?? [], null, 2);
	return updateGist(gistId, "notebooks-entries.json", content, token);
}

export async function createNotebookGist(
	name: string,
	token: string,
): Promise<string | null> {
	return createGist(
		"notebooks-entries.json",
		"[]",
		token,
		`firefly-${name}`.slice(0, 30),
		true,
	);
}

export function generateId(prefix = "ext"): string {
	return `${prefix}-${Date.now()}`;
}

// 校验 Gitee 私人令牌是否有效
export async function validateGiteeToken(token: string): Promise<boolean> {
	try {
		const response = await fetch(
			`${GITEE_API_BASE}/user?access_token=${encodeURIComponent(token)}`,
		);
		return response.ok;
	} catch {
		return false;
	}
}
