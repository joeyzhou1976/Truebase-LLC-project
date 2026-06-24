# TrueBase Homepage WordPress 使用说明

这是根据文件夹中的 `truebase-homepage-design (2).png` 重新对齐后的 WordPress 插件版本。页面主题为 TrueBase 的 B2B 宠物纪念产品站，而不是上一版通用商务服务页。

## 2026-05-24 更新

- 首页导航下方新增 14 秒 TrueBase 记忆开场动画。
- 使用上传的狗狗真实照片作为主视觉，表现人宠陪伴、互相依靠、共同生活与纪念留存。
- 新增无版权本地合成舒缓背景音，前端提供 `Play sound` / `Pause sound` 按钮。
- 插件版本更新为 `1.2.0`，用于刷新浏览器缓存。

## 对齐结果

已对齐的内容：

- Opening Film：TrueBase 记忆开场动画
- 顶部导航：Products、Partnership、How It Works、Contact、Become a Partner
- Hero 文案：`Elevate Your Business with Premium Pet Memorial Products`
- Hero 数据卡：`500+`、`30+`、`7-Day`
- Who We Serve：Pet Stores、Veterinary Clinics、Pet Funeral Services
- Product Solutions：Pet Urns、Memorial Frames、Keepsake Boxes、Custom Engraved Sets
- Why TrueBase：四个优势卡片
- Partnership Models：Wholesale、Customization、Private Label / OEM
- How It Works：五步流程
- Application Scenarios：场景卡片
- 深色 CTA 和深色 Footer
- 使用本地 `经典TB_120x90.png` 作为 Logo

已从整页 PNG 中裁出的临时素材：

- `assets/images/hero-store.png`
- `assets/images/hero-craft.png`
- `assets/images/product-urns.png`
- `assets/images/product-frames.png`
- `assets/images/product-keepsake.png`
- `assets/images/product-engraved.png`
- `assets/images/scenario-store.png`
- `assets/images/truebase-logo.png`

## 仍不完全一致的地方

当前只有整页 PNG，没有 Figma 原始导出的独立图片/SVG，所以部分场景图和图标使用了裁图或文字化图标。若要做到更接近 1:1，请从 Figma 导出：

- 所有产品图片
- 所有场景图片
- Header Logo SVG/PNG
- 三个服务对象图标
- 四个优势图标

替换到 `truebase-homepage/assets/images/` 后即可。

## 安装方式

1. 将整个 `truebase-homepage` 文件夹上传到 WordPress 的 `/wp-content/plugins/` 目录，或在后台上传 `truebase-homepage.zip`。
2. 进入 WordPress 后台：插件 -> 已安装插件。
3. 启用 `Truebase Homepage`。
4. 新建一个页面，例如 `Home`。
5. 在页面内容中加入短代码：

```text
[truebase_homepage]
```

6. 将这个页面设置为首页：设置 -> 阅读 -> 您的主页显示 -> 一个静态页面。

## 在 Elementor 中使用

1. 用 Elementor 编辑目标页面。
2. 拖入 `Shortcode` 小工具。
3. 粘贴：

```text
[truebase_homepage]
```

4. 发布页面。

## 修改文字

页面文案在：

```text
truebase-homepage/truebase-homepage.php
```

可以直接搜索对应英文标题进行替换。

## 修改颜色和间距

全局设计变量在：

```text
truebase-homepage/assets/truebase-homepage.css
```

优先修改文件顶部的 `:root` 变量：

```css
:root {
  --tb-primary: #111111;
  --tb-accent: #c8a97e;
  --tb-bg: #f7f5f2;
}
```

## 注意

已使用 PHP CLI 做过 `php -l` 语法检查。上传后如遇主题样式覆盖，可优先检查当前主题是否对短代码内容设置了全局字体、链接或按钮样式。
