import { request } from './request'

export async function getPointerList (params) {
  return request({
    url: '/pointer',
    method: 'GET',
    params,
  })
}
