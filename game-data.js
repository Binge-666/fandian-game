window.GAME_CONFIG = {
  duration: 60,
  hearts: 3,
  maxItems: 4,
  source: "麦当劳 MCP 菜单快照 · 厦门中山路门店",
  title: "饭点大作战",
  /* 部署后可填正式地址（如 https://xxx.edgeone.app，结尾不带 /），
     留空则自动使用当前网址；本地双击玩时无网址，复制的是纯文字战绩 */
  shareUrl: ""
};

window.GAME_ITEMS = [
  { id: "1406", name: "板烧鸡腿堡", emoji: "🍔", group: "main", kcal: 391, price: 23.5, protein: 23, spicy: false, fried: false },
  { id: "1440", name: "麦辣鸡腿汉堡", emoji: "🌶️", group: "main", kcal: 485, price: 22.5, protein: 24, spicy: true, fried: false },
  { id: "1120", name: "双层吉士汉堡", emoji: "🧀", group: "main", kcal: 429, price: 23, protein: 27, spicy: false, fried: false },
  { id: "1106", name: "培根蔬萃双层牛堡", emoji: "🥓", group: "main", kcal: 442, price: 25, protein: 24, spicy: false, fried: false },
  { id: "521156", name: "那么大鸡排（椒盐）", emoji: "🍗", group: "main", kcal: 385, price: 14, protein: 24, spicy: true, fried: true },
  { id: "9900003586", name: "双层深海鳕鱼堡", emoji: "🐟", group: "main", kcal: 485, price: 24, protein: 28, spicy: false, fried: false },
  { id: "4810", name: "薯条", emoji: "🍟", group: "side", kcal: 289, price: 14.5, protein: 4, spicy: false, fried: true },
  { id: "1401", name: "麦乐鸡", emoji: "🍗", group: "side", kcal: 213, price: 14, protein: 12, spicy: false, fried: true },
  { id: "4437", name: "玉米杯", emoji: "🌽", group: "side", kcal: 53, price: 13, protein: 2, spicy: false, fried: false },
  { id: "6102", name: "苹果片", emoji: "🍎", group: "side", kcal: 32, price: 7, protein: 0, spicy: false, fried: false },
  { id: "9900008751", name: "可乐", emoji: "🥤", group: "drink", kcal: 147, price: 9.5, protein: 0, spicy: false, fried: false },
  { id: "3505", name: "锡兰红茶", emoji: "🍵", group: "drink", kcal: 2, price: 10.5, protein: 0, spicy: false, fried: false },
  { id: "3757", name: "纯悦", emoji: "💧", group: "drink", kcal: 0, price: 7.5, protein: 0, spicy: false, fried: false },
  { id: "510479", name: "燕麦奶铁", emoji: "☕", group: "drink", kcal: 167, price: 9.9, protein: 4, spicy: false, fried: false },
  { id: "515837", name: "圆筒冰淇淋", emoji: "🍦", group: "dessert", kcal: 93, price: 5, protein: 2, spicy: false, fried: false },
  { id: "9900008754", name: "经典麦旋风", emoji: "🍨", group: "dessert", kcal: 266, price: 15.5, protein: 5, spicy: false, fried: false }
];

window.GAME_CUSTOMERS = [
  { slot: "0", name: "加班的小李", face: "🧑‍💻", line: "赶时间，快点。" },
  { slot: "1", name: "健身的小王", face: "💪", line: "今天练腿，别太离谱。" },
  { slot: "2", name: "带娃的张姐", face: "👩‍🍼", line: "孩子饿了，拜托快一点。" },
  { slot: "3", name: "赶课的学生", face: "🎒", line: "还有十分钟上课。" },
  { slot: "4", name: "夜宵的阿强", face: "🌙", line: "饿得能吞下一头牛。" },
  { slot: "5", name: "减脂的琳琳", face: "🥗", line: "热量帮我算准一点。" },
  { slot: "6", name: "开会的老周", face: "🧑‍💼", line: "简单点，别超预算。" },
  { slot: "7", name: "探店的小雨", face: "📷", line: "好吃的话我给你拍照。" }
];
