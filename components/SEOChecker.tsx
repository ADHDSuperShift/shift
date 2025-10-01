'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { supabase } from '../lib/supabase'

interface SEOResult {
  score: number
  title: string
  description: string
  headings: number
  images: number
  links: number
  recommendations: string[]
}

const SEOChecker: React.FC = () => {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SEOResult | null>(null)
  const [error, setError] = useState('')

  const checkSEO = async () => {
    if (!url) {
      setError('Please enter a valid URL')
      return
    }

    setLoading(true)
    setError('')
    
    setTimeout(async () => {
      const mockResult: SEOResult = {
        score: Math.floor(Math.random() * 40) + 60,
        title: 'Page Title Found',
        description: 'Meta description present',
        headings: Math.floor(Math.random() * 10) + 1,
        images: Math.floor(Math.random() * 20) + 5,
        links: Math.floor(Math.random() * 50) + 10,
        recommendations: [
          'Add more descriptive alt text to images',
          'Improve page loading speed',
          'Add structured data markup',
          'Optimize meta descriptions',
          'Include more internal links'
        ]
      }
      
      try {
        await supabase.from('seo_analyses').insert({
          url,
          score: mockResult.score,
          results: mockResult
        })
      } catch (err) {
        console.error('Error saving to Supabase:', err)
      }
      
      setResult(mockResult)
      setLoading(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <section id="seo-checker" className="py-20 bg-gray-900 border-t border-green-500/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Free <span className="text-green-400 glow-green">SEO</span> Checker
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Enter your website URL to get an instant SEO analysis with actionable insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-green-500/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Website SEO Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Get detailed insights about your website's SEO performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4">
                <Input
                  type="url"
                  placeholder="https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-gray-700 border-green-500/30 text-white placeholder:text-gray-400"
                />
                <Button 
                  onClick={checkSEO}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 shadow-glow-green"
                >
                  {loading ? 'Analyzing...' : 'Check SEO'}
                </Button>
              </div>

              {error && <div className="text-red-400 text-sm">{error}</div>}

              {result && (
                <div className="space-y-6 mt-8">
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(result.score)} mb-2 glow-green-strong`}>
                      {result.score}
                    </div>
                    <div className="text-gray-400">SEO Score</div>
                    <Progress value={result.score} className="mt-4 h-3" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Technical Analysis</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Headings</span>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            {result.headings} found
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">Images</span>
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            {result.images} total
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-white">Recommendations</h3>
                      <ul className="space-y-2">
                        {result.recommendations.slice(0, 3).map((rec, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300">
                            <span className="text-green-400">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default SEOChecker
