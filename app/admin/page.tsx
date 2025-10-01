import AdminAuth from '../../src/components/AdminAuth'
import AdminDashboard from '../../src/components/AdminDashboard'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      <AdminAuth>
        <AdminDashboard />
      </AdminAuth>
    </div>
  )
}
