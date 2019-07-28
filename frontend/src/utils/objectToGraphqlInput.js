const objectToGraphqlInput = (obj) => {
  const keys = Object.keys(obj);
  let str = '{';

  keys.forEach((key, index) => {
    if (typeof obj[key] === 'string') {
      str += `${key}:"${obj[key]}"`;
    } else {
      str += `${key}:${obj[key]}`;
    }

    if (index + 1 !== keys.length) {
      str += ',';
    }
  });

  str += '}';

  return str;
};

export default objectToGraphqlInput;
