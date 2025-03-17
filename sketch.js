let lines = []; // 儲存多條線條的點陣列
let iframe; // 儲存嵌入的 iframe

function setup() { //初始設定函數，只會執行一次
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255, 0); // 設定背景為透明
  iframe = createElement('iframe'); // 建立 iframe 元素
  iframe.attribute('src', 'https://www.tku.edu.tw/'); // 設定網頁來源
  iframe.style('position', 'absolute');
  iframe.style('top', '0');
  iframe.style('left', '0');
  iframe.style('width', '100%');
  iframe.style('height', '100%');
  iframe.style('z-index', '-1'); // 將 iframe 放在動畫的背後
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('pointer-events', 'auto'); // 允許 iframe 的互動，讓網頁可以被滑鼠操控
  for (let j = 0; j < 30; j++) { // 產生 30 條線條
    let linePoints = [];
    let baseX = random(0, width); // 每條線條的基準 X 座標隨機生成
    for (let y = height; y >= height / 2 - random(50, 200); y -= 10) { // 長度有差異
      linePoints.push({ x: baseX, y: y });
    }
    lines.push({
      points: linePoints,
      weight: random(10, 50), // 線條寬度有差異
      color: color(random(50, 255), random(50, 255), random(50, 255), random(50, 150)), // 顏色和透明度有差異
      frequency: random(0.02, 0.1) // 每條線條的擺動頻率不同
    });
  }
}

function draw() {//畫圖函數，會一直執行
  clear(); // 清除畫布，保留透明背景
  for (let line of lines) {
    stroke(line.color); // 設定線條顏色
    strokeWeight(line.weight); // 設定線條粗細
    noFill();
    beginShape();
    for (let i = 0; i < line.points.length; i++) {
      let p = line.points[i];
      if (i === 0) {
        p.x = line.points[0].x; // 底部的第一個點固定在隨機生成的位置
      } else {
        let factor = i / line.points.length; // 擺動幅度由下往上遞增
        p.x += sin(frameCount * line.frequency + i * 0.2) * 5 * factor; // 使用不同頻率的擺動效果
        p.y += cos(frameCount * line.frequency + i * 0.2) * 2 * factor; // 使用不同頻率的擺動效果
      }
      curveVertex(p.x, p.y); // 使用 curveVertex 讓曲線更圓滑
    }
    endShape();
  }
}
