import { NextResponse } from 'next/server'
import { getAllDataFromSheet } from '@/lib/google-sheets'

// Caché en memoria
let cachedData: { products: any[], categories: any[], featuredProducts: any[] } | null = null
let lastFetchTime = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutos en milisegundos

export async function GET() {
  try {
    const now = Date.now()
    
    // Si hay datos en caché y no han expirado, usarlos
    if (cachedData && (now - lastFetchTime < CACHE_DURATION)) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true
      })
    }
    
    // Si no hay caché o expiró, consultar Google Sheets
    const { products, categories, featuredProducts } = await getAllDataFromSheet()
    
    // Actualizar caché
    cachedData = { products, categories, featuredProducts }
    lastFetchTime = now
    
    return NextResponse.json({
      success: true,
      data: {
        products,
        categories,
        featuredProducts
      },
      cached: false
    })
  } catch (error) {
    // Si hay error y tenemos caché, usar caché como fallback
    if (cachedData) {
      return NextResponse.json({
        success: true,
        data: cachedData,
        cached: true,
        fallback: true
      })
    }
    
    console.error('Error fetching data:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch data' },
      { status: 500 }
    )
  }
}
