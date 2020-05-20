function storeType(type) {
  return type && `${type}Storage` || 'localStorage';
}

function getter(key, type) {
  const strout = window[storeType(type)].getItem(key) || "null";
  return JSON.parse(strout);
}

function setter(key, value, type) {
  if (value === undefined) {
    value = null;
  }
  const str = JSON.stringify(value);
  window[storeType(type)].setItem(key, str);
  return str;
}

export function get(key) {
  return getter(key, 'local');
}

export function set(key, value) {
  return setter(key, value, 'local');
}

export function clear(key) {
  window[storeType('local')].removeItem(key);
}
