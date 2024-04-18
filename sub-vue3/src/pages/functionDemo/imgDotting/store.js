// 获取信息
const getInfos = () => {
  const value = window.localStorage.getItem('infos')
  return value ? JSON.parse(value) : {}
}
const getInfosValue = () => {
  return Object.values(getInfos()) || [];
}
// 编辑某个key的数据
const editInfo = (key, value) => {
  const values = getInfos() || {};
  values[key] = {
    id: key,
    ...value
  }
  window.localStorage.setItem('infos', JSON.stringify(values))
}
// 删除某条数据
const deleteInfo = (key) => {
  const values = getInfos() || {};
  delete values[key]
  window.localStorage.setItem('infos', JSON.stringify(values))
}

export default {
  getInfos,
  editInfo,
  getInfosValue,
  deleteInfo
}