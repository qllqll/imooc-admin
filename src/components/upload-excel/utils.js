import XLSX from 'xlsx'

/**
 * @description: 获取表头（通用方式）
 * @param {*}
 * @return {*}
 */
export const getHeaderRow = (sheet) => {
  const headers = []
  const range = XLSX.utils.decode_range(sheet['!ref'])
  let C
  const R = range.s.r
  /* start in the first row */
  for (C = range.s.c; C <= range.e.c; ++C) {
    /* walk every column in the range */
    const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
    /* find the cell in the first row */
    let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
    headers.push(hdr)
  }
  return headers
}
/**
 * @description: 判断是否是excel文件
 * @param {*}
 * @return {*}
 */
export const isExcel = (file) => {
  return /\.(xlsx|xls|csv)$/.test(file.name)
}
