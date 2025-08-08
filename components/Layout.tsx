"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, Package, ShoppingCart, Users, Building, BarChart3, Settings, Menu, LogOut, User, Search, Bell, Crown } from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/products', icon: Package },
  { name: 'Sales', href: '/sales', icon: ShoppingCart },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Suppliers', href: '/suppliers', icon: Building },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const handleLogout = () => {
    router.push('/')
  }

  const lowStockCount = 3 // Mock notification count

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-white flex flex-col md:flex-row">
      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 flex-shrink-0 border-r border-amber-100 bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-2 p-4 border-b border-amber-100">
            <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold brown-text">Hair Luxe</span>
          </div>
          <nav className="flex-1 space-y-2 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'gold-gradient text-white shadow-md'
                      : 'text-amber-700 hover:bg-amber-50 hover:text-amber-900'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Fixed Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm border-b border-amber-100">
          <div className="flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 lg:px-6">
            {/* Left: Mobile Menu Trigger */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden h-8 w-8 sm:h-10 sm:w-10">
                    <Menu className="h-4 w-4 sm:h-6 sm:w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 sm:w-72 sidebar-transition">
                  <div className="flex flex-col space-y-4 mt-4">
                    <div className="flex items-center space-x-2 px-4">
                      <div className="w-8 h-8 gold-gradient rounded-full flex items-center justify-center">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-lg font-bold brown-text">Hair Luxe</span>
                    </div>
                    <nav className="space-y-2">
                      {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'gold-gradient text-white shadow-md'
                                : 'text-amber-700 hover:bg-amber-50 hover:text-amber-900'
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )
                      })}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="hidden md:flex items-center space-x-2">
                <h1 className="text-xl font-semibold text-amber-800">{navigation.find(nav => nav.href === pathname)?.name || 'Dashboard'}</h1>
              </div>
            </div>

            {/* Center: Search Bar */}
            <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-amber-200 focus:border-amber-400 focus:ring-amber-400 h-9 sm:h-10 w-full"
                />
              </div>
            </div>

            {/* Right: Notifications, User Menu */}
            <div className="flex items-center space-x-1 sm:space-x-3">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    {lowStockCount > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center gold-gradient text-white text-xs">
                        {lowStockCount}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 sm:w-80 fade-in">
                  <DropdownMenuLabel className="brown-text">Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="space-y-2 p-2">
                    <div className="flex items-center space-x-2 p-2 hover:bg-amber-50 rounded">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Low Stock Alert</p>
                        <p className="text-xs text-gray-600 truncate">Malaysian Curly 14 inch - Only 2 left</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-2 hover:bg-amber-50 rounded">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Low Stock Alert</p>
                        <p className="text-xs text-gray-600 truncate">Peruvian Body Wave - Only 3 left</p>
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="gold-gradient text-white text-xs sm:text-sm">A</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 sm:w-56 fade-in" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none brown-text">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        admin@hairluxe.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
