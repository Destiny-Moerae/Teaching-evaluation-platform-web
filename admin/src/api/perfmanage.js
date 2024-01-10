import { request } from './request';

export async function getPointerList(params) {
  return request({
    url: '/pointer',
    method: 'GET',
    params,
  });
}
export async function saveNewNode(data) {
  return request({
    url: 'pointer/save',
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
    data,
  });
}
export async function updateNode(data) {
  return request({
    url: 'pointer/update',
    method: 'POST',
    headers: {
      'Content-type': 'application/json;charset=UTF-8',
    },
    data,
  });
}
export async function deleteANode(data) {
  return request({
    url: '/pointer',
    method: 'DELETE',
    data,
  });
}
