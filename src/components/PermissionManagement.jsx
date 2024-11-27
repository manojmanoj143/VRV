import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { SearchInput } from './SearchInput';
import { ChevronUp, ChevronDown } from 'lucide-react';

const initialPermissions = [
  { id: 1, name: 'Read', description: 'Allows reading data' },
  { id: 2, name: 'Write', description: 'Allows creating and updating data' },
  { id: 3, name: 'Delete', description: 'Allows deleting data' },
];

export function PermissionManagement() {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [newPermission, setNewPermission] = useState({ name: '', description: '' });
  const [isAddPermissionOpen, setIsAddPermissionOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const addPermission = () => {
    if (!newPermission.name || !newPermission.description) {
      alert('Please fill in all fields');
      return;
    }
    setPermissions([...permissions, { ...newPermission, id: permissions.length + 1 }]);
    setNewPermission({ name: '', description: '' });
    setIsAddPermissionOpen(false);
  };

  const filteredPermissions = useMemo(() => {
    return permissions.filter((permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [permissions, searchTerm]);

  const sortedPermissions = useMemo(() => {
    return [...filteredPermissions].sort((a, b) => {
      if (sortColumn === 'name') {
        return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else {
        return sortDirection === 'asc'
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      }
    });
  }, [filteredPermissions, sortColumn, sortDirection]);

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
        <h2 className="text-2xl font-bold text-indigo-300">Permission Management</h2>
        <Dialog open={isAddPermissionOpen} onOpenChange={setIsAddPermissionOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-500 hover:bg-indigo-400 text-white">Add Permission</Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Permission</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newPermission.name}
                  onChange={(e) => setNewPermission({ ...newPermission, name: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right text-white">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newPermission.description}
                  onChange={(e) => setNewPermission({ ...newPermission, description: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white"
                />
              </div>
            </div>
            <Button onClick={addPermission} className="bg-indigo-500 hover:bg-indigo-400 text-white">
              Add Permission
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search permissions..."
        />
      </div>
      <Table className="bg-gray-800 text-white">
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer text-white">
              Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('description')} className="cursor-pointer text-white">
              Description {sortColumn === 'description' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPermissions.map((permission) => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
