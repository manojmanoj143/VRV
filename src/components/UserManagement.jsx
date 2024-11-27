import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { SearchInput } from './SearchInput';
import { ChevronUp, ChevronDown } from 'lucide-react';

const initialUsers = [
  { id: 1, name: 'Manoj', email: 'Manoj143@gmail.com', role: 'Admin' },
  { id: 2, name: 'Tharun', email: 'tharun@gmail.com', role: 'User' },
  { id: 3, name: 'Dhoni', email: 'dhoni@gmail.com', role: 'User' },
];

export function UserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'User' });
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const addUser = () => {
    if (!newUser.name || !newUser.email) {
      alert('Please fill in all fields');
      return;
    }
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', role: 'User' });
    setIsAddUserOpen(false);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (sortColumn === 'name') {
        return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortColumn === 'email') {
        return sortDirection === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
      } else {
        return sortDirection === 'asc' ? a.role.localeCompare(b.role) : b.role.localeCompare(a.role);
      }
    });
  }, [filteredUsers, sortColumn, sortDirection]);

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
        <h2 className="text-2xl font-bold text-indigo-300">User Management</h2>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-500 hover:bg-indigo-400 text-white">Add User</Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900">
            <DialogHeader>
              <DialogTitle className="text-white">Add New User</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right text-white">
                  Role
                </Label>
                <select
                  id="role"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="col-span-3 bg-gray-700 text-white p-2 rounded-md"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <Button onClick={addUser} className="bg-indigo-500 hover:bg-indigo-400 text-white">
              Add User
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search users..."
        />
      </div>
      <Table className="bg-gray-800 text-white">
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('name')} className="cursor-pointer text-white">
              Name {sortColumn === 'name' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('email')} className="cursor-pointer text-white">
              Email {sortColumn === 'email' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
            <TableHead onClick={() => handleSort('role')} className="cursor-pointer text-white">
              Role {sortColumn === 'role' && (sortDirection === 'asc' ? <ChevronUp className="inline" /> : <ChevronDown className="inline" />)}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
