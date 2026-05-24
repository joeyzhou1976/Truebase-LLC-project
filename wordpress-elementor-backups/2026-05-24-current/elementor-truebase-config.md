# TrueBase 首页 Elementor 配置参数

来源：Figma Make 页面 `TB-Site-Icon-Design-Spec` 的源代码与已导出素材。

适用方式：在 WordPress 后台使用 Elementor 编辑页面时，按以下参数手动创建和配置容器、小工具、图片、按钮和样式。

## 1. 全局设置

进入：Elementor -> Site Settings。

### Global Colors

| 名称 | 色值 | 用途 |
|---|---:|---|
| Primary Black | `#0F0F0F` | 标题、主按钮文字、深色区块 |
| Footer Black | `#1A1A1A` | Footer 背景 |
| Text Gray | `#6F6F6F` | 正文、导航文字 |
| Warm White | `#F7F5F2` | 页面暖白背景 |
| Card White | `#FFFFFF` | 卡片背景 |
| Gold | `#C8A97E` | 按钮、标签、图标强调色 |
| Gold Dim | `rgba(200,169,126,0.15)` | 标签浅金背景 |
| Border | `#E5E5E5` | 边框 |

### Global Fonts

| 元素 | 字体 | 大小 | 粗细 | 行高 | 字间距 |
|---|---|---:|---:|---:|---:|
| Body | Inter | 16px | 400 | 1.6 | 0 |
| H1 | Inter | 52px | 800 | 1.12 | -0.02em |
| H2 | Inter | 40px | 800 | 1.2 | -0.02em |
| H3 大卡标题 | Inter | 26px | 800 | 1.2 | -0.01em |
| H3 普通卡标题 | Inter | 17-20px | 700 | 1.3 | 0 |
| 正文 | Inter | 14-18px | 400 | 1.65-1.75 | 0 |
| 标签 | Inter | 11-12px | 600 | 1.2 | 0.08-0.12em |
| 按钮 | Inter | 14-16px | 600-700 | 1.2 | 0.01em |

### 页面布局基础

Elementor 页面布局选择：

- Page Layout：`Elementor Full Width`
- Content Width：`Boxed`
- Boxed Width：`1200px`
- 容器左右内边距：`24px`
- 普通 Section 上下 Padding：`96px 0`
- Hero Section 上下 Padding：`100px 0`
- CTA Section 上下 Padding：`100px 0`

## 2. 图片素材

建议先把这些图片上传到 WordPress 媒体库。

本地素材位置：

```text
/Users/joeyzhou/Documents/New project/figma-exported-assets/
```

推荐上传：

| 用途 | 文件 |
|---|---|
| Logo | `named/truebase-logo.png` |
| Hero 上图 | `unsplash/hero-box.png` |
| Hero 下图 | `unsplash/hero-craft.png` |
| Product 1 | `unsplash/product-pet-urns.png` |
| Product 2 | `unsplash/product-memorial-frames.png` |
| Product 3 | `unsplash/product-keepsake-boxes.png` |
| Product 4 | `unsplash/product-engraved-sets.png` |
| Scenario 1 | `unsplash/scenario-store-display.png` |
| Scenario 2 | `unsplash/scenario-veterinary.png` |
| Scenario 3 | `unsplash/scenario-memorial-offering.png` |
| Scenario 4 | `unsplash/scenario-supply.png` |

## 3. Header / Nav

创建一个顶部 Container。

### Header Container

- Layout：Flex Row
- Content Width：Boxed `1200px`
- Min Height：`72px`
- Padding：`18px 24px`
- Align Items：Center
- Justify Content：Space Between
- Background：`#F7F5F2`
- Border Bottom：`1px solid #E5E5E5`
- Position：Sticky Top `0`
- Z-index：`100`

### Logo 组

内部 Container：

- Direction：Row
- Align Items：Center
- Gap：`10px`

Logo 图片：

- Image：`truebase-logo.png`
- Height：`36px`
- Width：Auto

文字 `TrueBase`：

- Size：`18px`
- Weight：`700`
- Color：`#0F0F0F`
- Letter Spacing：`-0.02em`

### 导航菜单

菜单文字：

- Products
- Partnership
- How It Works
- Contact

导航 Container：

- Direction：Row
- Gap：`36px`
- Align Items：Center

导航文字：

- Size：`14px`
- Weight：`500`
- Color：`#6F6F6F`

### Header 按钮

Text：`Become a Partner`

- Padding：`10px 24px`
- Radius：`8px`
- Background：`#C8A97E`
- Text Color：`#0F0F0F`
- Font Size：`14px`
- Font Weight：`600`
- Border：None

## 4. Hero Section

### Section Container

- Background：`#F7F5F2`
- Padding：`100px 0`

内部主 Container：

- Content Width：`1200px`
- Padding：`0 24px`
- Layout：Grid 或 Flex Row
- Columns：`1fr 1fr`
- Gap：`80px`
- Align Items：Center

### 左列内容

标签：

- Text：`For Professional Partners`
- Size：`12px`
- Weight：`600`
- Letter Spacing：`0.12em`
- Transform：Uppercase
- Color：`#C8A97E`
- Margin Bottom：`16px`

H1：

```text
Elevate Your Business with Premium Pet Memorial Products
```

- Size：`52px`
- Weight：`800`
- Line Height：`1.12`
- Letter Spacing：`-0.02em`
- Color：`#0F0F0F`
- Margin Bottom：`28px`

正文：

```text
Designed for pet stores, clinics, and memorial service providers seeking quality and customization.
```

- Size：`18px`
- Color：`#6F6F6F`
- Line Height：`1.75`
- Margin Bottom：`44px`

### 数据卡片

三列 Container：

- Columns：3
- Gap：`12px`
- Margin Bottom：`44px`

每个数据卡：

- Background：`#FFFFFF`
- Border：`1px solid #E5E5E5`
- Border Radius：`8px`
- Padding：`22px 16px`
- Text Align：Center

数据：

| 数值 | 标签 |
|---|---|
| `500+` | Global Partners |
| `30+` | Product Variations |
| `7-Day` | Avg. Production |

数值样式：

- Size：`30px`
- Weight：`800`
- Color：`#0F0F0F`
- Line Height：`1`
- Margin Bottom：`10px`

标签样式：

- Size：`12px`
- Color：`#6F6F6F`
- Line Height：`1.5`

### Hero 按钮组

Container：

- Direction：Row
- Gap：`12px`
- Align Items：Center

Primary Button：

- Text：`Become a Partner`
- Padding：`16px 36px`
- Radius：`8px`
- Background：`#C8A97E`
- Text：`#0F0F0F`
- Font Size：`16px`
- Weight：`700`

Secondary Button：

- Text：`Request Catalog`
- Padding：`14px 28px`
- Radius：`8px`
- Border：`1.5px solid #E5E5E5`
- Background：Transparent
- Text：`#6F6F6F`
- Font Size：`14px`
- Weight：`500`

### 右列图片

Container：

- Layout：Grid 或 Column
- Rows：上图约 `1.1fr`，下图约 `0.9fr`
- Gap：`12px`
- Height：`520px`

图片通用：

- Border Radius：`12px`
- Overflow：Hidden
- Object Fit：Cover
- Width/Height：100%

上图：`hero-box.png`

下图：`hero-craft.png`

## 5. Who We Serve

Section：

- Background：`#FFFFFF`
- Padding：`96px 0`

标题区：

- Text Align：Center
- Margin Bottom：`64px`

标签：`Our Partners`

H2：`Who We Serve`

- H2 Size：`40px`
- Weight：`800`
- Color：`#0F0F0F`
- Margin Bottom：`16px`

描述：

```text
Trusted by professional businesses who value quality, reliability, and long-term relationships.
```

- Size：`17px`
- Color：`#6F6F6F`
- Max Width：`520px`
- Align：Center

### 三个服务卡片

三列 Container：

- Columns：3
- Gap：`24px`

卡片：

- Background：`#F7F5F2`
- Border Radius：`12px`
- Padding：`40px 32px`
- Text Align：Center
- Box Shadow：`0 2px 8px rgba(0,0,0,0.04)`

图标框：

- Width/Height：`72px`
- Radius：`12px`
- Background：`#FFFFFF`
- Border：`1px solid #E5E5E5`
- Margin：`0 auto 20px`

图标建议：

- Pet Stores：Home / Store icon
- Veterinary Clinics：Heart icon
- Pet Funeral Services：Flower / Sun icon
- Icon Size：`40px`
- Icon Color：`#C8A97E`

内容：

| 标题 | 描述 |
|---|---|
| Pet Stores | Expand your product line with premium memorial items that help pet owners honor their beloved companions with dignity. |
| Veterinary Clinics | Provide compassionate aftercare solutions to families during difficult times — from consultation room to home. |
| Pet Funeral Services | Offer comprehensive memorial packages with our customizable, high-quality commemorative product collections. |

标题：

- Size：`20px`
- Weight：`700`
- Color：`#0F0F0F`
- Margin Bottom：`12px`

正文：

- Size：`15px`
- Color：`#6F6F6F`
- Line Height：`1.7`

## 6. Product Solutions

Section：

- Background：`#F7F5F2`
- Padding：`96px 0`

标题：

- Label：`Product Catalog`
- H2：`Our Product Solutions`
- Description：`Designed to support your business offerings with customizable memorial solutions`

产品网格：

- Columns：4
- Gap：`24px`

每个产品卡：

- 图片 Aspect Ratio：`4 / 5`
- 图片 Radius：`12px`
- Overflow：Hidden
- Margin Bottom：`20px`
- Shadow：`0 2px 12px rgba(0,0,0,0.06)`

标签：

- Size：`11px`
- Weight：`600`
- Letter Spacing：`0.08em`
- Transform：Uppercase
- Color：`#C8A97E`
- Background：`rgba(200,169,126,0.15)`
- Padding：`3px 10px`
- Radius：`4px`
- Margin Bottom：`10px`

产品内容：

| 图片 | 标签 | 标题 | 描述 |
|---|---|---|---|
| `product-pet-urns.png` | Made to Order | Pet Urns | Offer premium memorial options that enhance your in-store product value and customer experience. |
| `product-memorial-frames.png` | Fully Customizable | Memorial Frames | Provide personalized memorial solutions tailored to your customers' needs and your brand identity. |
| `product-keepsake-boxes.png` | Private Label Ready | Keepsake Boxes | Add a private-label product line that drives repeat business and deepens customer loyalty. |
| `product-engraved-sets.png` | Multi-Material Options | Custom Engraved Sets | Differentiate your offerings with coordinated memorial collections across multiple materials. |

产品标题：

- Size：`16px`
- Weight：`700`
- Color：`#0F0F0F`
- Margin Bottom：`10px`

产品描述：

- Size：`14px`
- Color：`#6F6F6F`
- Line Height：`1.65`

## 7. Why TrueBase

Section：

- Background：`#FFFFFF`
- Padding：`96px 0`

Label：`Why TrueBase`

H2：`Why Businesses Choose TrueBase`

Description：`Built for long-term business partnerships`

四列 Container：

- Columns：4
- Gap：`24px`

卡片：

- Background：`#F7F5F2`
- Border Radius：`12px`
- Padding：`32px 28px`

图标框：

- Width/Height：`48px`
- Radius：`10px`
- Background：`#0F0F0F`
- Icon Color：`#FFFFFF`
- Margin Bottom：`20px`

内容：

| 标题 | 描述 |
|---|---|
| Fully Customizable | Every detail adapted to your brand, your customers, and your market. |
| Premium Quality Materials | Sourced from trusted suppliers with consistent quality control. |
| Stable Supply & Production | Reliable manufacturing with clear timelines and low MOQs. |
| Fast Turnaround Time | 7-day average production. Priority options available for urgent orders. |

标题：

- Size：`17px`
- Weight：`700`

描述：

- Size：`14px`
- Color：`#6F6F6F`
- Line Height：`1.65`

## 8. Partnership Models

Section：

- Background：`#F7F5F2`
- Padding：`96px 0`
- CSS ID：`partnership`

Label：`Partnership Models`

H2：`Flexible Partnership Models`

Description：`Choose the model that fits your business`

三列 Container：

- Columns：3
- Gap：`20px`

### 普通合作卡片

- Background：`#FFFFFF`
- Border：`1px solid #E5E5E5`
- Border Radius：`12px`
- Padding：`40px 36px`

编号：

- Size：`12px`
- Weight：`600`
- Letter Spacing：`0.1em`
- Uppercase
- Color：`#6F6F6F`
- Margin Bottom：`20px`

标题：

- Size：`26px`
- Weight：`800`
- Letter Spacing：`-0.01em`
- Margin Bottom：`16px`

正文：

- Size：`15px`
- Color：`#6F6F6F`
- Line Height：`1.7`
- Margin Bottom：`24px`

列表：

- Size：`14px`
- Color：`#6F6F6F`
- Gap / Margin Bottom：`10px`
- Bullet：金色圆点 `#C8A97E`，`6px`

### Card 1

编号：`01`

标题：`Wholesale`

正文：

```text
Bulk purchasing at competitive prices with stable supply, consistent quality control, and dedicated account support.
```

列表：

- Low minimum order quantity
- Consistent quality control
- Dedicated account manager

链接：`Learn more`

### Featured Card

编号：`02`

标题：`Customization`

卡片样式：

- Background：`#0F0F0F`
- Border Radius：`12px`
- Padding：`44px 36px 40px`
- Box Shadow：`0 24px 60px rgba(0,0,0,0.22)`

角标：

- Text：`Most Popular`
- Position：Top `20px` Right `20px`
- Background：`#C8A97E`
- Color：`#0F0F0F`
- Size：`12px`
- Weight：`700`
- Letter Spacing：`0.1em`
- Padding：`5px 12px`
- Radius：`4px`

正文：

```text
Tailored products based on your customers' specific needs — materials, sizes, engravings, and packaging all configured for your brand.
```

列表：

- Custom dimensions & materials
- Full branding & packaging
- Design support included

按钮：

- Text：`Start Customizing`
- Width：`100%`
- Padding：`14px`
- Radius：`8px`
- Background：`#C8A97E`
- Text：`#0F0F0F`
- Size：`15px`
- Weight：`700`

### Card 3

编号：`03`

标题：`Private Label / OEM`

正文：

```text
Build and grow your own brand using our manufacturing capabilities. Full production support from prototyping to delivery.
```

列表：

- Your brand, our production
- Full OEM & ODM support
- Prototype to bulk ready

链接：`Learn more`

## 9. How It Works

Section：

- Background：`#FFFFFF`
- Padding：`96px 0`

Label：`Process`

H2：`How It Works`

Description：`A simple and efficient process from inquiry to delivery`

流程容器：

- Layout：Horizontal Flex
- Justify：Space Between
- Position：Relative

连接线：

- Top：`28px`
- Left/Right：`10%`
- Height：`1px`
- Style：Dashed
- Color：`#E5E5E5`

每个步骤：

- Width：平均 5 列
- Text Align：Center
- Padding：`0 12px`

圆形编号：

- Width/Height：`56px`
- Radius：`50%`
- Background：`#0F0F0F`
- Border：`3px solid #F7F5F2`
- Number Color：`#C8A97E`
- Font Size：`13px`
- Weight：`700`
- Margin Bottom：`20px`

步骤：

| 编号 | 标题 | 描述 |
|---|---|---|
| 01 | Contact Us | Reach out via email or form. We respond within 24 hours. |
| 02 | Product Selection | Browse our catalog and choose the right product lines. |
| 03 | Customization | Work with our team to configure materials, engravings, and branding. |
| 04 | Production | Your order enters production with regular status updates. |
| 05 | Delivery | Packaged and shipped directly to your business address. |

标题：

- Size：`15px`
- Weight：`700`
- Color：`#0F0F0F`
- Margin Bottom：`8px`

描述：

- Size：`13px`
- Color：`#6F6F6F`
- Line Height：`1.6`

## 10. Application Scenarios

Section：

- Background：`#F7F5F2`
- Padding：`96px 0`

Label：`Use Cases`

H2：`Application Scenarios`

Description：`Where our products create value for your business`

网格：

- Columns：2
- Gap：`20px`

场景卡：

- Aspect Ratio：`3 / 2`
- Border Radius：`12px`
- Overflow：Hidden
- Position：Relative

图片：

- Width/Height：100%
- Object Fit：Cover

覆盖层：

- Gradient：`linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.12) 100%)`

文字层：

- Position：Absolute
- Bottom：`0`
- Left/Right：`0`
- Padding：`28px`

内容：

| 图片 | Label | 标题 | 描述 |
|---|---|---|---|
| `scenario-store-display.png` | In-Store Memorial Display | In-Store Memorial Display | Curated product displays that drive additional revenue in retail environments. |
| `scenario-veterinary.png` | Veterinary Service Integration | Veterinary Service Integration | Compassionate, discreet product offerings integrated into clinic aftercare protocols. |
| `scenario-memorial-offering.png` | Premium Memorial Offering | Premium Memorial Offering | Complete collections for funeral service providers to offer families a meaningful farewell. |
| `scenario-supply.png` | Reliable Supply & Fulfillment | Reliable Supply & Fulfillment | Consistent supply chain with predictable lead times and flexible order volumes. |

Label：

- Size：`11px`
- Weight：`600`
- Letter Spacing：`0.1em`
- Uppercase
- Color：`#C8A97E`
- Margin Bottom：`8px`

标题：

- Size：`20px`
- Weight：`800`
- Color：`#FFFFFF`
- Margin Bottom：`8px`

描述：

- Size：`14px`
- Color：`rgba(255,255,255,0.85)`
- Line Height：`1.65`

## 11. CTA

Section：

- Background：`#0F0F0F`
- Padding：`100px 0`

Container：

- Width：`1200px`
- Text Align：Center

Label：`Get Started`

H2：

```text
Start Your Partnership Today
```

- Size：`44px`
- Weight：`800`
- Color：`#FFFFFF`
- Line Height：`1.15`
- Letter Spacing：`-0.02em`
- Margin Bottom：`20px`

正文：

```text
Join our network of trusted partners and offer premium memorial products to your customers.
```

- Size：`18px`
- Color：`rgba(255,255,255,0.6)`
- Line Height：`1.75`
- Max Width：`560px`
- Margin：`0 auto 16px`

小字：

```text
Start with a conversation. No commitment required.
```

- Size：`14px`
- Color：`rgba(255,255,255,0.35)`
- Margin Bottom：`44px`

按钮组：

- Direction：Row
- Justify：Center
- Gap：`16px`

Primary：

- Text：`Become a Partner`
- Padding：`16px 40px`
- Radius：`8px`
- Background：`#C8A97E`
- Text：`#0F0F0F`
- Size：`16px`
- Weight：`700`

Secondary：

- Text：`Request Samples` / `Get a Quote`
- Padding：`14px 36px`
- Radius：`8px`
- Border：`1.5px solid rgba(255,255,255,0.3)`
- Background：Transparent
- Text：`#FFFFFF`
- Size：`15px`
- Weight：`600`

Trust signal：

- Text：`Response within 24 hours`
- Margin Top：`24px`
- Icon Color：`#C8A97E`
- Text Color：`rgba(255,255,255,0.35)`
- Size：`13px`

## 12. Footer

Footer Section：

- Background：`#1A1A1A`
- Padding：`64px 0 40px`
- CSS ID：`contact`

主网格：

- Columns：`1.4fr 1fr 1fr 1fr`
- Gap：`48px`
- Margin Bottom：`48px`

Logo：

- Height：`30px`
- Text：`TrueBase`
- Text Size：`16px`
- Text Weight：`700`
- Color：`#FFFFFF`

品牌描述：

```text
Premium memorial solutions for professional partners.
```

- Size：`14px`
- Color：`rgba(255,255,255,0.45)`
- Line Height：`1.7`
- Max Width：`240px`

社交小方块：

- Size：`32px`
- Radius：`6px`
- Border：`1px solid rgba(255,255,255,0.12)`
- Text：`W`、`L`、`E`
- Text Color：`rgba(255,255,255,0.45)`
- Font Size：`10px`

Footer 列标题：

- Size：`13px`
- Weight：`700`
- Color：`#FFFFFF`
- Letter Spacing：`0.08em`
- Uppercase
- Margin Bottom：`20px`

链接：

- Size：`14px`
- Color：`rgba(255,255,255,0.45)`
- Line Height：`1.8`
- Margin Bottom：`14px`

Products 列：

- Pet Urns
- Memorial Frames
- Keepsake Boxes
- Custom Sets
- Private Label

Partnership 列：

- Wholesale
- Customization
- OEM / ODM
- Request Catalog
- Become a Partner

Contact 列：

- `partner@truebaseholding.com`
- `+1 626 452 7696`
- `Mon – Fri  09:00 – 18:00 CST`

底部栏：

- Border Top：`1px solid rgba(255,255,255,0.08)`
- Padding Top：`32px`
- Layout：Row / Space Between
- Text Size：`13px`
- Text Color：`rgba(255,255,255,0.25)`

左侧：

```text
© 2026 TrueBase. All rights reserved.
```

右侧：

- Privacy Policy
- Terms of Service
- Cookie Policy

## 13. 响应式建议

### Tablet

- Hero：两列改一列
- Product：4 列改 2 列
- Why：4 列改 2 列
- Partnership：3 列改 1 列
- Process：5 列改 1 列或横向滚动
- Scenarios：2 列保持或改 1 列

### Mobile

- Section Padding：`64px 0`
- Container Padding：`0 20px`
- H1：`36px`
- H2：`30px`
- Hero 图片容器高度：Auto
- 数据卡：3 列改 1 列
- 产品、场景、Footer：全部 1 列
- CTA 按钮：100% 宽度，垂直排列

## 14. 可选 Elementor 自定义 CSS

如果使用 Elementor Pro，可给对应元素添加 CSS Class，再加入这些 CSS。

```css
.tb-card-hover {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.tb-card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.10);
}

.tb-image-hover img {
  transition: transform 0.4s ease;
}

.tb-image-hover:hover img {
  transform: scale(1.04);
}

.tb-scenario-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.12) 100%);
}
```

