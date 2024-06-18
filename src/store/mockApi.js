import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import enData from '../translations/en/mockdata.json';
import esData from '../translations/es/mockdata.json';
import deData from '../translations/de/mockdata.json';
import cnData from '../translations/cn/mockdata.json';

const mockData = {
  en: enData,
  es: esData,
  de: deData,
  cn: cnData
}

const mock = new MockAdapter(axios);

function parseQueryString(url) {
  const queryString = url.replace(/.*\?/, '');

  if (queryString === url || !queryString) {
    return null;
  }

  const urlParams = new URLSearchParams(queryString);
  const result = {};

  urlParams.forEach((val, key) => {
    if (result.hasOwnProperty(key)) {
      result[key] = [result[key], val];
    } else {
      result[key] = val;
    }
  });

  return result;
}

mock.onGet(/api\/category\/?.*/).reply((config) => {
  const params = parseQueryString(config.url);

  if(params.id !== undefined) {
    const data = mockData[params.lang].productList.filter(list => list.categoryId === params.id);
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([200, data]);
      }, 500);
    });
  } else {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([200, mockData[params.lang].categoryList]);
      }, 1500);
    });
  }
});