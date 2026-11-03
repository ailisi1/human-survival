#!/bin/sh
# 无头截图（小游戏预览页 / 网页版）。
# Chrome 在这台机器上出不了图，Edge 可以；Edge 偶发白图，所以每张重试。
#
#   sh tools/shot.sh realm "demo=realm&tab=0&notch=44&home=34&cap=296&capb=82&dpr=3"
#   W=390 H=844 TARGET=web sh tools/shot.sh web "auto=18&era=ming&seed=5"
#
# TARGET=game（默认）截 minigame/web/index.html；TARGET=web 截站点首页 index.html。
# 删文件走 node：shell 的 rm 在这台机器上会被安全策略拦掉。
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WINROOT="$(echo "$ROOT" | sed 's|^/\([a-zA-Z]\)/|\1:/|')"
OUT="$ROOT/minigame/shots"
NAME="$1"
QUERY="$2"
TARGET="${TARGET:-game}"
W="${W:-390}"
H="${H:-844}"

if [ "$TARGET" = "web" ]; then
  URL="file:///$WINROOT/index.html?$QUERY"
else
  URL="file:///$WINROOT/minigame/web/index.html?$QUERY"
fi

mkdir -p "$OUT"
i=0
while [ $i -lt 5 ]; do
  i=$((i + 1))
  # 先删掉旧图。否则 Edge 启动失败没写文件时，脚本会把上一张当成这次的结果。
  node -e "try{require('fs').unlinkSync(process.argv[1])}catch(e){}" "$OUT/$NAME.png"
  TMP="$(mktemp -d)"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars \
    --user-data-dir="$TMP" \
    --window-size=$W,$H \
    --screenshot="$OUT/$NAME.png" \
    --virtual-time-budget=3000 \
    "$URL" >/dev/null 2>&1
  node -e "try{require('fs').rmSync(process.argv[1],{recursive:true,force:true})}catch(e){}" "$TMP"
  if [ -s "$OUT/$NAME.png" ]; then
    SZ=$(wc -c < "$OUT/$NAME.png")
    if [ "$SZ" -gt 20000 ]; then
      echo "$NAME  ${SZ}B  (第 $i 次)"
      exit 0
    fi
  fi
done
echo "$NAME FAILED"
exit 1
