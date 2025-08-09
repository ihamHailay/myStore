"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"
import { CalendarDays, TrendingUp, PieChartIcon, DollarSign } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import Layout from '@/components/Layout'

// Mock data
const monthlyData = [
  { month: "Jan", sales: 2400 },
  { month: "Feb", sales: 1398 },
  { month: "Mar", sales: 9800 },
  { month: "Apr", sales: 3908 },
  { month: "May", sales: 4800 },
  { month: "Jun", sales: 3800 },
  { month: "Jul", sales: 4300 },
  { month: "Aug", sales: 2400 },
]

const topProducts = [
  { name: "Brazilian Straight", value: 35, color: "#D4AF37" },
  { name: "Peruvian Body Wave", value: 25, color: "#B8941F" },
  { name: "Malaysian Curly", value: 20, color: "#9A7B0A" },
  { name: "Indian Straight", value: 15, color: "#7D6608" },
  { name: "Others", value: 5, color: "#5D4A06" },
]

const profitMargins = [
  { product: "Brazilian Straight 16 inch", cost: 80, price: 120, profit: 40, margin: "33.3%" },
  { product: "Peruvian Body Wave 18 inch", cost: 95, price: 140, profit: 45, margin: "32.1%" },
  { product: "Malaysian Curly 14 inch", cost: 110, price: 160, profit: 50, margin: "31.3%" },
  { product: "Indian Straight 20 inch", cost: 70, price: 100, profit: 30, margin: "30.0%" },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#D4AF37",
  },
}

export default function ReportsPage() {
  const [dateFrom, setDateFrom] = useState('2025-01-01')
  const [dateTo, setDateTo] = useState('2025-08-31')

  return (
    <Layout>
      <div className="space-y-6 sm:space-y-8">
        <div className="mobile-header">
          <div>
            <h1 className="mobile-title brown-text">Reports</h1>
            <p className="text-amber-700 text-sm sm:text-base">Analyze your business performance and trends</p>
          </div>
        </div>

        {/* Date Range Filter */}
        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2 text-base sm:text-lg">
              <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 gold-text" />
              Date Range Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
              <div className="space-y-2 w-full sm:w-auto">
                <Label htmlFor="dateFrom" className="brown-text text-sm">From</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="border-amber-200 w-full sm:w-auto"
                />
              </div>
              <div className="space-y-2 w-full sm:w-auto">
                <Label htmlFor="dateTo" className="brown-text text-sm">To</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="border-amber-200 w-full sm:w-auto"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Monthly Sales Line Chart */}
          <Card className="shadow-lg border-0 hover-lift">
            <CardHeader>
              <CardTitle className="brown-text flex items-center gap-2 text-base sm:text-lg">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 gold-text" />
                Monthly Sales Trend
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Sales performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px] sm:h-[300px]">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={5}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        fontSize={10}
                      />
                      <YAxis hide />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent />}
                      />
                      <Line
                        dataKey="sales"
                        type="monotone"
                        stroke="var(--color-sales)"
                        strokeWidth={2}
                        dot={{
                          fill: "var(--color-sales)",
                          strokeWidth: 2,
                          r: 3,
                        }}
                        activeDot={{
                          r: 4,
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Top Selling Products Pie Chart */}
          <Card className="shadow-lg border-0 hover-lift">
            <CardHeader>
              <CardTitle className="brown-text flex items-center gap-2 text-base sm:text-lg">
                <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 gold-text" />
                Top Selling Products
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Product performance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topProducts}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => {
                        // Show shorter labels on mobile
                        const shortName = name.split(' ')[0]
                        return `${shortName} ${percent ? (percent * 100).toFixed(0) : 0}%`
                      }}
                      outerRadius={window.innerWidth < 640 ? 60 : 80}
                      fill="#8884d8"
                      dataKey="value"
                      fontSize={10}
                    >
                      {topProducts.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profit Margin Analysis */}
        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2 text-base sm:text-lg">
              <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 gold-text" />
              Profit Margin Analysis
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Cost analysis and profit margins per product</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="brown-text">Product</TableHead>
                      <TableHead className="brown-text">Cost</TableHead>
                      <TableHead className="brown-text">Selling Price</TableHead>
                      <TableHead className="brown-text">Profit</TableHead>
                      <TableHead className="brown-text">Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profitMargins.map((item, index) => (
                      <TableRow key={index} className="hover:bg-amber-50">
                        <TableCell className="font-medium">{item.product}</TableCell>
                        <TableCell className="text-red-600">{item.cost} BR</TableCell>
                        <TableCell className="font-semibold">{item.price} BR</TableCell>
                        <TableCell className="text-green-600 font-semibold">{item.profit} BR</TableCell>
                        <TableCell>
                          <span className="gold-text font-semibold">{item.margin}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {profitMargins.map((item, index) => (
                <Card key={index} className="shadow-md border-0 hover-lift">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Product name and margin */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold brown-text text-sm leading-tight">{item.product}</h3>
                        </div>
                        <Badge className="gold-gradient text-white text-xs ml-2">
                          {item.margin}
                        </Badge>
                      </div>

                      {/* Financial details */}
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center p-2 bg-red-50 rounded">
                          <p className="text-gray-500 mb-1">Cost</p>
                          <p className="font-semibold text-red-600">{item.cost} BR</p>
                        </div>
                        <div className="text-center p-2 bg-blue-50 rounded">
                          <p className="text-gray-500 mb-1">Price</p>
                          <p className="font-semibold text-blue-600">{item.price} BR</p>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <p className="text-gray-500 mb-1">Profit</p>
                          <p className="font-semibold text-green-600">{item.profit} BR</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="mobile-grid">
          <Card className="mobile-card shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-blue-900">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-3xl font-bold text-blue-900">28,840 BR</div>
              <p className="text-xs text-blue-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="mobile-text-truncate">+12% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card className="mobile-card shadow-lg border-0 bg-gradient-to-br from-white to-purple-50 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-purple-900">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-3xl font-bold text-purple-900">156</div>
              <p className="text-xs text-purple-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="mobile-text-truncate">+8% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card className="mobile-card shadow-lg border-0 bg-gradient-to-br from-white to-green-50 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-green-900">Average Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-3xl font-bold text-green-900">185 BR</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="mobile-text-truncate">+3% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card className="mobile-card shadow-lg border-0 bg-gradient-to-br from-white to-orange-50 hover-lift">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-orange-900">Top Product</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm sm:text-lg font-bold text-orange-900">Brazilian Straight</div>
              <p className="text-xs text-orange-600">35% of total sales</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}