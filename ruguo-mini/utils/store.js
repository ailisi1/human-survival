/* 结局收藏与人生码：只有这两样需要跨次启动保留
 *
 * 与网页版保持一致：只存称号名，不记是谁、不记数值、不记时间。
 * wx.storage 在无痕/清缓存时会没，所以所有读写都包了 try。
 */
const COLLECT_KEY = "rugo-collection-v1";
const SEED_KEY = "rugo-last-seed";

function loadCollection() {
  try {
    const v = wx.getStorageSync(COLLECT_KEY);
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}

function saveCollection(arr) {
  try {
    wx.setStorageSync(COLLECT_KEY, arr);
  } catch (e) {
    /* 存不下就算了，不打断这局 */
  }
}

/* 返回 true 表示这是第一次拿到这个称号 */
function unlockTitle(title) {
  if (!title) return false;
  const arr = loadCollection();
  if (arr.indexOf(title) >= 0) return false;
  arr.push(title);
  saveCollection(arr);
  return true;
}

function countCollection() {
  return loadCollection().length;
}

function saveSeed(seed) {
  try {
    wx.setStorageSync(SEED_KEY, seed);
  } catch (e) {}
}

function loadSeed() {
  try {
    const v = wx.getStorageSync(SEED_KEY);
    return typeof v === "number" ? v : 0;
  } catch (e) {
    return 0;
  }
}

module.exports = {
  loadCollection,
  saveCollection,
  unlockTitle,
  countCollection,
  saveSeed,
  loadSeed,
};
