# 除匪务尽原型

一个零依赖的 `HTML5 Canvas` 横版清版格斗原型，目标是快速验证类似早期 Flash 清关动作游戏的节奏和手感。

## 运行

直接打开 [index.html](/mnt/c/Users/chengdu/Desktop/smash commie pig/index.html) 即可。

## 操作

- `方向键`：移动
- `连按 左 / 右`：冲刺
- `Shift + 左 / 右`：稳定冲刺
- `A`：轻击，可接三段
- `S`：重击
- `A + S`：升龙
- `Q`：扫腿
- `下 + S`：波动冲拳
- `冲刺中 + A`：冲膝
- `F`：抓取敌人 / 拾取物件 / 投掷
- `D`：爆气清场
- `R`：重新开始

## 当前内容

- 横向滚屏关卡
- 四段锁区清场
- 轻重攻击与基础连段
- 受击、击飞、连击数、分数、爆气槽
- 命中停顿、受击挤压和更明确的招式阶段动作
- 玩家与敌人已切到 sprite 贴图渲染，不再使用纯程序人形
- 普通杂兵改用授权更清晰的免费蓝制服角色素材改造，精英怪和 Boss 改用更接近生化防护服的 Hazmat 动画素材
- 抓取敌人、场景物件和投掷伤害
- 两类杂兵和一个带二阶段的关底 Boss
- 地面预警和更清晰的 Boss 攻击范围提示
- 爆气改成金色变身式气焰，包含火焰轮廓、闪电、竖向能量柱、白闪、放射线和爆圈特效
- 新增 `扫腿 / 波动冲拳 / 冲膝` 三种更接近格斗游戏节奏的攻击分支

## 下一步建议

- 做更细的抓投分支和空中追击
- 给 Boss 加二阶段和更清晰的招式判定
- 补手绘逐帧动画和音效
- 拆成更正式的项目结构，接入资源管线

## 素材说明

- 玩家贴图改为 itch.io 上的 `2D Fighter character`，作者 `Kalponic Studio`，页面说明允许用于商用和非商用游戏
- 普通杂兵贴图来自 CraftPix / Free Game Assets 的 `Free 2D Police Character Sprites`，已裁切成游戏所需帧并做轻量调色；精英怪和 Boss 临时使用 Kruk2024 的 `Hazmat guy 2d animations` 改色素材，页面为免费可下载但未明确标注 CC0/开源授权，正式发布前需要确认授权
- 爆气特效贴图来自 `OpenGameArt` 上的 `FX charge` 与 `Ring Explosion`，授权为 `CC0`
- 资源文件位于 [assets/player_kalponic_structured](/mnt/c/Users/chengdu/Desktop/smash%20commie%20pig/assets/player_kalponic_structured)、[assets/enemies](/mnt/c/Users/chengdu/Desktop/smash%20commie%20pig/assets/enemies) 和 [assets/vfx](/mnt/c/Users/chengdu/Desktop/smash%20commie%20pig/assets/vfx)
