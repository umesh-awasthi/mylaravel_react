import AuthenticatedLayout from '../../Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function UserList({ users }) {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            fetch(`/admin/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
                    'Accept': 'application/json', // 👈 This forces Laravel to return JSON
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message); });
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    window.location.reload(); // Refresh the page to update the user list
                } else {
                    alert(data.message || "Failed to delete user.");
                }
            })
            .catch(error => console.error("Error deleting user:", error));
        }
    };
    

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    User List
                </h2>
            }
        >
            <Head title="User List" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Name</th>
                                        <th className="px-4 py-2">Email</th>
                                        <th className="px-4 py-2">Role_Id</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="border px-4 py-2 text-center">{user.name}</td>
                                            <td className="border px-4 py-2 text-center">{user.email}</td>
                                            <td className="border px-4 py-2 text-center">{user.role_id}</td>
                                            <td className="border px-4 py-2 text-center">
                                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
