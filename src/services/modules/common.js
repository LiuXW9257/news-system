import req from '../index'

export function getAllNavPath(){
  return req.get(`/rights?_embed=children`)
}