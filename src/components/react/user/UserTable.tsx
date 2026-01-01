import DeleteUserButton from "./DeleteUserButton";
import type { User } from "./UserContainer";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
};

export default function UsersTable({ users, onEdit, onDelete }: Props) {
  return (
    <div
      className="
        overflow-x-auto
        border border-(--card-border)
        bg-(--login-bg)
        shadow-sm
      "
    >
      <table className="w-full text-sm">
        <thead
          className="
            bg-(--color-primary)/5
            text-(--color-primary)
          "
        >
          <tr>
            <th className="px-6 py-4 text-left font-semibold tracking-wide">
              #
            </th>
            <th className="px-6 py-4 text-left font-semibold tracking-wide">
              Email
            </th>
            <th className="px-6 py-4 text-left font-semibold tracking-wide">
              Creado
            </th>
            <th className="px-6 py-4 text-right font-semibold tracking-wide">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-(--card-border)">
          {users.map((user, index) => (
            <tr
              key={user.id}
              className="
                transition-colors
                hover:bg-(--color-primary)/5
              "
            >
              <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                {users.length - index}
              </td>

              <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                {user.email}
              </td>

              <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                {new Date(user.createdAt).toLocaleDateString("es-PE", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="
                      inline-flex items-center
                      px-3 py-1.5
                      text-xs font-semibold
                      text-green-500
                      border border-(--card-border)
                      transition-all duration-200
                      hover:bg-(--color-primary)
                      hover:text-white
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-(--color-primary)/30 cursor-pointer
                    "
                  >
                    Editar
                  </button>

                  <DeleteUserButton
                    userId={user.id}
                    onDelete={onDelete}
                  />
                </div>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="
                  px-6 py-10
                  text-center
                  text-slate-500 dark:text-slate-400
                "
              >
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
