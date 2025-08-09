"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, ShoppingCart, Scan, Percent, Eye, Printer } from 'lucide-react'
import Layout from '@/components/Layout'

// Mock data
const products = [
  {
    id: 1,
    name: "Brazilian Straight 16 inch",
    price: 120,
  },
  {
    id: 2,
    name: "Peruvian Body Wave 18 inch",
    price: 140,
  },
  {
    id: 3,
    name: "Malaysian Curly 14 inch",
    price: 160,
  }
]

const initialSales = [
  { id: 1, date: "2025-08-01", customer: "Jane Doe", product: "Brazilian Straight 16 inch", quantity: 2, totalPrice: 240, paymentMethod: "Cash", discount: 0 },
  { id: 2, date: "2025-08-02", customer: "Mary Smith", product: "Peruvian Body Wave 18 inch", quantity: 1, totalPrice: 140, paymentMethod: "Mobile Money", discount: 0 },
  { id: 3, date: "2025-08-03", customer: "Sarah Johnson", product: "Malaysian Curly 14 inch", quantity: 1, totalPrice: 144, paymentMethod: "Card", discount: 10 }
]

export default function SalesPage() {
  const [sales, setSales] = useState(initialSales)
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false)
  const [newSale, setNewSale] = useState({
    product: '',
    quantity: '',
    customer: '',
    paymentMethod: '',
    discountType: 'percentage',
    discountValue: ''
  })

  const selectedProduct = products.find(p => p.name === newSale.product)
  const subtotal = selectedProduct ? selectedProduct.price * parseInt(newSale.quantity || '0') : 0
  const discountAmount = newSale.discountValue ? 
    (newSale.discountType === 'percentage' ? 
      subtotal * (parseFloat(newSale.discountValue) / 100) : 
      parseFloat(newSale.discountValue)) : 0
  const totalPrice = subtotal - discountAmount

  const handleAddSale = () => {
    if (!selectedProduct) return
    
    const sale = {
      id: sales.length + 1,
      date: new Date().toISOString().split('T')[0],
      customer: newSale.customer,
      product: newSale.product,
      quantity: parseInt(newSale.quantity),
      totalPrice: totalPrice,
      paymentMethod: newSale.paymentMethod,
      discount: discountAmount
    }
    setSales([...sales, sale])
    setNewSale({
      product: '',
      quantity: '',
      customer: '',
      paymentMethod: '',
      discountType: 'percentage',
      discountValue: ''
    })
    setIsNewSaleModalOpen(false)
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="mobile-header">
          <div>
            <h1 className="mobile-title brown-text">Sales</h1>
            <p className="text-amber-700 text-sm sm:text-base">Track and manage your sales transactions</p>
          </div>
          <Dialog open={isNewSaleModalOpen} onOpenChange={setIsNewSaleModalOpen}>
            <DialogTrigger asChild>
              <Button className="mobile-button gold-gradient hover:opacity-90 text-white shadow-lg">
                <Plus className="h-4 w-4 mr-2" />
                New Sale
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] fade-in">
              <DialogHeader>
                <DialogTitle className="brown-text text-xl">Record New Sale</DialogTitle>
                <DialogDescription>
                  Add a new sale transaction to your records.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="product" className="text-right brown-text">Product</Label>
                  <Select onValueChange={(value) => setNewSale({...newSale, product: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem key={product.id} value={product.name}>
                          {product.name} - {product.price} BR
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right brown-text">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newSale.quantity}
                    onChange={(e) => setNewSale({...newSale, quantity: e.target.value})}
                    className="col-span-3"
                    min="1"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="customer" className="text-right brown-text">Customer</Label>
                  <Input
                    id="customer"
                    value={newSale.customer}
                    onChange={(e) => setNewSale({...newSale, customer: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="payment" className="text-right brown-text">Payment</Label>
                  <Select onValueChange={(value) => setNewSale({...newSale, paymentMethod: value})}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Card">Card</SelectItem>
                      <SelectItem value="Mobile Money">Mobile Money</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Discount Section */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-4 items-center gap-4 mb-2">
                    <Label className="text-right brown-text flex items-center gap-1">
                      <Percent className="h-4 w-4" />
                      Discount
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      <Select value={newSale.discountType} onValueChange={(value) => setNewSale({...newSale, discountType: value})}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">%</SelectItem>
                          <SelectItem value="fixed">BR</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        value={newSale.discountValue}
                        onChange={(e) => setNewSale({...newSale, discountValue: e.target.value})}
                        placeholder="0"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Barcode Scanner Mock */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right brown-text">Barcode</Label>
                  <Button variant="outline" className="col-span-3 justify-start">
                    <Scan className="h-4 w-4 mr-2" />
                    Scan Barcode
                  </Button>
                </div>

                {/* Price Summary */}
                {subtotal > 0 && (
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>BR{subtotal}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm text-red-600">
                        <span>Discount:</span>
                        <span>-BR{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold gold-text border-t pt-2">
                      <span>Total:</span>
                      <span>BR{totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button 
                  type="submit" 
                  onClick={handleAddSale}
                  className="gold-gradient hover:opacity-90 text-white"
                  disabled={!newSale.product || !newSale.quantity || !newSale.customer || !newSale.paymentMethod}
                >
                  Record Sale
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 gold-text" />
              Recent Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="brown-text">Date</TableHead>
                      <TableHead className="brown-text">Customer</TableHead>
                      <TableHead className="brown-text">Product</TableHead>
                      <TableHead className="brown-text">Quantity</TableHead>
                      <TableHead className="brown-text">Discount</TableHead>
                      <TableHead className="brown-text">Total Price</TableHead>
                      <TableHead className="brown-text">Payment Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sales.map((sale) => (
                      <TableRow key={sale.id} className="hover:bg-amber-50">
                        <TableCell>{sale.date}</TableCell>
                        <TableCell className="font-medium">{sale.customer}</TableCell>
                        <TableCell>{sale.product}</TableCell>
                        <TableCell className="text-center">{sale.quantity}</TableCell>
                        <TableCell>
                          {sale.discount > 0 ? (
                            <Badge variant="secondary" className="bg-red-100 text-red-800">
                              -BR{sale.discount.toFixed(2)}
                            </Badge>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </TableCell>
                        <TableCell className="font-semibold gold-text">BR{sale.totalPrice}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-amber-200 text-amber-800">
                            {sale.paymentMethod}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {sales.map((sale) => (
                <Card key={sale.id} className="shadow-md border-0 hover-lift">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header with customer and total */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold brown-text text-sm">{sale.customer}</h3>
                          <p className="text-xs text-gray-600">{sale.date}</p>
                        </div>
                        <div className="text-right ml-2">
                          <div className="text-lg font-bold gold-text">BR{sale.totalPrice}</div>
                          <Badge variant="outline" className="border-amber-200 text-amber-800 text-xs">
                            {sale.paymentMethod}
                          </Badge>
                        </div>
                      </div>

                      {/* Product details */}
                      <div className="bg-amber-50 rounded-lg p-3">
                        <p className="font-medium text-sm brown-text">{sale.product}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-600">Quantity: {sale.quantity}</span>
                          {sale.discount > 0 && (
                            <Badge variant="secondary" className="bg-red-100 text-red-800 text-xs">
                              -BR{sale.discount.toFixed(2)}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Quick actions */}
                      <div className="flex space-x-2 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1 text-amber-600 border-amber-200 hover:bg-amber-50">
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50">
                          <Printer className="h-4 w-4 mr-1" />
                          Print Receipt
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}