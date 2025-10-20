"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera } from "lucide-react"

export function ProfileSettings() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Profile Information</CardTitle>
        <CardDescription className="text-muted-foreground">Update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
              <Camera className="h-4 w-4 mr-2" />
              Change Photo
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="first-name" className="text-foreground">
              First Name
            </Label>
            <Input id="first-name" defaultValue="John" className="bg-background border-border text-foreground" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name" className="text-foreground">
              Last Name
            </Label>
            <Input id="last-name" defaultValue="Doe" className="bg-background border-border text-foreground" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            defaultValue="john@example.com"
            className="bg-background border-border text-foreground"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-foreground">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            className="bg-background border-border text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" className="border-border text-foreground hover:bg-muted bg-transparent">
            Cancel
          </Button>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  )
}
