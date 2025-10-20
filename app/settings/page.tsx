import { DashboardNav } from "@/components/dashboard-nav"
import { ProfileSettings } from "@/components/profile-settings"
import { SecuritySettings } from "@/components/security-settings"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardNav />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          <ProfileSettings />
          <SecuritySettings />
        </div>
      </main>
    </div>
  )
}
