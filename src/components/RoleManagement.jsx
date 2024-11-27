import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { SearchInput } from './SearchInput';
import { ChevronUp, ChevronDown } from 'lucide-react';

const initialRoles = [
  { id: 1, name: 'Admin', permissions: 'Read, Write, Delete' },
  { id: 2, name: 'User', permissions: 'Read' },
  { id: 3, name: 'Guest', permissions: 'Read' },
];

export function RoleManagement() {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState({ name: '', permissions: '' });
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const addRole = () => {
    if (!newRole.name || !newRole.permissions) {
      alert('Please fill in all fields');
      return;
    }
    setRoles([...roles, { ...newRole, id: roles.length + 1 }]);
    setNewRole({ name: '', permissions: '' });
    setIsAddRoleOpen(false);
  };

  const filteredRoles = useMemo(() => {
    return roles.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.permissions.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [roles, searchTerm]);

  const sortedRoles = useMemo(() => {
    return [...filteredRoles].sort((a, b) => {
      if (sortColumn === 'name') {
        return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        return sortDirection === 'asc' ? a.permissions.localeCompare(b.permissions) : b.permissions.localeCompare(a.permissions);
      }
    });
  }, [filteredRoles, sortColumn, sortDirection]);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-indigo-300">Role Management</h2>
        <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-500 hover:bg-indigo-400 text-white">Add Role</Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Role</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role-name" className="text-right text-white">
                  Role Name
                </Label>
                <Input
                  id="role-name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="permissions" className="text-right text-white">
                  Permissions
                </Label>
                <Input
                  id="permissions"
                  value={newRole.permissions}
                  onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white"
                />
              </div>
            </div>
            <Button onClick={addRole} className="bg-indigo-500 hover:bg-indigo-400 text-white">
              Add Role
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search roles..."
        />
      </div>
      <Table className="bg-gray-800 text-white">
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer text-white">
              Role Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('permissions')} className="cursor-pointer text-white">
              Permissions {sortColumn === 'permissions' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRoles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
