"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Package, DollarSign, AlertTriangle, Users, TrendingUp } from "lucide-react"
import Layout from "@/components/Layout"

// Mock data
const products = [
  {
    id: 1,
    name: "Brazilian Straight 16 inch",
    stock: 20,
    minStock: 5,
  },
  {
    id: 2,
    name: "Peruvian Body Wave 18 inch",
    stock: 3,
    minStock: 5,
  },
  {
    id: 3,
    name: "Malaysian Curly 14 inch",
    stock: 2,
    minStock: 5,
  },
]

const sales = [
  { id: 1, totalPrice: 240 },
  { id: 2, totalPrice: 140 },
]

const customers = [
  { id: 1, name: "Jane Doe", totalPurchases: 4, loyaltyPoints: 80 },
  { id: 2, name: "Mary Smith", totalPurchases: 2, loyaltyPoints: 30 },
]

const monthlyData = [
  { month: "Jan", sales: 2400 },
  { month: "Feb", sales: 1398 },
  { month: "Mar", sales: 9800 },
  { month: "Apr", sales: 3908 },
  { month: "May", sales: 4800 },
  { month: "Jun", sales: 3800 },
]

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#D4AF37",
  },
}

export default function Dashboard() {
  const totalProducts = products.length
  const totalSalesToday = sales.reduce((sum, sale) => sum + sale.totalPrice, 0)
  const lowStockProducts = products.filter((product) => product.stock <= product.minStock)
  const topCustomers = customers.sort((a, b) => b.totalPurchases - a.totalPurchases).slice(0, 3)

  return (
    <Layout>
      <div className="space-y-6">
        <div className="mobile-header">
          <div>
            <h1 className="mobile-title brown-text">Dashboard</h1>
            <p className="text-amber-700 text-sm sm:text-base">Welcome back! Here's your shop overview.</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mobile-grid">
          <Card className="mobile-card shadow-lg border-0 bg-gradient-to-br from-white to-amber-50 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium brown-text">Total Products</CardTitle>
              <Package className="h-4 w-4 gold-text flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold brown-text">{totalProducts}</div>
              <p className="text-xs text-amber-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="mobile-text-truncate">Active items</span>
              </p>
            </CardContent>
          </Card>

          <Card className="mobile-card shadow-lg border-0 bg-gradient-to-br from-white to-green-50 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-green-900">Sales Today</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{totalSalesToday} BR</div>
              <p className="text-xs text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="mobile-text-truncate">Today's revenue</span>
              </p>
            </CardContent>
          </Card>

          <Card className="mobile-card shadow-lg border-0 bg-gradient-to-br from-white to-red-50 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-red-900">Low Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">{lowStockProducts.length}</div>
              <p className="text-xs text-red-600">Need restocking</p>
            </CardContent>
          </Card>

          <Card className="mobile-card shadow-lg border-0 bg-gradient-to-br from-white to-blue-50 hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium text-blue-900">Top Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-600 flex-shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{topCustomers.length}</div>
              <p className="text-xs text-blue-600">VIP customers</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Low Stock Table */}
          <Card className="mobile-card shadow-lg border-0 hover-lift">
            <CardHeader>
              <CardTitle className="brown-text flex items-center gap-2 text-base sm:text-lg">
                <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                <span className="mobile-text-truncate">Low Stock Items</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">Products needing attention</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="mobile-table-container">
                <Table className="mobile-table">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="brown-text text-xs">Product</TableHead>
                      <TableHead className="brown-text text-xs">Stock</TableHead>
                      <TableHead className="brown-text text-xs">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lowStockProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium text-xs">
                          <div className="mobile-text-truncate max-w-[100px] sm:max-w-none">{product.name}</div>
                        </TableCell>
                        <TableCell className="font-semibold text-red-600 text-xs">{product.stock}</TableCell>
                        <TableCell>
                          <Badge variant="destructive" className="bg-red-100 text-red-800 text-xs px-1 py-0">
                            Low
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Sales Chart */}
          <Card className="mobile-card shadow-lg border-0 hover-lift">
            <CardHeader>
              <CardTitle className="brown-text text-base sm:text-lg">Monthly Sales</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Last 6 months performance</CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="mobile-chart-container">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={5}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        fontSize={10}
                      />
                      <YAxis hide />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                      <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
