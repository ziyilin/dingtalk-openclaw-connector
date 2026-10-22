/**
 * 常量定义模块
 */

/** 新会话触发命令 */
export const NEW_SESSION_COMMANDS = ['/new', '/reset', '/clear', '新会话', '重新开始', '清空对话'];

/** 默认的允许命令白名单 */
export const DEFAULT_ALLOWED_COMMANDS = [
  '/new', '/reset', '/clear'
];

/** 默认的拦截提示消息 */
export const DEFAULT_COMMAND_BLOCK_MESSAGE =
  '抱歉，我目前仅支持以下会话管理命令：\n/new、/reset、/clear\n如需其他帮助，请联系管理员。';

/**
 * 媒体类消息类型集合。
 *
 * 这些消息类型需要通过钉钉原生消息 API 发送，不支持 AI Card 形式，
 * 在 sendProactiveInternal 中会强制跳过 AI Card 路径。
 */
export const MEDIA_MSG_TYPES = new Set(['image', 'voice', 'file', 'video'] as const);

/**
 * 队列繁忙时的即时 ACK 回复短语。
 *
 * 当消息入队时检测到上一条消息仍在处理中，立即从此列表中随机选取一条回复，
 * 告知用户消息已收到并排队，避免用户以为 Bot 没有响应。
 * 参考 delivery.rs 中 DINGTALK_ACK_PHRASES_BUSY_ZH_CN 的设计。
 */
export const QUEUE_BUSY_ACK_PHRASES = [
  '上一条还没结束，这条我已经记下，稍后按顺序继续处理。',
  '当前还在忙，你的新消息已经排队，上一条完成后我马上继续。',
  '我这边还在处理上一条，这条已加入队列，完成后继续处理。',
] as const;

/**
 * 允许内联进上下文的文件衍生文本的最大字符数（超过则截断）。
 *
 * 文本附件（.log/.txt/.md/.docx/.pdf 等）默认「一律不内联、不预览，只给可读取的本地文本路径，
 * 由 agent 自行用 read 工具读取」——这从根上避免了超大文件（如数百万字符的 hs_err_pid.log）
 * 撑爆会话上下文、触发 run-failed-before-reply。仅当 docx/pdf 的提取文本 sidecar 落盘失败时，
 * 才回退为按该上限截断后内联，作为兜底。
 *
 * 音频语音识别(ASR)文本长度天然可控且需即时理解，故保留内联；超过该值时截断兜底，
 * 避免超长转写撑爆上下文（如未来出现超长转写，可改为同 docx/pdf 一样落盘 sidecar 再由 agent read）。
 */
export const FILE_INLINE_MAX_CHARS = 20000;

/**
 * 内联文本需要截断时保留的头部字符数（用于音频 ASR 文本、以及 docx/pdf sidecar 落盘失败的内联兜底）。
 */
export const FILE_PREVIEW_CHARS = 2000;
