import { useEffect, useState } from "react";
import UsersTable from "./UserTable";
import EditUserModal from "./EditUserModal";

export type User = {
  id: number;
  email: string;
  createdAt: string;
};

export default function UsersContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUsers() {
    const res = await fetch("/api/user/list");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function updateUser(
    id: number,
    email: string,
    password?: string
  ) {
    await fetch("/api/user/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, email, password }),
    });

    setEditingUser(null);
    loadUsers();
  }

  async function deleteUser(id: number) {
    await fetch("/api/user/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    loadUsers();
  }

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <>
      <UsersTable
        users={users}
        onEdit={setEditingUser}
        onDelete={deleteUser}
      />

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={updateUser}
        />
      )}
    </>
  );
}
