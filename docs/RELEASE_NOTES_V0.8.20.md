# Release Notes - v0.8.20

## 🎉 新版本亮点 / Highlights

本次版本新增 **AI Card 卡片反馈回调**，支持自定义 AI Card 模板的点赞/点踩功能，通过 Stream 模式接收回调事件并更新卡片变量。新增 3 个可选配置项，支持不同模板自定义回调标识和变量名。

This release adds **AI Card Feedback Callback**, supporting like/dislike feedback for custom AI Card templates via Stream callback. Added 3 optional config fields for custom callback action IDs and variable names.

## ✨ 新增 / Added

### AI Card 卡片反馈回调 / AI Card Feedback Callback

支持自定义 AI Card 模板的点赞/点踩反馈功能。用户点击卡片中的 Feedback 组件时，后端通过 Stream 模式接收回调事件并更新卡片变量。

Support like/dislike feedback for custom AI Card templates. When users click the Feedback component in the card, the backend receives callback events via Stream mode and updates card variables.

**工作原理 / How it works：**

1. 钉钉卡片平台搭建模板时，为 Feedback 组件配置点赞/点踩按钮的回调标识（callbackId）
2. 创建卡片时设置 `callbackType: "STREAM"`，使回调通过 WebSocket 推送
3. 后端注册 `TOPIC_CARD` 监听器，接收并解析回调数据中的 `actionIds`
4. 根据 `actionIds` 匹配点赞/点踩事件，更新卡片公有变量

**配置项 / Configuration：**

在 `openclaw.json` 的钉钉连接器配置中，以下配置项与卡片回调相关（`cardTemplateId` 和 `cardTemplateKey` 为已有配置项，后三项为本次新增）：

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `cardTemplateId` | string | 内置模板 ID | AI Card 模板 ID（已有） |
| `cardTemplateKey` | string | `"msgContent"` | 卡片内容变量名（已有） |
| `cardLikeActionId` | string | `"ai_res_like"` | 点赞按钮的回调 action ID（新增） |
| `cardDislikeActionId` | string | `"ai_res_dislike"` | 点踩按钮的回调 action ID（新增） |
| `cardLikeVar` | string | `"like"` | 点赞/点踩时设置的卡片变量名，点赞=1，点踩=-1（新增） |

**配置示例 / Configuration Example：**

```json
{
  "cardTemplateId": "5e73884f-15df-40e7-9718-391a54b57f6d.schema",
  "cardTemplateKey": "content",
  "cardLikeActionId": "ai_res_like",
  "cardDislikeActionId": "ai_res_dislike",
  "cardLikeVar": "like"
}
```

以上配置项与 `cardTemplateId`、`cardTemplateKey` 同级，放在钉钉连接器的顶层配置或 per-account 配置中均可。

**卡片模板要求 / Card Template Requirements：**

1. `AICardContainer` 的 `flowStatusVar.variable` 必须绑定为 `"flowStatus"`
2. `Feedback` 组件需要在模板编辑器中设置点赞/点踩按钮的回调标识（callbackId）
3. 卡片模板中需要声明一个 int 类型的公有变量（默认名为 `like`），用于接收反馈值

**涉及的源码文件 / Source Files：**

- `src/config/schema.ts` — 新增 `cardLikeActionId`、`cardDislikeActionId`、`cardLikeVar` 配置项定义
- `src/core/connection.ts` — TOPIC_CARD 回调监听器实现（content JSON 二次解析、actionIds 匹配、变量更新）
- `src/services/messaging/card.ts` — `callbackType: "STREAM"` 启用 Stream 回调模式
- `openclaw.plugin.json` — 配置项 JSON Schema 声明

## 📥 安装升级 / Installation & Upgrade

```bash
npx openclaw@latest add @dingtalk-real-ai/dingtalk-connector
```

或指定版本：
```bash
npx openclaw@latest add @dingtalk-real-ai/dingtalk-connector@0.8.20
```

## 🔗 相关链接 / Related Links

- [完整变更日志](https://github.com/DingTalk-Real-AI/dingtalk-openclaw-connector/blob/main/CHANGELOG.md)
- [使用文档](https://github.com/DingTalk-Real-AI/dingtalk-openclaw-connector/blob/main/README.md)
- [故障排查](https://github.com/DingTalk-Real-AI/dingtalk-openclaw-connector/blob/main/docs/TROUBLESHOOTING.md)

---

**发布日期 / Release Date**：2026-04-28
**版本号 / Version**：v0.8.20
**兼容性 / Compatibility**：OpenClaw Gateway 2026.4.9+
