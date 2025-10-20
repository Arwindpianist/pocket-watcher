"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { LogOut, Shield } from "lucide-react"

export function SecuritySettings() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Security</CardTitle>
        <CardDescription className="text-muted-foreground">Manage your password and security settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Change Password */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Change Password</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-foreground">
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                placeholder="••••••••"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-foreground">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-new-password" className="text-foreground">
                Confirm New Password
              </Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="••••••••"
                className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Update Password</Button>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Logout Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <LogOut className="h-5 w-5 text-destructive" />
            <h3 className="text-lg font-semibold text-foreground">Sign Out</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Sign out of your account on this device. You'll need to sign in again to access your data.
          </p>
          <Button variant="destructive" className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Separator className="bg-border" />

        {/* Danger Zone */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-destructive">Danger Zone</h3>
          <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 space-y-3">
            <div>
              <h4 className="font-medium text-foreground">Delete Account</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
