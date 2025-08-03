'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Download, Filter, Search, ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Tooltip } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { exportToCSV } from '@/lib/export'
import Link from 'next/link'

interface Country {
  id: string
  name: string
  flag: string
  region: string
  approach: string
  policy: {
    key: string
    status: string
    philosophy: string
    enforcement: {
      penalties: string
      active: boolean
    }
  }
  investment: {
    total: number
    infrastructure: string
  }
  score: {
    overall: number
    regulatoryReadiness: number
    innovation: number
  }
}

interface ComparisonMatrixProps {
  countries: Country[]
}

const categories = [
  { id: 'policy', label: 'Key Policy', key: 'policy.key' },
  { id: 'philosophy', label: 'Philosophy', key: 'policy.philosophy' },
  { id: 'investment', label: 'Investment', key: 'investment.total' },
  { id: 'infrastructure', label: 'Infrastructure', key: 'investment.infrastructure' },
  { id: 'penalties', label: 'Penalties', key: 'policy.enforcement.penalties' },
  { id: 'score', label: 'Overall Score', key: 'score.overall' }
]

export function ComparisonMatrix({ countries }: ComparisonMatrixProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('all')
  const [selectedApproach, setSelectedApproach] = useState('all')
  const [sortBy, setSortBy] = useState('score.overall')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

  const filteredCountries = useMemo(() => {
    let filtered = countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion
      const matchesApproach = selectedApproach === 'all' || country.approach === selectedApproach
      return matchesSearch && matchesRegion && matchesApproach
    })

    // Sort countries
    filtered.sort((a, b) => {
      const getValue = (obj: any, path: string) => {
        return path.split('.').reduce((o, p) => o[p], obj)
      }
      
      const aVal = getValue(a, sortBy)
      const bVal = getValue(b, sortBy)
      
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
      }
      
      return sortOrder === 'asc' 
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })

    return filtered
  }, [countries, searchTerm, selectedRegion, selectedApproach, sortBy, sortOrder])

  const handleExport = () => {
    exportToCSV(filteredCountries, 'ai-governance-comparison')
  }

  const getApproachColor = (approach: string) => {
    const colors = {
      'comprehensive': 'bg-green-100 dark:bg-green-900/20',
      'innovation-first': 'bg-orange-100 dark:bg-orange-900/20',
      'state-led': 'bg-pink-100 dark:bg-pink-900/20',
      'balanced': 'bg-blue-100 dark:bg-blue-900/20'
    }
    return colors[approach as keyof typeof colors] || 'bg-gray-100'
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select
          value={selectedRegion}
          onValueChange={setSelectedRegion}
          className="w-40"
        >
          <option value="all">All Regions</option>
          <option value="Europe">Europe</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Middle East">Middle East</option>
        </Select>

        <Select
          value={selectedApproach}
          onValueChange={setSelectedApproach}
          className="w-48"
        >
          <option value="all">All Approaches</option>
          <option value="comprehensive">Comprehensive</option>
          <option value="innovation-first">Innovation-First</option>
          <option value="state-led">State-Led</option>
          <option value="balanced">Balanced</option>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <ArrowUpDown className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
        >
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-50 px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:bg-gray-900 dark:text-gray-400">
                Country
              </th>
              {categories.map((category) => (
                <th
                  key={category.id}
                  className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  onClick={() => setSortBy(category.key)}
                >
                  <div className="flex items-center gap-1">
                    {category.label}
                    {sortBy === category.key && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-blue-600"
                      >
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </motion.span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            <AnimatePresence>
              {filteredCountries.map((country, index) => (
                <motion.tr
                  key={country.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    hoveredCountry === country.id ? 'bg-gray-50 dark:bg-gray-700' : ''
                  }`}
                  onMouseEnter={() => setHoveredCountry(country.id)}
                  onMouseLeave={() => setHoveredCountry(null)}
                >
                  <td className="sticky left-0 z-10 bg-white px-6 py-4 text-sm font-medium text-gray-900 dark:bg-gray-800 dark:text-white">
                    <Link href={`/country/${country.id}`} className="flex items-center gap-3 hover:text-blue-600">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <div className="font-semibold">{country.name}</div>
                        <Badge variant="secondary" className={`mt-1 text-xs ${getApproachColor(country.approach)}`}>
                          {country.approach}
                        </Badge>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="font-medium text-gray-900 dark:text-white">{country.policy.key}</div>
                    <div className="text-xs">{country.policy.status}</div>
                  </td>
                  
                  <td className="max-w-xs px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <Tooltip content={country.policy.philosophy}>
                      <div className="truncate">{country.policy.philosophy}</div>
                    </Tooltip>
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      ${(country.investment.total / 1e9).toFixed(0)}B
                    </div>
                  </td>
                  
                  <td className="max-w-xs px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="truncate">{country.investment.infrastructure}</div>
                  </td>
                  
                  <td className="px-6 py-4 text-sm">
                    <div className={`flex items-center gap-2 ${
                      country.policy.enforcement.active ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      {country.policy.enforcement.active && (
                        <span className="h-2 w-2 rounded-full bg-red-600"></span>
