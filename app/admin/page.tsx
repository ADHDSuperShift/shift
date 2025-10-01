import Navigation from '../../src/components/Navigation'
import AdminDashboard from '../../src/components/AdminDashboard'
import Footer from '../../src/components/Footer'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navigation />
      <main className="pt-20">
        <AdminDashboard />
      </main>
      <Footer />
    </div>
  )
}
