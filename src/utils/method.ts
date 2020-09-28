export function propEmpty(val: any): boolean {
  return (
    /(number|boolean)/gi.test(typeof val) ||
    (!/\[object (undefined|null)]/gi.test(Object.prototype.toString.call(val)) && !!val)
  );
}

export function createValues(object: object): string {
  let keys = '';
  let values = '';
  for (let [key, val] of Object.entries(object)) {
    values += (typeof val === 'string' ? `\'${val}\'` : val) + ',';
    keys += key + ',';
  }
  return `(${keys.substr(0, keys.length - 1)}) VALUES (${values.substr(0, values.length - 1)})`;
}

export function updateValues(object: object): string {
  let values = ' ';
  for (let [key, val] of Object.entries(object)) {
    val = propEmpty(val) ? val : null;
    val = typeof val === 'string' ? `\'${val}\'` : val;
    values += `${key}=${val},`;
  }
  return values.substr(0, values.length - 1);
}

export function pagination(page: number, page_size: number): string {
  return ` ${Math.max(0, page - 1) * page_size},${page_size}`;
}
