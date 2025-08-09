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
import { Plus, Pencil, Trash2, Package } from 'lucide-react'
import Layout from '@/components/Layout'

// Mock data
const initialProducts = [
  {
    id: 1,
    name: "Brazilian Straight 16 inch",
    hairType: "Straight",
    length: "16 inch",
    color: "Natural Black",
    texture: "Brazilian",
    price: 120,
    stock: 20,
    minStock: 5,
    supplier: "Glam Hair Co",
    variants: [
      { length: "14 inch", stock: 8 },
      { length: "18 inch", stock: 5 }
    ]
  },
  {
    id: 2,
    name: "Peruvian Body Wave 18 inch",
    hairType: "Wavy",
    length: "18 inch",
    color: "Natural Black",
    texture: "Peruvian",
    price: 140,
    stock: 10,
    minStock: 5,
    supplier: "Hair Luxe Supplies",
    variants: [
      { length: "16 inch", stock: 6 },
      { length: "20 inch", stock: 4 }
    ]
  },
  {
    id: 3,
    name: "Malaysian Curly 14 inch",
    hairType: "Curly",
    length: "14 inch",
    color: "Natural Brown",
    texture: "Malaysian",
    price: 160,
    stock: 8,
    minStock: 5,
    supplier: "Premium Hair Ltd",
    variants: []
  }
]

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    hairType: '',
    length: '',
    color: '',
    texture: '',
    price: '',
    stock: '',
    minStock: '',
    supplier: ''
  })

  const handleAddProduct = () => {
    const product = {
      id: products.length + 1,
      name: newProduct.name,
      hairType: newProduct.hairType,
      length: newProduct.length,
      color: newProduct.color,
      texture: newProduct.texture,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      minStock: parseInt(newProduct.minStock),
      supplier: newProduct.supplier,
      variants: []
    }
    setProducts([...products, product])
    setNewProduct({
      name: '',
      hairType: '',
      length: '',
      color: '',
      texture: '',
      price: '',
      stock: '',
      minStock: '',
      supplier: ''
    })
    setIsAddModalOpen(false)
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id))
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="mobile-header">
          <div>
            <h1 className="mobile-title brown-text">Products</h1>
            <p className="text-amber-700 text-sm sm:text-base">Manage your hair product inventory</p>
          </div>
        </div>

        <Card className="shadow-lg border-0 hover-lift">
          <CardHeader>
            <CardTitle className="brown-text flex items-center gap-2">
              <Package className="h-5 w-5 gold-text" />
              Product Inventory
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="brown-text">Name</TableHead>
                      <TableHead className="brown-text">Hair Type</TableHead>
                      <TableHead className="brown-text">Length</TableHead>
                      <TableHead className="brown-text">Color</TableHead>
                      <TableHead className="brown-text">Texture</TableHead>
                      <TableHead className="brown-text">Price</TableHead>
                      <TableHead className="brown-text">Stock</TableHead>
                      <TableHead className="brown-text">Supplier</TableHead>
                      <TableHead className="brown-text">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id} className="hover:bg-amber-50">
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.hairType}</TableCell>
                        <TableCell>{product.length}</TableCell>
                        <TableCell>{product.color}</TableCell>
                        <TableCell>{product.texture}</TableCell>
                        <TableCell className="font-semibold gold-text">{product.price} BR</TableCell>
                        <TableCell>
                          <span className={product.stock <= product.minStock ? 'text-red-600 font-semibold' : 'font-medium'}>
                            {product.stock}
                          </span>
                        </TableCell>
                        <TableCell>{product.supplier}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="text-amber-600 border-amber-200 hover:bg-amber-50">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleDeleteProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {products.map((product) => (
                <Card key={product.id} className="shadow-md border-0 hover-lift">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header with name and stock status */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold brown-text text-sm leading-tight">{product.name}</h3>
                          <p className="text-xs text-gray-600 mt-1">{product.texture} • {product.hairType}</p>
                        </div>
                        <div className="flex flex-col items-end ml-2">
                          <span className="text-lg font-bold gold-text">{product.price} BR</span>
                          <Badge 
                            variant={product.stock <= product.minStock ? "destructive" : "secondary"}
                            className={`text-xs ${product.stock <= product.minStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                          >
                            {product.stock} in stock
                          </Badge>
                        </div>
                      </div>

                      {/* Product details */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-gray-500">Length:</span>
                          <span className="ml-1 font-medium">{product.length}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Color:</span>
                          <span className="ml-1 font-medium">{product.color}</span>
                        </div>
                      </div>

                      {/* Supplier */}
                      <div className="text-xs">
                        <span className="text-gray-500">Supplier:</span>
                        <span className="ml-1 font-medium">{product.supplier}</span>
                      </div>

                      {/* Variants (if any) */}
                      {product.variants.length > 0 && (
                        <div className="border-t pt-2">
                          <p className="text-xs text-gray-500 mb-1">Variants:</p>
                          <div className="flex flex-wrap gap-1">
                            {product.variants.map((variant, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {variant.length}: {variant.stock}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-2 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1 text-amber-600 border-amber-200 hover:bg-amber-50">
                          <Pencil className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Floating Add Button */}
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="fixed bottom-6 right-6 gold-gradient hover:opacity-90 text-white rounded-full w-16 h-16 shadow-xl hover-lift">
              <Plus className="h-8 w-8" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] fade-in">
            <DialogHeader>
              <DialogTitle className="brown-text text-xl">Add New Product</DialogTitle>
              <DialogDescription>
                Add a new hair product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right brown-text">Name</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hairType" className="text-right brown-text">Hair Type</Label>
                <Select onValueChange={(value) => setNewProduct({...newProduct, hairType: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select hair type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Straight">Straight</SelectItem>
                    <SelectItem value="Wavy">Wavy</SelectItem>
                    <SelectItem value="Curly">Curly</SelectItem>
                    <SelectItem value="Kinky">Kinky</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="length" className="text-right brown-text">Length</Label>
                <Input
                  id="length"
                  value={newProduct.length}
                  onChange={(e) => setNewProduct({...newProduct, length: e.target.value})}
                  className="col-span-3"
                  placeholder="e.g., 16 inch"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right brown-text">Color</Label>
                <Input
                  id="color"
                  value={newProduct.color}
                  onChange={(e) => setNewProduct({...newProduct, color: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="texture" className="text-right brown-text">Texture</Label>
                <Input
                  id="texture"
                  value={newProduct.texture}
                  onChange={(e) => setNewProduct({...newProduct, texture: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right brown-text">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right brown-text">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="minStock" className="text-right brown-text">Min Stock</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={newProduct.minStock}
                  onChange={(e) => setNewProduct({...newProduct, minStock: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="supplier" className="text-right brown-text">Supplier</Label>
                <Input
                  id="supplier"
                  value={newProduct.supplier}
                  onChange={(e) => setNewProduct({...newProduct, supplier: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleAddProduct}
                className="gold-gradient hover:opacity-90 text-white"
              >
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  )
}