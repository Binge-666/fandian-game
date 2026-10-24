/* 饭点大作战 · AI 生成原创插画（矢量 SVG，扁平风）
   角色：饭点点长（主角）、8 位顾客；道具：16 个单品。
   全部为原创绘制，不含麦当劳 Logo 或任何官方素材。 */
(function () {
  "use strict";

  var INK = "#5d3a1a";

  function svg(viewBox, body) {
    return '<svg viewBox="' + viewBox + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' + body + "</svg>";
  }

  /* ---------- 主角：饭点点长（便当盒小店长，4 种表情：normal/happy/sad/urgent） ---------- */
  function mascotArt(mood) {
    var face;
    var extras = "";
    if (mood === "happy") {
      face =
        '<path d="M39,87 Q46,79 53,87" fill="none" stroke="#2a1c12" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M67,87 Q74,79 81,87" fill="none" stroke="#2a1c12" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M48,95 Q60,109 72,95 Z" fill="#b3402a" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>';
      extras =
        '<circle cx="104" cy="32" r="3.5" fill="#ffc72c"/>' +
        '<circle cx="14" cy="38" r="3" fill="#ffc72c"/>';
    } else if (mood === "sad") {
      face =
        '<path d="M39,84 Q46,89 53,84" fill="none" stroke="#2a1c12" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M67,84 Q74,89 81,84" fill="none" stroke="#2a1c12" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M50,102 Q60,93 70,102" fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round"/>' +
        '<path d="M46,94 Q49,100 46,103 Q43,100 46,94 Z" fill="#7fb6dd"/>';
    } else if (mood === "urgent") {
      face =
        '<circle cx="46" cy="86" r="8" fill="#fff" stroke="#2a1c12" stroke-width="2.5"/>' +
        '<circle cx="46" cy="87" r="3.5" fill="#2a1c12"/>' +
        '<circle cx="74" cy="86" r="8" fill="#fff" stroke="#2a1c12" stroke-width="2.5"/>' +
        '<circle cx="74" cy="87" r="3.5" fill="#2a1c12"/>' +
        '<circle cx="60" cy="100" r="5" fill="#b3402a" stroke="' + INK + '" stroke-width="2.5"/>';
      extras =
        '<path d="M12,46 Q15,52 12,55 Q9,52 12,46 Z" fill="#7fb6dd"/>' +
        '<path d="M106,44 Q109,50 106,53 Q103,50 106,44 Z" fill="#7fb6dd"/>' +
        '<rect x="94" y="8" width="6" height="15" rx="3" fill="#d9251d"/>' +
        '<circle cx="97" cy="29" r="3.2" fill="#d9251d"/>';
    } else {
      face =
        '<circle cx="46" cy="86" r="7" fill="#2a1c12"/>' +
        '<circle cx="48.5" cy="83.5" r="2.4" fill="#fff"/>' +
        '<circle cx="74" cy="86" r="7" fill="#2a1c12"/>' +
        '<circle cx="76.5" cy="83.5" r="2.4" fill="#fff"/>' +
        '<path d="M50,97 Q60,106 70,97" fill="none" stroke="' + INK + '" stroke-width="3.5" stroke-linecap="round"/>';
    }
    return svg("0 0 120 150",
      // 地面阴影
      '<ellipse cx="60" cy="142" rx="33" ry="6" fill="rgba(93,58,26,.16)"/>' +
      // 左臂（挥手中）+ 左手
      '<path d="M22,76 Q10,66 7,52" fill="none" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M22,76 Q10,66 7,52" fill="none" stroke="#f2c98a" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="7" cy="50" r="6.5" fill="#f2c98a" stroke="' + INK + '" stroke-width="2.5"/>' +
      // 右臂 + 右手
      '<path d="M98,80 Q110,86 115,95" fill="none" stroke="' + INK + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M98,80 Q110,86 115,95" fill="none" stroke="#f2c98a" stroke-width="7" stroke-linecap="round"/>' +
      // 锅铲
      '<line x1="117" y1="98" x2="111" y2="116" stroke="#8a7462" stroke-width="4.5" stroke-linecap="round"/>' +
      '<rect x="102" y="112" width="18" height="22" rx="5" fill="#b8c0c8" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<line x1="107" y1="117" x2="107" y2="129" stroke="' + INK + '" stroke-width="1.8" opacity=".45"/>' +
      '<line x1="111" y1="117" x2="111" y2="129" stroke="' + INK + '" stroke-width="1.8" opacity=".45"/>' +
      '<line x1="115" y1="117" x2="115" y2="129" stroke="' + INK + '" stroke-width="1.8" opacity=".45"/>' +
      '<circle cx="115" cy="96" r="6.5" fill="#f2c98a" stroke="' + INK + '" stroke-width="2.5"/>' +
      // 鞋
      '<rect x="40" y="126" width="16" height="12" rx="5.5" fill="#8c4a1f"/>' +
      '<rect x="64" y="126" width="16" height="12" rx="5.5" fill="#8c4a1f"/>' +
      // 便当盒身体
      '<rect x="18" y="46" width="84" height="86" rx="20" fill="#f2c98a" stroke="' + INK + '" stroke-width="4"/>' +
      // 围裙
      '<path d="M34,130 L34,118 Q34,111 41,111 L79,111 Q86,111 86,118 L86,130 Z" fill="#d9251d" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<rect x="52" y="118" width="16" height="8" rx="2.5" fill="none" stroke="#fff" stroke-width="1.8" opacity=".85"/>' +
      // 米饭脸面板 + 饭粒点缀
      '<rect x="28" y="58" width="64" height="58" rx="13" fill="#fff8ea" stroke="' + INK + '" stroke-width="3"/>' +
      '<ellipse cx="44" cy="67" rx="2.2" ry="1.4" fill="' + INK + '" opacity=".5"/>' +
      '<ellipse cx="60" cy="65" rx="2.2" ry="1.4" fill="' + INK + '" opacity=".5"/>' +
      '<ellipse cx="76" cy="67" rx="2.2" ry="1.4" fill="' + INK + '" opacity=".5"/>' +
      face +
      // 腮红
      '<ellipse cx="35" cy="96" rx="5.5" ry="3.4" fill="#f7a6a0"/>' +
      '<ellipse cx="85" cy="96" rx="5.5" ry="3.4" fill="#f7a6a0"/>' +
      // 红鸭舌帽（帽檐朝右）
      '<path d="M28,52 Q60,8 92,52 Z" fill="#d9251d" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' +
      '<rect x="80" y="43" width="34" height="11" rx="5.5" fill="#a81512" stroke="' + INK + '" stroke-width="3"/>' +
      '<circle cx="60" cy="21" r="4.5" fill="#fff7e8" stroke="' + INK + '" stroke-width="2.5"/>' +
      // 小装饰
      '<circle cx="16" cy="28" r="3" fill="#ffc72c"/>' +
      '<circle cx="105" cy="24" r="2.5" fill="#ffc72c"/>' +
      extras
    );
  }

  var MASCOTS = {
    normal: mascotArt("normal"),
    happy: mascotArt("happy"),
    sad: mascotArt("sad"),
    urgent: mascotArt("urgent")
  };
  var MASCOT = MASCOTS.normal;

  /* ---------- 顾客头像（扁平小脸，与主角同风格） ---------- */
  function face(hair, extras) {
    return svg("0 0 64 64",
      '<circle cx="32" cy="36" r="17" fill="#f7c99b" stroke="' + INK + '" stroke-width="2.5"/>' +
      hair +
      '<circle cx="26" cy="34" r="1.9" fill="#2a1c12"/>' +
      '<circle cx="38" cy="34" r="1.9" fill="#2a1c12"/>' +
      '<path d="M27,41 Q32,45 37,41" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>' +
      '<ellipse cx="22" cy="39" rx="3" ry="2" fill="#f7a6a0"/>' +
      '<ellipse cx="42" cy="39" rx="3" ry="2" fill="#f7a6a0"/>' +
      extras
    );
  }

  var CUSTOMER_ART = {
    // 加班的小李：刘海 + 圆眼镜
    "0": face(
      '<path d="M15,34 Q15,15 32,15 Q49,15 49,34 Q49,26 40,23 Q30,20 22,25 Q16,28 15,34 Z" fill="#4a3423"/>',
      '<circle cx="25.5" cy="34" r="5" fill="none" stroke="#2a1c12" stroke-width="2"/>' +
      '<circle cx="38.5" cy="34" r="5" fill="none" stroke="#2a1c12" stroke-width="2"/>' +
      '<line x1="30.5" y1="34" x2="33.5" y2="34" stroke="#2a1c12" stroke-width="2"/>'
    ),
    // 健身的小王：红色发带 + 短寸
    "1": face(
      '<path d="M17,30 Q17,17 32,17 Q47,17 47,30 L47,27 Q40,21 32,21 Q24,21 17,27 Z" fill="#2a1c12"/>' +
      '<rect x="15" y="25" width="34" height="6" rx="3" fill="#d9251d" stroke="' + INK + '" stroke-width="1.8"/>',
      '<path d="M22,29 L28,29 M36,29 L42,29" stroke="#2a1c12" stroke-width="2" stroke-linecap="round"/>'
    ),
    // 带娃的张姐：中分长发
    "2": face(
      '<path d="M14,50 Q10,14 32,14 Q54,14 50,50 L44,50 Q47,30 40,22 Q32,16 24,22 Q17,30 20,50 Z" fill="#5b3a1e"/>',
      '<circle cx="15.5" cy="42" r="1.8" fill="#ffc72c"/>' +
      '<circle cx="48.5" cy="42" r="1.8" fill="#ffc72c"/>'
    ),
    // 赶课的学生：绿色棒球帽
    "3": face(
      '<path d="M16,28 Q16,14 32,14 Q48,14 48,28 Z" fill="#1f7a4d" stroke="' + INK + '" stroke-width="2"/>' +
      '<rect x="14" y="26" width="40" height="6" rx="3" fill="#1f9d55" stroke="' + INK + '" stroke-width="2"/>',
      ""
    ),
    // 夜宵的阿强：炸毛 + 睡眼
    "4": face(
      '<path d="M14,30 L12,20 L20,25 L22,15 L28,22 L32,12 L36,22 L42,15 L44,25 L52,20 L50,30 Q40,22 32,22 Q24,22 14,30 Z" fill="#2a1c12"/>',
      '<path d="M22,33 Q25,36 28,33 M36,33 Q39,36 42,33" fill="none" stroke="#2a1c12" stroke-width="2.2" stroke-linecap="round"/>'
    ),
    // 减脂的琳琳：马尾 + 绿发圈
    "5": face(
      '<path d="M16,32 Q16,15 32,15 Q48,15 48,32 Q48,24 40,21 Q32,18 24,21 Q16,24 16,32 Z" fill="#6b4423"/>' +
      '<path d="M46,22 Q56,24 54,36 Q52,44 46,42" fill="none" stroke="#6b4423" stroke-width="6" stroke-linecap="round"/>' +
      '<circle cx="47" cy="24" r="3.4" fill="#1f9d55" stroke="' + INK + '" stroke-width="1.6"/>',
      ""
    ),
    // 开会的老周：两鬓灰发 + 方眼镜
    "6": face(
      '<path d="M15,30 Q17,22 22,20 M49,30 Q47,22 42,20" fill="none" stroke="#8a8178" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M20,26 Q26,22 32,26" fill="none" stroke="#b8a89a" stroke-width="4" stroke-linecap="round"/>',
      '<rect x="21" y="31" width="9" height="6.5" rx="2" fill="none" stroke="#2a1c12" stroke-width="2"/>' +
      '<rect x="34" y="31" width="9" height="6.5" rx="2" fill="none" stroke="#2a1c12" stroke-width="2"/>' +
      '<line x1="30" y1="34" x2="34" y2="34" stroke="#2a1c12" stroke-width="2"/>'
    ),
    // 探店的小雨：波波头 + 相机
    "7": face(
      '<path d="M13,42 Q11,14 32,14 Q53,14 51,42 L45,42 Q48,26 40,20 Q32,16 24,20 Q16,26 19,42 Z" fill="#2f2a26"/>',
      '<rect x="24" y="46" width="16" height="11" rx="2.5" fill="#4a4a4a" stroke="' + INK + '" stroke-width="2"/>' +
      '<circle cx="32" cy="51.5" r="3.4" fill="#8ab6d9" stroke="' + INK + '" stroke-width="1.6"/>' +
      '<rect x="27" y="43.5" width="5" height="3" rx="1" fill="#4a4a4a"/>'
    )
  };

  /* ---------- 16 个单品图标 ---------- */
  var SHADOW = '<ellipse cx="32" cy="57" rx="16" ry="3" fill="rgba(93,58,26,.12)"/>';

  function burgerDome(y, fill) {
    return '<path d="M12,' + y + ' A20,16 0 0 1 52,' + y + ' Z" fill="' + fill + '" stroke="' + INK + '" stroke-width="2"/>' +
      '<ellipse cx="26" cy="' + (y - 9) + '" rx="1.8" ry="1.2" fill="#fff7e8"/>' +
      '<ellipse cx="34" cy="' + (y - 12) + '" rx="1.8" ry="1.2" fill="#fff7e8"/>' +
      '<ellipse cx="42" cy="' + (y - 8) + '" rx="1.8" ry="1.2" fill="#fff7e8"/>';
  }

  function cheeseSlice(y) {
    return '<rect x="13" y="' + y + '" width="38" height="5" rx="2" fill="#ffc72c" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<rect x="18" y="' + (y + 5) + '" width="4.5" height="5" rx="2.2" fill="#ffc72c"/>' +
      '<rect x="40" y="' + (y + 5) + '" width="4.5" height="5" rx="2.2" fill="#ffc72c"/>';
  }

  function patty(y, h, fill) {
    return '<rect x="12" y="' + y + '" width="40" height="' + h + '" rx="4.5" fill="' + fill + '" stroke="' + INK + '" stroke-width="2"/>';
  }

  function lettuceWave(y) {
    return '<path d="M12,' + (y + 3) + ' Q16,' + y + ' 20,' + (y + 3) + ' T28,' + (y + 3) + ' T36,' + (y + 3) + ' T44,' + (y + 3) + ' T52,' + (y + 3) + ' L52,' + (y + 6) + ' L12,' + (y + 6) + ' Z" fill="#7cc242" stroke="' + INK + '" stroke-width="1.8"/>';
  }

  var ITEM_ART = {
    // 板烧鸡腿堡
    "1406": svg("0 0 64 64", SHADOW +
      '<rect x="14" y="44" width="36" height="10" rx="5" fill="#e89e3f" stroke="' + INK + '" stroke-width="2"/>' +
      patty(33, 11, "#8c5a2b") +
      '<path d="M18,37 L28,37 M34,40 L44,40 M22,41 L30,41" stroke="' + INK + '" stroke-width="1.6" opacity=".35"/>' +
      lettuceWave(28) +
      burgerDome(28, "#f0b45e")),
    // 麦辣鸡腿汉堡
    "1440": svg("0 0 64 64", SHADOW +
      '<rect x="14" y="44" width="36" height="10" rx="5" fill="#e89e3f" stroke="' + INK + '" stroke-width="2"/>' +
      patty(33, 11, "#b3402a") +
      '<path d="M18,37 L28,37 M34,40 L44,40" stroke="' + INK + '" stroke-width="1.6" opacity=".35"/>' +
      lettuceWave(28) +
      burgerDome(28, "#f0b45e") +
      '<path d="M38,10 Q46,6 49,12 Q46,17 39,13 Z" fill="#d9251d" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M49,11 L54,7" stroke="#1f9d55" stroke-width="2.5" stroke-linecap="round"/>'),
    // 双层吉士汉堡
    "1120": svg("0 0 64 64", SHADOW +
      '<rect x="14" y="50" width="36" height="9" rx="4.5" fill="#e89e3f" stroke="' + INK + '" stroke-width="2"/>' +
      patty(42, 8, "#8c5a2b") +
      cheeseSlice(37) +
      patty(29, 8, "#8c5a2b") +
      cheeseSlice(24) +
      burgerDome(24, "#f0b45e")),
    // 培根蔬萃双层牛堡
    "1106": svg("0 0 64 64", SHADOW +
      '<rect x="14" y="46" width="36" height="9" rx="4.5" fill="#e89e3f" stroke="' + INK + '" stroke-width="2"/>' +
      patty(38, 8, "#8c5a2b") +
      patty(30, 8, "#8c5a2b") +
      '<path d="M14,27 Q20,23 26,27 T38,27 T50,27" fill="none" stroke="#a33d2a" stroke-width="4.5" stroke-linecap="round"/>' +
      '<path d="M14,24 Q20,20 26,24 T38,24 T50,24" fill="none" stroke="#e8937e" stroke-width="1.8" stroke-linecap="round"/>' +
      lettuceWave(19) +
      burgerDome(20, "#f0b45e")),
    // 那么大鸡排（椒盐）
    "521156": svg("0 0 64 64", SHADOW +
      '<rect x="12" y="45" width="40" height="10" rx="3" fill="#fffdf7" stroke="#d8c9b4" stroke-width="2"/>' +
      '<path d="M32,10 Q50,10 52,26 Q54,40 44,45 L20,45 Q10,40 12,26 Q14,10 32,10 Z" fill="#eda63f" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<circle cx="22" cy="24" r="2" fill="#c77f22"/><circle cx="32" cy="18" r="2" fill="#c77f22"/>' +
      '<circle cx="42" cy="26" r="2" fill="#c77f22"/><circle cx="26" cy="34" r="2" fill="#c77f22"/>' +
      '<circle cx="38" cy="36" r="2" fill="#c77f22"/><circle cx="31" cy="27" r="2" fill="#c77f22"/>' +
      '<circle cx="27" cy="14" r="1.5" fill="#d9251d"/><circle cx="45" cy="20" r="1.5" fill="#d9251d"/>' +
      '<circle cx="20" cy="30" r="1.5" fill="#d9251d"/><circle cx="36" cy="30" r="1.5" fill="#d9251d"/>'),
    // 双层深海鳕鱼堡
    "9900003586": svg("0 0 64 64", SHADOW +
      '<rect x="14" y="46" width="36" height="9" rx="4.5" fill="#e89e3f" stroke="' + INK + '" stroke-width="2"/>' +
      '<rect x="12" y="36" width="40" height="9" rx="4.5" fill="#f5ead8" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M16,40 Q20,38 24,40 T32,40 T40,40 T48,40" fill="none" stroke="#d9c9a8" stroke-width="1.8"/>' +
      '<rect x="14" y="32.5" width="36" height="4" rx="2" fill="#ffc72c"/>' +
      '<rect x="12" y="24" width="40" height="9" rx="4.5" fill="#f5ead8" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M16,28 Q20,26 24,28 T32,28 T40,28 T48,28" fill="none" stroke="#d9c9a8" stroke-width="1.8"/>' +
      burgerDome(24, "#f0b45e")),
    // 薯条
    "4810": svg("0 0 64 64", SHADOW +
      '<rect x="16" y="18" width="7" height="22" rx="3" fill="#f4b83f" stroke="' + INK + '" stroke-width="2"/>' +
      '<rect x="24" y="10" width="7" height="28" rx="3" fill="#ffd44d" stroke="' + INK + '" stroke-width="2"/>' +
      '<rect x="33" y="6" width="7" height="30" rx="3" fill="#ffd44d" stroke="' + INK + '" stroke-width="2"/>' +
      '<rect x="41" y="14" width="7" height="24" rx="3" fill="#f4b83f" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M16,34 L48,34 L45,56 L19,56 Z" fill="#d9251d" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<circle cx="32" cy="45" r="6" fill="#fff7e8"/>' +
      '<path d="M29,45 L32,41.5 L35,45" fill="none" stroke="#d9251d" stroke-width="2" stroke-linecap="round"/>'),
    // 麦乐鸡
    "1401": svg("0 0 64 64", SHADOW +
      '<path d="M14,28 Q14,18 23,18 Q31,18 30,27 Q30,35 22,35 Q14,35 14,28 Z" fill="#eda63f" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<path d="M32,22 Q33,13 41,14 Q49,15 48,23 Q47,31 39,30 Q32,29 32,22 Z" fill="#eda63f" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<path d="M22,40 Q23,32 31,33 Q38,34 37,42 Q36,49 28,48 Q21,47 22,40 Z" fill="#eda63f" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<circle cx="20" cy="25" r="1.6" fill="#c77f22"/><circle cx="26" cy="29" r="1.6" fill="#c77f22"/>' +
      '<circle cx="38" cy="20" r="1.6" fill="#c77f22"/><circle cx="43" cy="26" r="1.6" fill="#c77f22"/>' +
      '<circle cx="28" cy="40" r="1.6" fill="#c77f22"/><circle cx="33" cy="44" r="1.6" fill="#c77f22"/>' +
      '<circle cx="47" cy="46" r="7.5" fill="#fffdf7" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<circle cx="47" cy="46" r="4.5" fill="#d9251d"/>'),
    // 玉米杯
    "4437": svg("0 0 64 64", SHADOW +
      '<circle cx="25" cy="24" r="3.4" fill="#ffd44d" stroke="#e8a825" stroke-width="1.4"/>' +
      '<circle cx="32" cy="22" r="3.4" fill="#ffd44d" stroke="#e8a825" stroke-width="1.4"/>' +
      '<circle cx="39" cy="24" r="3.4" fill="#ffd44d" stroke="#e8a825" stroke-width="1.4"/>' +
      '<path d="M20,26 L44,26 L41,54 L23,54 Z" fill="#eef5fb" stroke="#7fa8c9" stroke-width="2.5"/>' +
      '<circle cx="26" cy="34" r="3.2" fill="#ffd44d" stroke="#e8a825" stroke-width="1.2"/>' +
      '<circle cx="33" cy="33" r="3.2" fill="#ffd44d" stroke="#e8a825" stroke-width="1.2"/>' +
      '<circle cx="39" cy="35" r="3.2" fill="#ffd44d" stroke="#e8a825" stroke-width="1.2"/>' +
      '<circle cx="29" cy="41" r="3.2" fill="#ffd44d" stroke="#e8a825" stroke-width="1.2"/>' +
      '<circle cx="36" cy="42" r="3.2" fill="#ffd44d" stroke="#e8a825" stroke-width="1.2"/>' +
      '<circle cx="27" cy="48" r="3" fill="#ffd44d" stroke="#e8a825" stroke-width="1.2"/>' +
      '<circle cx="34" cy="49" r="3" fill="#ffd44d" stroke="#e8a825" stroke-width="1.2"/>' +
      '<line x1="23" y1="30" x2="25" y2="50" stroke="#fff" stroke-width="2" opacity=".7"/>'),
    // 苹果片
    "6102": svg("0 0 64 64", SHADOW +
      '<g transform="rotate(-22 32 40)"><rect x="27" y="18" width="10" height="38" rx="5" fill="#fff8ef" stroke="' + INK + '" stroke-width="2"/><path d="M27.5,23 Q32,17.5 36.5,23" fill="none" stroke="#d9251d" stroke-width="3.2" stroke-linecap="round"/></g>' +
      '<g><rect x="27" y="16" width="10" height="38" rx="5" fill="#fff8ef" stroke="' + INK + '" stroke-width="2"/><path d="M27.5,21 Q32,15.5 36.5,21" fill="none" stroke="#d9251d" stroke-width="3.2" stroke-linecap="round"/><ellipse cx="32" cy="34" rx="1.3" ry="2" fill="#5d3a1a"/></g>' +
      '<g transform="rotate(22 32 40)"><rect x="27" y="18" width="10" height="38" rx="5" fill="#fff8ef" stroke="' + INK + '" stroke-width="2"/><path d="M27.5,23 Q32,17.5 36.5,23" fill="none" stroke="#d9251d" stroke-width="3.2" stroke-linecap="round"/></g>'),
    // 可乐
    "9900008751": svg("0 0 64 64", SHADOW +
      '<line x1="40" y1="3" x2="43" y2="15" stroke="#d9251d" stroke-width="4.5" stroke-linecap="round"/>' +
      '<path d="M20,20 L44,20 L41,55 L23,55 Z" fill="#f4f6f8" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<path d="M21.6,32 L42.4,32 L41.4,43 L22.6,43 Z" fill="#d9251d"/>' +
      '<circle cx="28" cy="37.5" r="1.6" fill="#fff" opacity=".85"/>' +
      '<circle cx="36" cy="38.5" r="1.2" fill="#fff" opacity=".7"/>' +
      '<rect x="18" y="14" width="28" height="6.5" rx="3.2" fill="#b8c0c8" stroke="' + INK + '" stroke-width="2"/>'),
    // 锡兰红茶
    "3505": svg("0 0 64 64", SHADOW +
      '<path d="M28,11 Q26,7 28,3 M36,11 Q34,7 36,3" fill="none" stroke="#b8a89a" stroke-width="2" stroke-linecap="round"/>' +
      '<line x1="40" y1="18" x2="47" y2="10" stroke="#8a7462" stroke-width="2"/>' +
      '<rect x="44" y="3" width="10" height="9" rx="2" fill="#ffc72c" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<rect x="20" y="16" width="24" height="40" rx="6" fill="#eef7fa" stroke="#7fa8c9" stroke-width="2.5"/>' +
      '<rect x="22.5" y="30" width="19" height="23.5" rx="4" fill="#d98f2b"/>' +
      '<ellipse cx="32" cy="30.5" rx="9.5" ry="2.4" fill="#e8a94f"/>' +
      '<line x1="24" y1="22" x2="25" y2="26" stroke="#fff" stroke-width="2" opacity=".7"/>'),
    // 纯悦（水）
    "3757": svg("0 0 64 64", SHADOW +
      '<rect x="25" y="7" width="14" height="7" rx="2.5" fill="#4aa3e0" stroke="' + INK + '" stroke-width="2"/>' +
      '<rect x="27" y="14" width="10" height="8" fill="#cfe8f7" stroke="#7fb6dd" stroke-width="2"/>' +
      '<rect x="22" y="21" width="20" height="34" rx="7" fill="#e8f4fb" stroke="#7fb6dd" stroke-width="2.5"/>' +
      '<rect x="24" y="38" width="16" height="14" rx="4" fill="#cfe8f7"/>' +
      '<path d="M32,40 Q36,44.5 32,48.5 Q28,44.5 32,40 Z" fill="#4aa3e0"/>' +
      '<line x1="25" y1="26" x2="25.5" y2="34" stroke="#fff" stroke-width="2" opacity=".8"/>'),
    // 燕麦奶铁
    "510479": svg("0 0 64 64", SHADOW +
      '<path d="M28,11 Q26,7 28,3 M37,11 Q35,7 37,3" fill="none" stroke="#b8a89a" stroke-width="2" stroke-linecap="round"/>' +
      '<rect x="18" y="15" width="28" height="7.5" rx="3.5" fill="#e8d5bd" stroke="' + INK + '" stroke-width="2"/>' +
      '<path d="M20,22.5 L44,22.5 L41,55 L23,55 Z" fill="#f5e6d3" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<path d="M21,33 L43,33 L41.5,47 L22.5,47 Z" fill="#c98a4b"/>' +
      '<circle cx="27" cy="37" r="1.7" fill="#f0d9b8"/><circle cx="34" cy="40" r="1.7" fill="#f0d9b8"/>' +
      '<circle cx="29" cy="43.5" r="1.7" fill="#f0d9b8"/><circle cx="37" cy="36" r="1.7" fill="#f0d9b8"/>'),
    // 圆筒冰淇淋
    "515837": svg("0 0 64 64", SHADOW +
      '<path d="M22,32 L42,32 L32,58 Z" fill="#e8a54f" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<path d="M25,38 L38,33 M27,46 L40,39 M39,47 L25,40 M36,54 L23,46" stroke="#c9822f" stroke-width="1.6"/>' +
      '<ellipse cx="32" cy="30" rx="13" ry="7" fill="#fffdf8" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<ellipse cx="32" cy="22" rx="9.5" ry="6.5" fill="#fffdf8" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<ellipse cx="32" cy="15" rx="6" ry="5.5" fill="#fffdf8" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<path d="M32,9.5 Q36,6 33,4" fill="none" stroke="' + INK + '" stroke-width="2.2" stroke-linecap="round"/>'),
    // 经典麦旋风
    "9900008754": svg("0 0 64 64", SHADOW +
      '<line x1="41" y1="10" x2="37" y2="24" stroke="#b8c0c8" stroke-width="4" stroke-linecap="round"/>' +
      '<ellipse cx="42" cy="8.5" rx="3.4" ry="4.6" transform="rotate(-18 42 8.5)" fill="#b8c0c8" stroke="' + INK + '" stroke-width="1.8"/>' +
      '<path d="M18,26 L46,26 L43,55 L21,55 Z" fill="#f4f6f8" stroke="' + INK + '" stroke-width="2.5"/>' +
      '<circle cx="26" cy="36" r="2.2" fill="#8c5a2b"/><circle cx="35" cy="41" r="2.2" fill="#8c5a2b"/>' +
      '<circle cx="30" cy="48" r="2.2" fill="#8c5a2b"/><circle cx="38" cy="33" r="1.8" fill="#d9251d"/>' +
      '<circle cx="25" cy="45" r="1.8" fill="#d9251d"/>' +
      '<ellipse cx="32" cy="26" rx="14" ry="5" fill="#fffdf8" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<circle cx="32" cy="20" r="5" fill="#fffdf8" stroke="' + INK + '" stroke-width="2.2"/>' +
      '<circle cx="37" cy="16.5" r="3" fill="#fffdf8" stroke="' + INK + '" stroke-width="1.8"/>')
  };

  window.GAME_ART = {
    mascot: MASCOT,
    mascots: MASCOTS,
    customers: CUSTOMER_ART,
    items: ITEM_ART,
    /* 一句话设定（主角卡用） */
    tagline: "饭点点长——便当盒成精的小店长，红帽围裙，举着锅铲替顾客把关每一份餐：热量差超过 30 的，不出灶。"
  };

  /* 注入主角到预留位 */
  document.querySelectorAll(".chef-art").forEach(function (el) {
    el.innerHTML = MASCOT;
  });

  /* 按 data-art 注入装饰图标（开始页漂浮道具等） */
  document.querySelectorAll("[data-art]").forEach(function (el) {
    var art = ITEM_ART[el.getAttribute("data-art")];
    if (art) el.innerHTML = art;
  });
})();
