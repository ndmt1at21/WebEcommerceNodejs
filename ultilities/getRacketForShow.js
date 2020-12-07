const capitalize = (str) => {
  if (typeof str !== 'string') return '';
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const mapLanguage = {
  normal: 'Dễ chơi',
  medium: 'Trung bình',
  advanced: 'Khó chơi',
  stiff: 'Cứng',
  verystiff: 'Rất cứng',
  flex: 'Dẻo'
};

module.exports = (racketObj) => {
  let newRacket = new Map();

  newRacket['Tên'] = racketObj.name;
  newRacket['Khung vợt'] = racketObj.frame.join(' / ');
  newRacket['Thân vợt'] = racketObj.shaft.join(' / ');
  newRacket['Thương hiệu'] = capitalize(racketObj.brand);
  newRacket['Độ dẻo'] = mapLanguage[racketObj.flex];
  newRacket['Độ khó'] = mapLanguage[racketObj.difficulty];
  newRacket['Trọng lượng'] = `${racketObj.weight}g`;
  newRacket['Chiều dài'] = `${racketObj.length}mm`;
  newRacket['Điểm cân bằng'] = `${racketObj.balancePoint}mm`;
  newRacket['Sức căn tối đa'] = `${racketObj.balancePoint}lbs`;
  newRacket['Dòng vợt'] = capitalize(racketObj.category);
  newRacket['Màu sắc'] = racketObj.frame.join(' / ').toUpperCase();
  newRacket['Sản xuất tại'] = racketObj.madein;

  return newRacket;
};
