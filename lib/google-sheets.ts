// Función para parsear CSV a objetos
const parseCSV = (csvText: string) => {
  const lines = csvText.trim().split('\n')
  if (lines.length < 2) return []
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  const data = []
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''))
    const obj: any = {}
    headers.forEach((header, index) => {
      obj[header] = values[index] || ''
    })
    data.push(obj)
  }
  
  return data
}

// Obtener datos de Google Sheets público como CSV - SOLO UNA PESTAÑA!
export const getAllDataFromSheet = async () => {
  const sheetId = process.env.GOOGLE_SHEET_ID || ''
  const response = await fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=Productos`)
  const csvText = await response.text()
  const products = parseCSV(csvText)
  
  // Extraer categorías únicas de los productos
  const categoriesMap = new Map()
  products.forEach(prod => {
    const categoryName = prod.categorias || prod.categoria
    const image = prod.imagen
    if (categoryName && !categoriesMap.has(categoryName)) {
      categoriesMap.set(categoryName, { name: categoryName, image })
    }
  })
  const categories = Array.from(categoriesMap.values())
  
  // Extraer productos destacados (destacado = "si" o "SI")
  const featuredProducts = products.filter(prod => 
    (prod.destacado || '').toLowerCase() === 'si'
  )
  
  return { products, categories, featuredProducts }
}
