---
title: 《编程农场》单进程木材排行榜做法
---

我的Steam家庭库里莫名其妙（并非莫名其妙）多出了一个名叫[《编程农场》（<cite lang=en>The Farmer Was Replaced</cite>）](https://store.steampowered.com/app/2060160/)的游戏。这个游戏制作得相当粗糙，使用的编程语言更是拿Python取其糟粕去其精华，但是有好友想看我玩，而且可以摸🐖（`pet_the_piggy()`），就玩了两天。现在解锁了排行榜，登上了单进程木材排行榜#16。

<video src=run.webm controls></video>

<img src=leaderboard.webp alt="Wood_Single&#10;Personal Best: 06:42.048&#10;Global Rank: #16">

主要思路：

<img src=shu.avif alt="把你种在土里，你重新长吧。（黍/语音记录/作战中4）">

由于伴生种植16000%的数值加成实在是过于恐怖，不满足伴生条件的作物甚至没有等待成熟并收获的必要。种植伴生植物需要先移动到目标地块再种植，很费时间。不如预先全场种满任意一种可能的伴生植物，然后殴打木头直到它的伴生条件自动得到满足。

文档描述“伴生对象的坐标也会随机出现在除自己以外的周围三步格子的范围内”，指的是[火山范围](https://prts.wiki/w/艾雅法拉#:~:text=火山)。在2×2格点上种树，其余格全种草，每次种树有1/3的概率要求伴生植物为草，20/24的概率伴生格已经是草，刷几次就能刷到已经满足要求的树。

```python
def main():
	round = 0
	pet_the_piggy()  # 等待第一桶水
	for i in range(4):
		for j in range(4):
			use_item(Items.Water)
			move(East)
			move(East)
		move(North)
		move(North)
	while True:
		for i in range(4):
			for j in range(4):
				harvest()
				if num_items(Items.Wood) >= 500000000:
					return
				if not (round % 9):
					use_item(Items.Water)  # 不浇水的话，转完一圈都还没长好
				while True:
					plant(Entities.Tree)
					t, (x, y) = get_companion()
					if t == Entities.Grass and (x % 2 or y % 2):
						break
					harvest()
				move(East)
				move(East)
			move(North)
			move(North)
		round += 1
main()
```
