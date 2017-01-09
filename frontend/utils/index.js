export function objectToUrlParams(params) {
  return Object.keys(params).map(prop =>
    [prop, params[prop]].map(encodeURIComponent).join('=')
  ).join('&');
}

export function decimalAdjust(type, value, exp) {
  // Если степень не определена, либо равна нулю...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // Если значение не является числом, либо степень не является целым числом...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Сдвиг разрядов
  value = value.toString().split('e');
  value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
  // Обратный сдвиг
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

export const filterData = (state, field, value, fields = [], type) => {
  let result = [];
  if (field === 'all') {
    fields.map((key) => {
      console.log(key);
      const tmp = state.filter(item => item[key].toString().indexOf(value) !== -1);
      tmp.map((t) => {
        if (result.indexOf(t) === -1) {
          result.push(t);
        }
      });
    });
  }
  else {
    result = state.filter(item => item[field].indexOf(value) !== -1);
  }
  return { type, result };
};
