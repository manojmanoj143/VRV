import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UserManagement } from './UserManagement';
import { RoleManagement } from './RoleManagement';
import { PermissionManagement } from './PermissionManagement';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg mt-4">
      <h1 className="text-4xl font-bold mb-6 text-center">RBAC Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex justify-center space-x-4">
          <TabsTrigger value="users" className="text-lg hover:text-indigo-400">
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="text-lg hover:text-indigo-400">
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="text-lg hover:text-indigo-400">
            Permissions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}
