"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from 'next/navigation'
import { Crown } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen hair-texture-bg flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md shadow-2xl border-0 hover-lift">
        <CardHeader className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 gold-gradient rounded-full flex items-center justify-center">
            <Crown className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
          <CardTitle className="text-2xl sm:text-3xl font-bold brown-text">My-Store</CardTitle>
          <CardDescription className="text-amber-700 text-sm sm:text-base">
            Premium Inventory Management System
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="brown-text font-medium text-sm sm:text-base">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 h-10 sm:h-12 text-sm sm:text-base"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="brown-text font-medium text-sm sm:text-base">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-amber-200 focus:border-amber-400 focus:ring-amber-400 h-10 sm:h-12 text-sm sm:text-base"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full gold-gradient hover:opacity-90 text-white font-semibold py-2 sm:py-3 px-4 rounded-xl shadow-lg transition-all duration-200 h-10 sm:h-12 text-sm sm:text-base"
            >
              Sign In to My-store
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
