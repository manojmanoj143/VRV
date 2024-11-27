import React from 'react';
import { Dashboard } from './components/Dashboard';
import { PermissionManagement } from './components/PermissionManagement';
import { RoleManagement } from './components/RoleManagement';
import { UserManagement } from './components/UserManagement';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white p-6">
      <Dashboard />
      <PermissionManagement />
      <RoleManagement />
      <UserManagement />
    </div>
  );
}

export default App;
