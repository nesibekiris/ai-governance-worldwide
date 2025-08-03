import { NextResponse } from 'next/server'
import { getGovernanceData } from '@/lib/data'

export const dynamic = 'force-dynamic'
export const revalidate = 3600 // 1 hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'json'
    const country = searchParams.get('country')
    const region = searchParams.get('region')
    const approach = searchParams.get('approach')
    
    let data = await getGovernanceData()
    
    // Apply filters
    if (country) {
      data.countries = data.countries.filter(c => 
        c.id === country || c.name.toLowerCase().includes(country.toLowerCase())
      )
    }
    
    if (region && region !== 'all') {
      data.countries = data.countries.filter(c => c.region === region)
    }
    
    if (approach && approach !== 'all') {
      data.countries = data.countries.filter(c => c.approach === approach)
    }
    
    // Format response
    if (format === 'csv') {
      const csv = convertToCSV(data.countries)
