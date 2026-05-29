/**
 * 示例词典
 * 包含常见的中英文对照，用于测试
 * 词汇量: 670
 */

export interface DictEntry {
  zh: string;
  en: string;
  category: "noun" | "verb" | "status" | "ui" | "business" | "tech" | "action";
}

export type Dictionary = DictEntry[];

export const SAMPLE_DICTIONARY: Dictionary = [
  {
    "zh": "我",
    "en": "i",
    "category": "noun"
  },
  {
    "zh": "你",
    "en": "you",
    "category": "noun"
  },
  {
    "zh": "他",
    "en": "he",
    "category": "noun"
  },
  {
    "zh": "她",
    "en": "she",
    "category": "noun"
  },
  {
    "zh": "它",
    "en": "it",
    "category": "noun"
  },
  {
    "zh": "我们",
    "en": "we",
    "category": "noun"
  },
  {
    "zh": "你们",
    "en": "you",
    "category": "noun"
  },
  {
    "zh": "他们",
    "en": "they",
    "category": "noun"
  },
  {
    "zh": "自己",
    "en": "self",
    "category": "noun"
  },
  {
    "zh": "别人",
    "en": "others",
    "category": "noun"
  },
  {
    "zh": "人",
    "en": "person",
    "category": "noun"
  },
  {
    "zh": "男人",
    "en": "man",
    "category": "noun"
  },
  {
    "zh": "女人",
    "en": "woman",
    "category": "noun"
  },
  {
    "zh": "孩子",
    "en": "child",
    "category": "noun"
  },
  {
    "zh": "孩子",
    "en": "kid",
    "category": "noun"
  },
  {
    "zh": "父亲",
    "en": "father",
    "category": "noun"
  },
  {
    "zh": "母亲",
    "en": "mother",
    "category": "noun"
  },
  {
    "zh": "儿子",
    "en": "son",
    "category": "noun"
  },
  {
    "zh": "女儿",
    "en": "daughter",
    "category": "noun"
  },
  {
    "zh": "兄弟",
    "en": "brother",
    "category": "noun"
  },
  {
    "zh": "姐妹",
    "en": "sister",
    "category": "noun"
  },
  {
    "zh": "丈夫",
    "en": "husband",
    "category": "noun"
  },
  {
    "zh": "妻子",
    "en": "wife",
    "category": "noun"
  },
  {
    "zh": "朋友",
    "en": "friend",
    "category": "noun"
  },
  {
    "zh": "敌人",
    "en": "enemy",
    "category": "noun"
  },
  {
    "zh": "邻居",
    "en": "neighbor",
    "category": "noun"
  },
  {
    "zh": "客人",
    "en": "guest",
    "category": "noun"
  },
  {
    "zh": "主人",
    "en": "host",
    "category": "noun"
  },
  {
    "zh": "老师",
    "en": "teacher",
    "category": "noun"
  },
  {
    "zh": "学生",
    "en": "student",
    "category": "noun"
  },
  {
    "zh": "医生",
    "en": "doctor",
    "category": "noun"
  },
  {
    "zh": "护士",
    "en": "nurse",
    "category": "noun"
  },
  {
    "zh": "警察",
    "en": "police",
    "category": "noun"
  },
  {
    "zh": "律师",
    "en": "lawyer",
    "category": "noun"
  },
  {
    "zh": "工程师",
    "en": "engineer",
    "category": "noun"
  },
  {
    "zh": "程序员",
    "en": "programmer",
    "category": "noun"
  },
  {
    "zh": "设计师",
    "en": "designer",
    "category": "noun"
  },
  {
    "zh": "经理",
    "en": "manager",
    "category": "noun"
  },
  {
    "zh": "老板",
    "en": "boss",
    "category": "noun"
  },
  {
    "zh": "员工",
    "en": "employee",
    "category": "noun"
  },
  {
    "zh": "同事",
    "en": "colleague",
    "category": "noun"
  },
  {
    "zh": "领导",
    "en": "leader",
    "category": "noun"
  },
  {
    "zh": "下属",
    "en": "subordinate",
    "category": "noun"
  },
  {
    "zh": "头",
    "en": "head",
    "category": "noun"
  },
  {
    "zh": "脸",
    "en": "face",
    "category": "noun"
  },
  {
    "zh": "眼睛",
    "en": "eye",
    "category": "noun"
  },
  {
    "zh": "耳朵",
    "en": "ear",
    "category": "noun"
  },
  {
    "zh": "鼻子",
    "en": "nose",
    "category": "noun"
  },
  {
    "zh": "嘴巴",
    "en": "mouth",
    "category": "noun"
  },
  {
    "zh": "舌头",
    "en": "tongue",
    "category": "noun"
  },
  {
    "zh": "牙齿",
    "en": "tooth",
    "category": "noun"
  },
  {
    "zh": "头发",
    "en": "hair",
    "category": "noun"
  },
  {
    "zh": "脖子",
    "en": "neck",
    "category": "noun"
  },
  {
    "zh": "肩膀",
    "en": "shoulder",
    "category": "noun"
  },
  {
    "zh": "手臂",
    "en": "arm",
    "category": "noun"
  },
  {
    "zh": "手",
    "en": "hand",
    "category": "noun"
  },
  {
    "zh": "手指",
    "en": "finger",
    "category": "noun"
  },
  {
    "zh": "腿",
    "en": "leg",
    "category": "noun"
  },
  {
    "zh": "脚",
    "en": "foot",
    "category": "noun"
  },
  {
    "zh": "脚趾",
    "en": "toe",
    "category": "noun"
  },
  {
    "zh": "心脏",
    "en": "heart",
    "category": "noun"
  },
  {
    "zh": "肺",
    "en": "lung",
    "category": "noun"
  },
  {
    "zh": "肝",
    "en": "liver",
    "category": "noun"
  },
  {
    "zh": "胃",
    "en": "stomach",
    "category": "noun"
  },
  {
    "zh": "肠",
    "en": "intestine",
    "category": "noun"
  },
  {
    "zh": "肾",
    "en": "kidney",
    "category": "noun"
  },
  {
    "zh": "脑",
    "en": "brain",
    "category": "noun"
  },
  {
    "zh": "血",
    "en": "blood",
    "category": "noun"
  },
  {
    "zh": "肉",
    "en": "meat",
    "category": "noun"
  },
  {
    "zh": "骨头",
    "en": "bone",
    "category": "noun"
  },
  {
    "zh": "皮肤",
    "en": "skin",
    "category": "noun"
  },
  {
    "zh": "汗",
    "en": "sweat",
    "category": "noun"
  },
  {
    "zh": "泪",
    "en": "tear",
    "category": "noun"
  },
  {
    "zh": "天",
    "en": "sky",
    "category": "noun"
  },
  {
    "zh": "地",
    "en": "earth",
    "category": "noun"
  },
  {
    "zh": "日",
    "en": "sun",
    "category": "noun"
  },
  {
    "zh": "月",
    "en": "moon",
    "category": "noun"
  },
  {
    "zh": "星",
    "en": "star",
    "category": "noun"
  },
  {
    "zh": "云",
    "en": "cloud",
    "category": "noun"
  },
  {
    "zh": "雨",
    "en": "rain",
    "category": "noun"
  },
  {
    "zh": "雪",
    "en": "snow",
    "category": "noun"
  },
  {
    "zh": "风",
    "en": "wind",
    "category": "noun"
  },
  {
    "zh": "雷",
    "en": "thunder",
    "category": "noun"
  },
  {
    "zh": "电",
    "en": "electricity",
    "category": "noun"
  },
  {
    "zh": "光",
    "en": "light",
    "category": "noun"
  },
  {
    "zh": "影",
    "en": "shadow",
    "category": "noun"
  },
  {
    "zh": "声",
    "en": "sound",
    "category": "noun"
  },
  {
    "zh": "音",
    "en": "sound",
    "category": "noun"
  },
  {
    "zh": "色",
    "en": "color",
    "category": "noun"
  },
  {
    "zh": "香",
    "en": "fragrance",
    "category": "noun"
  },
  {
    "zh": "臭",
    "en": "smell",
    "category": "noun"
  },
  {
    "zh": "味",
    "en": "taste",
    "category": "noun"
  },
  {
    "zh": "触",
    "en": "touch",
    "category": "noun"
  },
  {
    "zh": "水",
    "en": "water",
    "category": "noun"
  },
  {
    "zh": "火",
    "en": "fire",
    "category": "noun"
  },
  {
    "zh": "土",
    "en": "earth",
    "category": "noun"
  },
  {
    "zh": "金",
    "en": "gold",
    "category": "noun"
  },
  {
    "zh": "木",
    "en": "wood",
    "category": "noun"
  },
  {
    "zh": "石",
    "en": "stone",
    "category": "noun"
  },
  {
    "zh": "山",
    "en": "mountain",
    "category": "noun"
  },
  {
    "zh": "河",
    "en": "river",
    "category": "noun"
  },
  {
    "zh": "海",
    "en": "sea",
    "category": "noun"
  },
  {
    "zh": "湖",
    "en": "lake",
    "category": "noun"
  },
  {
    "zh": "江",
    "en": "river",
    "category": "noun"
  },
  {
    "zh": "溪",
    "en": "stream",
    "category": "noun"
  },
  {
    "zh": "树",
    "en": "tree",
    "category": "noun"
  },
  {
    "zh": "草",
    "en": "grass",
    "category": "noun"
  },
  {
    "zh": "花",
    "en": "flower",
    "category": "noun"
  },
  {
    "zh": "叶",
    "en": "leaf",
    "category": "noun"
  },
  {
    "zh": "果",
    "en": "fruit",
    "category": "noun"
  },
  {
    "zh": "种子",
    "en": "seed",
    "category": "noun"
  },
  {
    "zh": "根",
    "en": "root",
    "category": "noun"
  },
  {
    "zh": "枝",
    "en": "branch",
    "category": "noun"
  },
  {
    "zh": "动物",
    "en": "animal",
    "category": "noun"
  },
  {
    "zh": "狗",
    "en": "dog",
    "category": "noun"
  },
  {
    "zh": "猫",
    "en": "cat",
    "category": "noun"
  },
  {
    "zh": "鸟",
    "en": "bird",
    "category": "noun"
  },
  {
    "zh": "鱼",
    "en": "fish",
    "category": "noun"
  },
  {
    "zh": "马",
    "en": "horse",
    "category": "noun"
  },
  {
    "zh": "牛",
    "en": "cow",
    "category": "noun"
  },
  {
    "zh": "羊",
    "en": "sheep",
    "category": "noun"
  },
  {
    "zh": "猪",
    "en": "pig",
    "category": "noun"
  },
  {
    "zh": "鸡",
    "en": "chicken",
    "category": "noun"
  },
  {
    "zh": "鸭",
    "en": "duck",
    "category": "noun"
  },
  {
    "zh": "鹅",
    "en": "goose",
    "category": "noun"
  },
  {
    "zh": "兔",
    "en": "rabbit",
    "category": "noun"
  },
  {
    "zh": "鼠",
    "en": "mouse",
    "category": "noun"
  },
  {
    "zh": "蛇",
    "en": "snake",
    "category": "noun"
  },
  {
    "zh": "龙",
    "en": "dragon",
    "category": "noun"
  },
  {
    "zh": "虎",
    "en": "tiger",
    "category": "noun"
  },
  {
    "zh": "狮",
    "en": "lion",
    "category": "noun"
  },
  {
    "zh": "熊",
    "en": "bear",
    "category": "noun"
  },
  {
    "zh": "猴",
    "en": "monkey",
    "category": "noun"
  },
  {
    "zh": "象",
    "en": "elephant",
    "category": "noun"
  },
  {
    "zh": "狼",
    "en": "wolf",
    "category": "noun"
  },
  {
    "zh": "狐",
    "en": "fox",
    "category": "noun"
  },
  {
    "zh": "蝴蝶",
    "en": "butterfly",
    "category": "noun"
  },
  {
    "zh": "蜜蜂",
    "en": "bee",
    "category": "noun"
  },
  {
    "zh": "蚂蚁",
    "en": "ant",
    "category": "noun"
  },
  {
    "zh": "蜘蛛",
    "en": "spider",
    "category": "noun"
  },
  {
    "zh": "蚊子",
    "en": "mosquito",
    "category": "noun"
  },
  {
    "zh": "苍蝇",
    "en": "fly",
    "category": "noun"
  },
  {
    "zh": "食物",
    "en": "food",
    "category": "noun"
  },
  {
    "zh": "饭",
    "en": "rice",
    "category": "noun"
  },
  {
    "zh": "面",
    "en": "noodle",
    "category": "noun"
  },
  {
    "zh": "面包",
    "en": "bread",
    "category": "noun"
  },
  {
    "zh": "肉",
    "en": "meat",
    "category": "noun"
  },
  {
    "zh": "鱼",
    "en": "fish",
    "category": "noun"
  },
  {
    "zh": "蛋",
    "en": "egg",
    "category": "noun"
  },
  {
    "zh": "奶",
    "en": "milk",
    "category": "noun"
  },
  {
    "zh": "菜",
    "en": "vegetable",
    "category": "noun"
  },
  {
    "zh": "水果",
    "en": "fruit",
    "category": "noun"
  },
  {
    "zh": "苹果",
    "en": "apple",
    "category": "noun"
  },
  {
    "zh": "香蕉",
    "en": "banana",
    "category": "noun"
  },
  {
    "zh": "橙子",
    "en": "orange",
    "category": "noun"
  },
  {
    "zh": "葡萄",
    "en": "grape",
    "category": "noun"
  },
  {
    "zh": "西瓜",
    "en": "watermelon",
    "category": "noun"
  },
  {
    "zh": "草莓",
    "en": "strawberry",
    "category": "noun"
  },
  {
    "zh": "桃子",
    "en": "peach",
    "category": "noun"
  },
  {
    "zh": "梨",
    "en": "pear",
    "category": "noun"
  },
  {
    "zh": "西瓜",
    "en": "watermelon",
    "category": "noun"
  },
  {
    "zh": "蔬菜",
    "en": "vegetable",
    "category": "noun"
  },
  {
    "zh": "白菜",
    "en": "cabbage",
    "category": "noun"
  },
  {
    "zh": "萝卜",
    "en": "radish",
    "category": "noun"
  },
  {
    "zh": "土豆",
    "en": "potato",
    "category": "noun"
  },
  {
    "zh": "西红柿",
    "en": "tomato",
    "category": "noun"
  },
  {
    "zh": "黄瓜",
    "en": "cucumber",
    "category": "noun"
  },
  {
    "zh": "茄子",
    "en": "eggplant",
    "category": "noun"
  },
  {
    "zh": "辣椒",
    "en": "pepper",
    "category": "noun"
  },
  {
    "zh": "洋葱",
    "en": "onion",
    "category": "noun"
  },
  {
    "zh": "大蒜",
    "en": "garlic",
    "category": "noun"
  },
  {
    "zh": "生姜",
    "en": "ginger",
    "category": "noun"
  },
  {
    "zh": "饮料",
    "en": "drink",
    "category": "noun"
  },
  {
    "zh": "水",
    "en": "water",
    "category": "noun"
  },
  {
    "zh": "茶",
    "en": "tea",
    "category": "noun"
  },
  {
    "zh": "咖啡",
    "en": "coffee",
    "category": "noun"
  },
  {
    "zh": "酒",
    "en": "wine",
    "category": "noun"
  },
  {
    "zh": "啤酒",
    "en": "beer",
    "category": "noun"
  },
  {
    "zh": "果汁",
    "en": "juice",
    "category": "noun"
  },
  {
    "zh": "牛奶",
    "en": "milk",
    "category": "noun"
  },
  {
    "zh": "可乐",
    "en": "cola",
    "category": "noun"
  },
  {
    "zh": "衣服",
    "en": "clothes",
    "category": "noun"
  },
  {
    "zh": "上衣",
    "en": "jacket",
    "category": "noun"
  },
  {
    "zh": "裤子",
    "en": "pants",
    "category": "noun"
  },
  {
    "zh": "裙子",
    "en": "skirt",
    "category": "noun"
  },
  {
    "zh": "鞋子",
    "en": "shoes",
    "category": "noun"
  },
  {
    "zh": "帽子",
    "en": "hat",
    "category": "noun"
  },
  {
    "zh": "袜子",
    "en": "socks",
    "category": "noun"
  },
  {
    "zh": "手套",
    "en": "gloves",
    "category": "noun"
  },
  {
    "zh": "围巾",
    "en": "scarf",
    "category": "noun"
  },
  {
    "zh": "外套",
    "en": "coat",
    "category": "noun"
  },
  {
    "zh": "衬衫",
    "en": "shirt",
    "category": "noun"
  },
  {
    "zh": "T恤",
    "en": "tshirt",
    "category": "noun"
  },
  {
    "zh": "牛仔裤",
    "en": "jeans",
    "category": "noun"
  },
  {
    "zh": "西装",
    "en": "suit",
    "category": "noun"
  },
  {
    "zh": "领带",
    "en": "tie",
    "category": "noun"
  },
  {
    "zh": "内衣",
    "en": "underwear",
    "category": "noun"
  },
  {
    "zh": "睡衣",
    "en": "pajamas",
    "category": "noun"
  },
  {
    "zh": "家",
    "en": "home",
    "category": "noun"
  },
  {
    "zh": "房子",
    "en": "house",
    "category": "noun"
  },
  {
    "zh": "公寓",
    "en": "apartment",
    "category": "noun"
  },
  {
    "zh": "房间",
    "en": "room",
    "category": "noun"
  },
  {
    "zh": "卧室",
    "en": "bedroom",
    "category": "noun"
  },
  {
    "zh": "客厅",
    "en": "livingroom",
    "category": "noun"
  },
  {
    "zh": "厨房",
    "en": "kitchen",
    "category": "noun"
  },
  {
    "zh": "卫生间",
    "en": "bathroom",
    "category": "noun"
  },
  {
    "zh": "书房",
    "en": "study",
    "category": "noun"
  },
  {
    "zh": "阳台",
    "en": "balcony",
    "category": "noun"
  },
  {
    "zh": "门",
    "en": "door",
    "category": "noun"
  },
  {
    "zh": "窗",
    "en": "window",
    "category": "noun"
  },
  {
    "zh": "墙",
    "en": "wall",
    "category": "noun"
  },
  {
    "zh": "地板",
    "en": "floor",
    "category": "noun"
  },
  {
    "zh": "天花板",
    "en": "ceiling",
    "category": "noun"
  },
  {
    "zh": "楼梯",
    "en": "stairs",
    "category": "noun"
  },
  {
    "zh": "电梯",
    "en": "elevator",
    "category": "noun"
  },
  {
    "zh": "花园",
    "en": "garden",
    "category": "noun"
  },
  {
    "zh": "院子",
    "en": "yard",
    "category": "noun"
  },
  {
    "zh": "车库",
    "en": "garage",
    "category": "noun"
  },
  {
    "zh": "家具",
    "en": "furniture",
    "category": "noun"
  },
  {
    "zh": "桌子",
    "en": "table",
    "category": "noun"
  },
  {
    "zh": "椅子",
    "en": "chair",
    "category": "noun"
  },
  {
    "zh": "床",
    "en": "bed",
    "category": "noun"
  },
  {
    "zh": "沙发",
    "en": "sofa",
    "category": "noun"
  },
  {
    "zh": "柜子",
    "en": "cabinet",
    "category": "noun"
  },
  {
    "zh": "书架",
    "en": "bookshelf",
    "category": "noun"
  },
  {
    "zh": "电视",
    "en": "tv",
    "category": "noun"
  },
  {
    "zh": "冰箱",
    "en": "refrigerator",
    "category": "noun"
  },
  {
    "zh": "洗衣机",
    "en": "washingmachine",
    "category": "noun"
  },
  {
    "zh": "空调",
    "en": "airconditioner",
    "category": "noun"
  },
  {
    "zh": "微波炉",
    "en": "microwave",
    "category": "noun"
  },
  {
    "zh": "烤箱",
    "en": "oven",
    "category": "noun"
  },
  {
    "zh": "灯",
    "en": "lamp",
    "category": "noun"
  },
  {
    "zh": "镜子",
    "en": "mirror",
    "category": "noun"
  },
  {
    "zh": "钟",
    "en": "clock",
    "category": "noun"
  },
  {
    "zh": "电话",
    "en": "phone",
    "category": "noun"
  },
  {
    "zh": "交通工具",
    "en": "vehicle",
    "category": "noun"
  },
  {
    "zh": "汽车",
    "en": "car",
    "category": "noun"
  },
  {
    "zh": "公共汽车",
    "en": "bus",
    "category": "noun"
  },
  {
    "zh": "火车",
    "en": "train",
    "category": "noun"
  },
  {
    "zh": "飞机",
    "en": "airplane",
    "category": "noun"
  },
  {
    "zh": "船",
    "en": "ship",
    "category": "noun"
  },
  {
    "zh": "自行车",
    "en": "bicycle",
    "category": "noun"
  },
  {
    "zh": "摩托车",
    "en": "motorcycle",
    "category": "noun"
  },
  {
    "zh": "出租车",
    "en": "taxi",
    "category": "noun"
  },
  {
    "zh": "地铁",
    "en": "subway",
    "category": "noun"
  },
  {
    "zh": "高铁",
    "en": "highspeedrail",
    "category": "noun"
  },
  {
    "zh": "卡车",
    "en": "truck",
    "category": "noun"
  },
  {
    "zh": "救护车",
    "en": "ambulance",
    "category": "noun"
  },
  {
    "zh": "消防车",
    "en": "fireengine",
    "category": "noun"
  },
  {
    "zh": "警车",
    "en": "policecar",
    "category": "noun"
  },
  {
    "zh": "时间",
    "en": "time",
    "category": "noun"
  },
  {
    "zh": "年",
    "en": "year",
    "category": "noun"
  },
  {
    "zh": "月",
    "en": "month",
    "category": "noun"
  },
  {
    "zh": "日",
    "en": "day",
    "category": "noun"
  },
  {
    "zh": "时",
    "en": "hour",
    "category": "noun"
  },
  {
    "zh": "分",
    "en": "minute",
    "category": "noun"
  },
  {
    "zh": "秒",
    "en": "second",
    "category": "noun"
  },
  {
    "zh": "今天",
    "en": "today",
    "category": "noun"
  },
  {
    "zh": "昨天",
    "en": "yesterday",
    "category": "noun"
  },
  {
    "zh": "明天",
    "en": "tomorrow",
    "category": "noun"
  },
  {
    "zh": "上午",
    "en": "morning",
    "category": "noun"
  },
  {
    "zh": "下午",
    "en": "afternoon",
    "category": "noun"
  },
  {
    "zh": "晚上",
    "en": "evening",
    "category": "noun"
  },
  {
    "zh": "春天",
    "en": "spring",
    "category": "noun"
  },
  {
    "zh": "夏天",
    "en": "summer",
    "category": "noun"
  },
  {
    "zh": "秋天",
    "en": "autumn",
    "category": "noun"
  },
  {
    "zh": "冬天",
    "en": "winter",
    "category": "noun"
  },
  {
    "zh": "周",
    "en": "week",
    "category": "noun"
  },
  {
    "zh": "星期一",
    "en": "monday",
    "category": "noun"
  },
  {
    "zh": "星期二",
    "en": "tuesday",
    "category": "noun"
  },
  {
    "zh": "星期三",
    "en": "wednesday",
    "category": "noun"
  },
  {
    "zh": "星期四",
    "en": "thursday",
    "category": "noun"
  },
  {
    "zh": "星期五",
    "en": "friday",
    "category": "noun"
  },
  {
    "zh": "星期六",
    "en": "saturday",
    "category": "noun"
  },
  {
    "zh": "星期日",
    "en": "sunday",
    "category": "noun"
  },
  {
    "zh": "一月",
    "en": "january",
    "category": "noun"
  },
  {
    "zh": "二月",
    "en": "february",
    "category": "noun"
  },
  {
    "zh": "三月",
    "en": "march",
    "category": "noun"
  },
  {
    "zh": "四月",
    "en": "april",
    "category": "noun"
  },
  {
    "zh": "五月",
    "en": "may",
    "category": "noun"
  },
  {
    "zh": "六月",
    "en": "june",
    "category": "noun"
  },
  {
    "zh": "七月",
    "en": "july",
    "category": "noun"
  },
  {
    "zh": "八月",
    "en": "august",
    "category": "noun"
  },
  {
    "zh": "九月",
    "en": "september",
    "category": "noun"
  },
  {
    "zh": "十月",
    "en": "october",
    "category": "noun"
  },
  {
    "zh": "十一月",
    "en": "november",
    "category": "noun"
  },
  {
    "zh": "十二月",
    "en": "december",
    "category": "noun"
  },
  {
    "zh": "上",
    "en": "up",
    "category": "noun"
  },
  {
    "zh": "下",
    "en": "down",
    "category": "noun"
  },
  {
    "zh": "左",
    "en": "left",
    "category": "noun"
  },
  {
    "zh": "右",
    "en": "right",
    "category": "noun"
  },
  {
    "zh": "前",
    "en": "front",
    "category": "noun"
  },
  {
    "zh": "后",
    "en": "back",
    "category": "noun"
  },
  {
    "zh": "东",
    "en": "east",
    "category": "noun"
  },
  {
    "zh": "西",
    "en": "west",
    "category": "noun"
  },
  {
    "zh": "南",
    "en": "south",
    "category": "noun"
  },
  {
    "zh": "北",
    "en": "north",
    "category": "noun"
  },
  {
    "zh": "中",
    "en": "center",
    "category": "noun"
  },
  {
    "zh": "内",
    "en": "inside",
    "category": "noun"
  },
  {
    "zh": "外",
    "en": "outside",
    "category": "noun"
  },
  {
    "zh": "旁边",
    "en": "beside",
    "category": "noun"
  },
  {
    "zh": "对面",
    "en": "opposite",
    "category": "noun"
  },
  {
    "zh": "附近",
    "en": "nearby",
    "category": "noun"
  },
  {
    "zh": "远处",
    "en": "far",
    "category": "noun"
  },
  {
    "zh": "零",
    "en": "zero",
    "category": "noun"
  },
  {
    "zh": "一",
    "en": "one",
    "category": "noun"
  },
  {
    "zh": "二",
    "en": "two",
    "category": "noun"
  },
  {
    "zh": "三",
    "en": "three",
    "category": "noun"
  },
  {
    "zh": "四",
    "en": "four",
    "category": "noun"
  },
  {
    "zh": "五",
    "en": "five",
    "category": "noun"
  },
  {
    "zh": "六",
    "en": "six",
    "category": "noun"
  },
  {
    "zh": "七",
    "en": "seven",
    "category": "noun"
  },
  {
    "zh": "八",
    "en": "eight",
    "category": "noun"
  },
  {
    "zh": "九",
    "en": "nine",
    "category": "noun"
  },
  {
    "zh": "十",
    "en": "ten",
    "category": "noun"
  },
  {
    "zh": "百",
    "en": "hundred",
    "category": "noun"
  },
  {
    "zh": "千",
    "en": "thousand",
    "category": "noun"
  },
  {
    "zh": "万",
    "en": "tenthousand",
    "category": "noun"
  },
  {
    "zh": "亿",
    "en": "hundredmillion",
    "category": "noun"
  },
  {
    "zh": "颜色",
    "en": "color",
    "category": "noun"
  },
  {
    "zh": "红",
    "en": "red",
    "category": "noun"
  },
  {
    "zh": "绿",
    "en": "green",
    "category": "noun"
  },
  {
    "zh": "蓝",
    "en": "blue",
    "category": "noun"
  },
  {
    "zh": "黄",
    "en": "yellow",
    "category": "noun"
  },
  {
    "zh": "白",
    "en": "white",
    "category": "noun"
  },
  {
    "zh": "黑",
    "en": "black",
    "category": "noun"
  },
  {
    "zh": "紫",
    "en": "purple",
    "category": "noun"
  },
  {
    "zh": "橙",
    "en": "orange",
    "category": "noun"
  },
  {
    "zh": "粉",
    "en": "pink",
    "category": "noun"
  },
  {
    "zh": "灰",
    "en": "gray",
    "category": "noun"
  },
  {
    "zh": "棕",
    "en": "brown",
    "category": "noun"
  },
  {
    "zh": "情感",
    "en": "emotion",
    "category": "noun"
  },
  {
    "zh": "快乐",
    "en": "happy",
    "category": "status"
  },
  {
    "zh": "悲伤",
    "en": "sad",
    "category": "status"
  },
  {
    "zh": "愤怒",
    "en": "angry",
    "category": "status"
  },
  {
    "zh": "恐惧",
    "en": "fear",
    "category": "status"
  },
  {
    "zh": "惊讶",
    "en": "surprised",
    "category": "status"
  },
  {
    "zh": "厌恶",
    "en": "disgusted",
    "category": "status"
  },
  {
    "zh": "爱",
    "en": "love",
    "category": "noun"
  },
  {
    "zh": "恨",
    "en": "hate",
    "category": "noun"
  },
  {
    "zh": "希望",
    "en": "hope",
    "category": "noun"
  },
  {
    "zh": "失望",
    "en": "disappointment",
    "category": "noun"
  },
  {
    "zh": "信心",
    "en": "confidence",
    "category": "noun"
  },
  {
    "zh": "勇气",
    "en": "courage",
    "category": "noun"
  },
  {
    "zh": "恐惧",
    "en": "fear",
    "category": "noun"
  },
  {
    "zh": "焦虑",
    "en": "anxiety",
    "category": "noun"
  },
  {
    "zh": "压力",
    "en": "stress",
    "category": "noun"
  },
  {
    "zh": "放松",
    "en": "relax",
    "category": "verb"
  },
  {
    "zh": "紧张",
    "en": "nervous",
    "category": "status"
  },
  {
    "zh": "兴奋",
    "en": "excited",
    "category": "status"
  },
  {
    "zh": "无聊",
    "en": "bored",
    "category": "status"
  },
  {
    "zh": "孤独",
    "en": "lonely",
    "category": "status"
  },
  {
    "zh": "幸福",
    "en": "happiness",
    "category": "noun"
  },
  {
    "zh": "痛苦",
    "en": "pain",
    "category": "noun"
  },
  {
    "zh": "满足",
    "en": "satisfied",
    "category": "status"
  },
  {
    "zh": "不满",
    "en": "dissatisfied",
    "category": "status"
  },
  {
    "zh": "感激",
    "en": "grateful",
    "category": "status"
  },
  {
    "zh": "嫉妒",
    "en": "jealous",
    "category": "status"
  },
  {
    "zh": "骄傲",
    "en": "proud",
    "category": "status"
  },
  {
    "zh": "羞耻",
    "en": "shame",
    "category": "noun"
  },
  {
    "zh": "尴尬",
    "en": "embarrassed",
    "category": "status"
  },
  {
    "zh": "是",
    "en": "be",
    "category": "verb"
  },
  {
    "zh": "有",
    "en": "have",
    "category": "verb"
  },
  {
    "zh": "做",
    "en": "do",
    "category": "verb"
  },
  {
    "zh": "说",
    "en": "say",
    "category": "verb"
  },
  {
    "zh": "去",
    "en": "go",
    "category": "verb"
  },
  {
    "zh": "来",
    "en": "come",
    "category": "verb"
  },
  {
    "zh": "看",
    "en": "see",
    "category": "verb"
  },
  {
    "zh": "听",
    "en": "hear",
    "category": "verb"
  },
  {
    "zh": "吃",
    "en": "eat",
    "category": "verb"
  },
  {
    "zh": "喝",
    "en": "drink",
    "category": "verb"
  },
  {
    "zh": "睡",
    "en": "sleep",
    "category": "verb"
  },
  {
    "zh": "醒",
    "en": "wake",
    "category": "verb"
  },
  {
    "zh": "走",
    "en": "walk",
    "category": "verb"
  },
  {
    "zh": "跑",
    "en": "run",
    "category": "verb"
  },
  {
    "zh": "跳",
    "en": "jump",
    "category": "verb"
  },
  {
    "zh": "飞",
    "en": "fly",
    "category": "verb"
  },
  {
    "zh": "游",
    "en": "swim",
    "category": "verb"
  },
  {
    "zh": "站",
    "en": "stand",
    "category": "verb"
  },
  {
    "zh": "坐",
    "en": "sit",
    "category": "verb"
  },
  {
    "zh": "躺",
    "en": "lie",
    "category": "verb"
  },
  {
    "zh": "拿",
    "en": "take",
    "category": "verb"
  },
  {
    "zh": "给",
    "en": "give",
    "category": "verb"
  },
  {
    "zh": "放",
    "en": "put",
    "category": "verb"
  },
  {
    "zh": "写",
    "en": "write",
    "category": "verb"
  },
  {
    "zh": "读",
    "en": "read",
    "category": "verb"
  },
  {
    "zh": "唱",
    "en": "sing",
    "category": "verb"
  },
  {
    "zh": "画",
    "en": "draw",
    "category": "verb"
  },
  {
    "zh": "买",
    "en": "buy",
    "category": "verb"
  },
  {
    "zh": "卖",
    "en": "sell",
    "category": "verb"
  },
  {
    "zh": "付",
    "en": "pay",
    "category": "verb"
  },
  {
    "zh": "借",
    "en": "borrow",
    "category": "verb"
  },
  {
    "zh": "还",
    "en": "return",
    "category": "verb"
  },
  {
    "zh": "送",
    "en": "send",
    "category": "verb"
  },
  {
    "zh": "收",
    "en": "receive",
    "category": "verb"
  },
  {
    "zh": "找",
    "en": "find",
    "category": "verb"
  },
  {
    "zh": "丢",
    "en": "lose",
    "category": "verb"
  },
  {
    "zh": "洗",
    "en": "wash",
    "category": "verb"
  },
  {
    "zh": "切",
    "en": "cut",
    "category": "verb"
  },
  {
    "zh": "煮",
    "en": "cook",
    "category": "verb"
  },
  {
    "zh": "烤",
    "en": "bake",
    "category": "verb"
  },
  {
    "zh": "炒",
    "en": "fry",
    "category": "verb"
  },
  {
    "zh": "蒸",
    "en": "steam",
    "category": "verb"
  },
  {
    "zh": "炖",
    "en": "stew",
    "category": "verb"
  },
  {
    "zh": "炸",
    "en": "deepfry",
    "category": "verb"
  },
  {
    "zh": "开",
    "en": "open",
    "category": "verb"
  },
  {
    "zh": "关",
    "en": "close",
    "category": "verb"
  },
  {
    "zh": "开",
    "en": "turnon",
    "category": "verb"
  },
  {
    "zh": "关",
    "en": "turnoff",
    "category": "verb"
  },
  {
    "zh": "开始",
    "en": "start",
    "category": "verb"
  },
  {
    "zh": "结束",
    "en": "end",
    "category": "verb"
  },
  {
    "zh": "继续",
    "en": "continue",
    "category": "verb"
  },
  {
    "zh": "停止",
    "en": "stop",
    "category": "verb"
  },
  {
    "zh": "等待",
    "en": "wait",
    "category": "verb"
  },
  {
    "zh": "离开",
    "en": "leave",
    "category": "verb"
  },
  {
    "zh": "到达",
    "en": "arrive",
    "category": "verb"
  },
  {
    "zh": "返回",
    "en": "return",
    "category": "verb"
  },
  {
    "zh": "进入",
    "en": "enter",
    "category": "verb"
  },
  {
    "zh": "退出",
    "en": "exit",
    "category": "verb"
  },
  {
    "zh": "上升",
    "en": "rise",
    "category": "verb"
  },
  {
    "zh": "下降",
    "en": "fall",
    "category": "verb"
  },
  {
    "zh": "增加",
    "en": "increase",
    "category": "verb"
  },
  {
    "zh": "减少",
    "en": "decrease",
    "category": "verb"
  },
  {
    "zh": "变化",
    "en": "change",
    "category": "verb"
  },
  {
    "zh": "移动",
    "en": "move",
    "category": "verb"
  },
  {
    "zh": "推",
    "en": "push",
    "category": "verb"
  },
  {
    "zh": "拉",
    "en": "pull",
    "category": "verb"
  },
  {
    "zh": "提",
    "en": "carry",
    "category": "verb"
  },
  {
    "zh": "抱",
    "en": "hug",
    "category": "verb"
  },
  {
    "zh": "亲",
    "en": "kiss",
    "category": "verb"
  },
  {
    "zh": "摸",
    "en": "touch",
    "category": "verb"
  },
  {
    "zh": "打",
    "en": "hit",
    "category": "verb"
  },
  {
    "zh": "踢",
    "en": "kick",
    "category": "verb"
  },
  {
    "zh": "咬",
    "en": "bite",
    "category": "verb"
  },
  {
    "zh": "抓",
    "en": "catch",
    "category": "verb"
  },
  {
    "zh": "扔",
    "en": "throw",
    "category": "verb"
  },
  {
    "zh": "捡",
    "en": "pickup",
    "category": "verb"
  },
  {
    "zh": "擦",
    "en": "wipe",
    "category": "verb"
  },
  {
    "zh": "扫",
    "en": "sweep",
    "category": "verb"
  },
  {
    "zh": "拖",
    "en": "drag",
    "category": "verb"
  },
  {
    "zh": "推",
    "en": "push",
    "category": "verb"
  },
  {
    "zh": "拉",
    "en": "pull",
    "category": "verb"
  },
  {
    "zh": "举",
    "en": "lift",
    "category": "verb"
  },
  {
    "zh": "放",
    "en": "put",
    "category": "verb"
  },
  {
    "zh": "挂",
    "en": "hang",
    "category": "verb"
  },
  {
    "zh": "贴",
    "en": "stick",
    "category": "verb"
  },
  {
    "zh": "拆",
    "en": "tear",
    "category": "verb"
  },
  {
    "zh": "装",
    "en": "install",
    "category": "verb"
  },
  {
    "zh": "修",
    "en": "repair",
    "category": "verb"
  },
  {
    "zh": "建",
    "en": "build",
    "category": "verb"
  },
  {
    "zh": "造",
    "en": "make",
    "category": "verb"
  },
  {
    "zh": "做",
    "en": "do",
    "category": "verb"
  },
  {
    "zh": "干",
    "en": "do",
    "category": "verb"
  },
  {
    "zh": "办",
    "en": "handle",
    "category": "verb"
  },
  {
    "zh": "处理",
    "en": "handle",
    "category": "verb"
  },
  {
    "zh": "解决",
    "en": "solve",
    "category": "verb"
  },
  {
    "zh": "决定",
    "en": "decide",
    "category": "verb"
  },
  {
    "zh": "选择",
    "en": "choose",
    "category": "verb"
  },
  {
    "zh": "同意",
    "en": "agree",
    "category": "verb"
  },
  {
    "zh": "拒绝",
    "en": "refuse",
    "category": "verb"
  },
  {
    "zh": "接受",
    "en": "accept",
    "category": "verb"
  },
  {
    "zh": "承认",
    "en": "admit",
    "category": "verb"
  },
  {
    "zh": "否认",
    "en": "deny",
    "category": "verb"
  },
  {
    "zh": "相信",
    "en": "believe",
    "category": "verb"
  },
  {
    "zh": "怀疑",
    "en": "doubt",
    "category": "verb"
  },
  {
    "zh": "知道",
    "en": "know",
    "category": "verb"
  },
  {
    "zh": "了解",
    "en": "understand",
    "category": "verb"
  },
  {
    "zh": "明白",
    "en": "understand",
    "category": "verb"
  },
  {
    "zh": "记得",
    "en": "remember",
    "category": "verb"
  },
  {
    "zh": "忘记",
    "en": "forget",
    "category": "verb"
  },
  {
    "zh": "想",
    "en": "think",
    "category": "verb"
  },
  {
    "zh": "思考",
    "en": "think",
    "category": "verb"
  },
  {
    "zh": "考虑",
    "en": "consider",
    "category": "verb"
  },
  {
    "zh": "想象",
    "en": "imagine",
    "category": "verb"
  },
  {
    "zh": "希望",
    "en": "hope",
    "category": "verb"
  },
  {
    "zh": "期望",
    "en": "expect",
    "category": "verb"
  },
  {
    "zh": "想要",
    "en": "want",
    "category": "verb"
  },
  {
    "zh": "需要",
    "en": "need",
    "category": "verb"
  },
  {
    "zh": "喜欢",
    "en": "like",
    "category": "verb"
  },
  {
    "zh": "讨厌",
    "en": "hate",
    "category": "verb"
  },
  {
    "zh": "爱",
    "en": "love",
    "category": "verb"
  },
  {
    "zh": "恨",
    "en": "hate",
    "category": "verb"
  },
  {
    "zh": "怕",
    "en": "fear",
    "category": "verb"
  },
  {
    "zh": "害怕",
    "en": "afraid",
    "category": "verb"
  },
  {
    "zh": "担心",
    "en": "worry",
    "category": "verb"
  },
  {
    "zh": "放心",
    "en": "relief",
    "category": "verb"
  },
  {
    "zh": "生气",
    "en": "angry",
    "category": "verb"
  },
  {
    "zh": "高兴",
    "en": "happy",
    "category": "verb"
  },
  {
    "zh": "难过",
    "en": "sad",
    "category": "verb"
  },
  {
    "zh": "哭",
    "en": "cry",
    "category": "verb"
  },
  {
    "zh": "笑",
    "en": "laugh",
    "category": "verb"
  },
  {
    "zh": "叫",
    "en": "call",
    "category": "verb"
  },
  {
    "zh": "喊",
    "en": "shout",
    "category": "verb"
  },
  {
    "zh": "问",
    "en": "ask",
    "category": "verb"
  },
  {
    "zh": "答",
    "en": "answer",
    "category": "verb"
  },
  {
    "zh": "告诉",
    "en": "tell",
    "category": "verb"
  },
  {
    "zh": "讲",
    "en": "speak",
    "category": "verb"
  },
  {
    "zh": "谈",
    "en": "talk",
    "category": "verb"
  },
  {
    "zh": "聊",
    "en": "chat",
    "category": "verb"
  },
  {
    "zh": "讨论",
    "en": "discuss",
    "category": "verb"
  },
  {
    "zh": "争论",
    "en": "argue",
    "category": "verb"
  },
  {
    "zh": "解释",
    "en": "explain",
    "category": "verb"
  },
  {
    "zh": "描述",
    "en": "describe",
    "category": "verb"
  },
  {
    "zh": "介绍",
    "en": "introduce",
    "category": "verb"
  },
  {
    "zh": "建议",
    "en": "suggest",
    "category": "verb"
  },
  {
    "zh": "推荐",
    "en": "recommend",
    "category": "verb"
  },
  {
    "zh": "要求",
    "en": "require",
    "category": "verb"
  },
  {
    "zh": "请求",
    "en": "request",
    "category": "verb"
  },
  {
    "zh": "命令",
    "en": "command",
    "category": "verb"
  },
  {
    "zh": "允许",
    "en": "allow",
    "category": "verb"
  },
  {
    "zh": "禁止",
    "en": "forbid",
    "category": "verb"
  },
  {
    "zh": "阻止",
    "en": "prevent",
    "category": "verb"
  },
  {
    "zh": "保护",
    "en": "protect",
    "category": "verb"
  },
  {
    "zh": "帮助",
    "en": "help",
    "category": "verb"
  },
  {
    "zh": "支持",
    "en": "support",
    "category": "verb"
  },
  {
    "zh": "反对",
    "en": "oppose",
    "category": "verb"
  },
  {
    "zh": "参加",
    "en": "join",
    "category": "verb"
  },
  {
    "zh": "离开",
    "en": "leave",
    "category": "verb"
  },
  {
    "zh": "到达",
    "en": "arrive",
    "category": "verb"
  },
  {
    "zh": "返回",
    "en": "return",
    "category": "verb"
  },
  {
    "zh": "经过",
    "en": "pass",
    "category": "verb"
  },
  {
    "zh": "通过",
    "en": "pass",
    "category": "verb"
  },
  {
    "zh": "失败",
    "en": "fail",
    "category": "verb"
  },
  {
    "zh": "成功",
    "en": "succeed",
    "category": "verb"
  },
  {
    "zh": "尝试",
    "en": "try",
    "category": "verb"
  },
  {
    "zh": "努力",
    "en": "effort",
    "category": "verb"
  },
  {
    "zh": "练习",
    "en": "practice",
    "category": "verb"
  },
  {
    "zh": "学习",
    "en": "study",
    "category": "verb"
  },
  {
    "zh": "教",
    "en": "teach",
    "category": "verb"
  },
  {
    "zh": "工作",
    "en": "work",
    "category": "verb"
  },
  {
    "zh": "休息",
    "en": "rest",
    "category": "verb"
  },
  {
    "zh": "玩",
    "en": "play",
    "category": "verb"
  },
  {
    "zh": "旅行",
    "en": "travel",
    "category": "verb"
  },
  {
    "zh": "参观",
    "en": "visit",
    "category": "verb"
  },
  {
    "zh": "访问",
    "en": "visit",
    "category": "verb"
  },
  {
    "zh": "见面",
    "en": "meet",
    "category": "verb"
  },
  {
    "zh": "认识",
    "en": "know",
    "category": "verb"
  },
  {
    "zh": "介绍",
    "en": "introduce",
    "category": "verb"
  },
  {
    "zh": "告别",
    "en": "goodbye",
    "category": "verb"
  },
  {
    "zh": "欢迎",
    "en": "welcome",
    "category": "verb"
  },
  {
    "zh": "感谢",
    "en": "thank",
    "category": "verb"
  },
  {
    "zh": "道歉",
    "en": "apologize",
    "category": "verb"
  },
  {
    "zh": "原谅",
    "en": "forgive",
    "category": "verb"
  },
  {
    "zh": "庆祝",
    "en": "celebrate",
    "category": "verb"
  },
  {
    "zh": "祝贺",
    "en": "congratulate",
    "category": "verb"
  },
  {
    "zh": "道歉",
    "en": "apologize",
    "category": "verb"
  },
  {
    "zh": "原谅",
    "en": "forgive",
    "category": "verb"
  },
  {
    "zh": "大",
    "en": "big",
    "category": "status"
  },
  {
    "zh": "小",
    "en": "small",
    "category": "status"
  },
  {
    "zh": "多",
    "en": "many",
    "category": "status"
  },
  {
    "zh": "少",
    "en": "few",
    "category": "status"
  },
  {
    "zh": "长",
    "en": "long",
    "category": "status"
  },
  {
    "zh": "短",
    "en": "short",
    "category": "status"
  },
  {
    "zh": "宽",
    "en": "wide",
    "category": "status"
  },
  {
    "zh": "窄",
    "en": "narrow",
    "category": "status"
  },
  {
    "zh": "厚",
    "en": "thick",
    "category": "status"
  },
  {
    "zh": "薄",
    "en": "thin",
    "category": "status"
  },
  {
    "zh": "高",
    "en": "high",
    "category": "status"
  },
  {
    "zh": "低",
    "en": "low",
    "category": "status"
  },
  {
    "zh": "深",
    "en": "deep",
    "category": "status"
  },
  {
    "zh": "浅",
    "en": "shallow",
    "category": "status"
  },
  {
    "zh": "远",
    "en": "far",
    "category": "status"
  },
  {
    "zh": "近",
    "en": "near",
    "category": "status"
  },
  {
    "zh": "快",
    "en": "fast",
    "category": "status"
  },
  {
    "zh": "慢",
    "en": "slow",
    "category": "status"
  },
  {
    "zh": "急",
    "en": "urgent",
    "category": "status"
  },
  {
    "zh": "缓",
    "en": "slow",
    "category": "status"
  },
  {
    "zh": "忙",
    "en": "busy",
    "category": "status"
  },
  {
    "zh": "闲",
    "en": "idle",
    "category": "status"
  },
  {
    "zh": "难",
    "en": "difficult",
    "category": "status"
  },
  {
    "zh": "易",
    "en": "easy",
    "category": "status"
  },
  {
    "zh": "真",
    "en": "true",
    "category": "status"
  },
  {
    "zh": "假",
    "en": "false",
    "category": "status"
  },
  {
    "zh": "对",
    "en": "right",
    "category": "status"
  },
  {
    "zh": "错",
    "en": "wrong",
    "category": "status"
  },
  {
    "zh": "好",
    "en": "good",
    "category": "status"
  },
  {
    "zh": "坏",
    "en": "bad",
    "category": "status"
  },
  {
    "zh": "新",
    "en": "new",
    "category": "status"
  },
  {
    "zh": "旧",
    "en": "old",
    "category": "status"
  },
  {
    "zh": "老",
    "en": "old",
    "category": "status"
  },
  {
    "zh": "少",
    "en": "young",
    "category": "status"
  },
  {
    "zh": "年轻",
    "en": "young",
    "category": "status"
  },
  {
    "zh": "漂亮",
    "en": "beautiful",
    "category": "status"
  },
  {
    "zh": "丑",
    "en": "ugly",
    "category": "status"
  },
  {
    "zh": "聪明",
    "en": "smart",
    "category": "status"
  },
  {
    "zh": "笨",
    "en": "stupid",
    "category": "status"
  },
  {
    "zh": "强",
    "en": "strong",
    "category": "status"
  },
  {
    "zh": "弱",
    "en": "weak",
    "category": "status"
  },
  {
    "zh": "硬",
    "en": "hard",
    "category": "status"
  },
  {
    "zh": "软",
    "en": "soft",
    "category": "status"
  },
  {
    "zh": "热",
    "en": "hot",
    "category": "status"
  },
  {
    "zh": "冷",
    "en": "cold",
    "category": "status"
  },
  {
    "zh": "温",
    "en": "warm",
    "category": "status"
  },
  {
    "zh": "凉",
    "en": "cool",
    "category": "status"
  },
  {
    "zh": "干",
    "en": "dry",
    "category": "status"
  },
  {
    "zh": "湿",
    "en": "wet",
    "category": "status"
  },
  {
    "zh": "亮",
    "en": "bright",
    "category": "status"
  },
  {
    "zh": "暗",
    "en": "dark",
    "category": "status"
  },
  {
    "zh": "清",
    "en": "clear",
    "category": "status"
  },
  {
    "zh": "浊",
    "en": "muddy",
    "category": "status"
  },
  {
    "zh": "甜",
    "en": "sweet",
    "category": "status"
  },
  {
    "zh": "苦",
    "en": "bitter",
    "category": "status"
  },
  {
    "zh": "辣",
    "en": "spicy",
    "category": "status"
  },
  {
    "zh": "酸",
    "en": "sour",
    "category": "status"
  },
  {
    "zh": "咸",
    "en": "salty",
    "category": "status"
  },
  {
    "zh": "淡",
    "en": "light",
    "category": "status"
  },
  {
    "zh": "香",
    "en": "fragrant",
    "category": "status"
  },
  {
    "zh": "臭",
    "en": "smelly",
    "category": "status"
  },
  {
    "zh": "吵",
    "en": "noisy",
    "category": "status"
  },
  {
    "zh": "静",
    "en": "quiet",
    "category": "status"
  },
  {
    "zh": "干净",
    "en": "clean",
    "category": "status"
  },
  {
    "zh": "脏",
    "en": "dirty",
    "category": "status"
  },
  {
    "zh": "安全",
    "en": "safe",
    "category": "status"
  },
  {
    "zh": "危险",
    "en": "dangerous",
    "category": "status"
  },
  {
    "zh": "简单",
    "en": "simple",
    "category": "status"
  },
  {
    "zh": "复杂",
    "en": "complex",
    "category": "status"
  },
  {
    "zh": "重要",
    "en": "important",
    "category": "status"
  },
  {
    "zh": "普通",
    "en": "ordinary",
    "category": "status"
  },
  {
    "zh": "特别",
    "en": "special",
    "category": "status"
  },
  {
    "zh": "正常",
    "en": "normal",
    "category": "status"
  },
  {
    "zh": "奇怪",
    "en": "strange",
    "category": "status"
  },
  {
    "zh": "有趣",
    "en": "interesting",
    "category": "status"
  },
  {
    "zh": "无聊",
    "en": "boring",
    "category": "status"
  },
  {
    "zh": "兴奋",
    "en": "excited",
    "category": "status"
  },
  {
    "zh": "紧张",
    "en": "nervous",
    "category": "status"
  },
  {
    "zh": "放松",
    "en": "relaxed",
    "category": "status"
  },
  {
    "zh": "累",
    "en": "tired",
    "category": "status"
  },
  {
    "zh": "困",
    "en": "sleepy",
    "category": "status"
  },
  {
    "zh": "饿",
    "en": "hungry",
    "category": "status"
  },
  {
    "zh": "渴",
    "en": "thirsty",
    "category": "status"
  },
  {
    "zh": "饱",
    "en": "full",
    "category": "status"
  },
  {
    "zh": "醉",
    "en": "drunk",
    "category": "status"
  },
  {
    "zh": "醒",
    "en": "awake",
    "category": "status"
  },
  {
    "zh": "病",
    "en": "sick",
    "category": "status"
  },
  {
    "zh": "健康",
    "en": "healthy",
    "category": "status"
  },
  {
    "zh": "富",
    "en": "rich",
    "category": "status"
  },
  {
    "zh": "穷",
    "en": "poor",
    "category": "status"
  },
  {
    "zh": "贵",
    "en": "expensive",
    "category": "status"
  },
  {
    "zh": "便宜",
    "en": "cheap",
    "category": "status"
  },
  {
    "zh": "免费",
    "en": "free",
    "category": "status"
  },
  {
    "zh": "有用",
    "en": "useful",
    "category": "status"
  },
  {
    "zh": "没用",
    "en": "useless",
    "category": "status"
  },
  {
    "zh": "可能",
    "en": "possible",
    "category": "status"
  },
  {
    "zh": "不可能",
    "en": "impossible",
    "category": "status"
  },
  {
    "zh": "确定",
    "en": "certain",
    "category": "status"
  },
  {
    "zh": "不确定",
    "en": "uncertain",
    "category": "status"
  },
  {
    "zh": "相同",
    "en": "same",
    "category": "status"
  },
  {
    "zh": "不同",
    "en": "different",
    "category": "status"
  },
  {
    "zh": "类似",
    "en": "similar",
    "category": "status"
  },
  {
    "zh": "相反",
    "en": "opposite",
    "category": "status"
  },
  {
    "zh": "完整",
    "en": "complete",
    "category": "status"
  },
  {
    "zh": "部分",
    "en": "partial",
    "category": "status"
  },
  {
    "zh": "全部",
    "en": "all",
    "category": "status"
  },
  {
    "zh": "一些",
    "en": "some",
    "category": "status"
  },
  {
    "zh": "没有",
    "en": "none",
    "category": "status"
  },
  {
    "zh": "任何",
    "en": "any",
    "category": "status"
  },
  {
    "zh": "每个",
    "en": "every",
    "category": "status"
  },
  {
    "zh": "这个",
    "en": "this",
    "category": "status"
  },
  {
    "zh": "那个",
    "en": "that",
    "category": "status"
  },
  {
    "zh": "这些",
    "en": "these",
    "category": "status"
  },
  {
    "zh": "那些",
    "en": "those",
    "category": "status"
  },
  {
    "zh": "谁",
    "en": "who",
    "category": "status"
  },
  {
    "zh": "什么",
    "en": "what",
    "category": "status"
  },
  {
    "zh": "哪里",
    "en": "where",
    "category": "status"
  },
  {
    "zh": "何时",
    "en": "when",
    "category": "status"
  },
  {
    "zh": "为什么",
    "en": "why",
    "category": "status"
  },
  {
    "zh": "怎么",
    "en": "how",
    "category": "status"
  },
  {
    "zh": "多少",
    "en": "howmany",
    "category": "status"
  },
  {
    "zh": "几个",
    "en": "howmany",
    "category": "status"
  },
  {
    "zh": "哪一个",
    "en": "which",
    "category": "status"
  }
];
