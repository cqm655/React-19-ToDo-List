import {deleteUser, fetchUsers} from "../../shared/api.ts";
import {Suspense, use, useActionState, useState, useTransition} from "react";
import {ErrorBoundary} from "react-error-boundary";
import {createUserAction} from "./actions.ts";

//npm i -D @types/react@latest @types/react-dom@lates
// npm i react@latest react-dom@latest

type User = {
  id: string;
  user: {
    id: string;
    email: string;
  };
};

const defaultUsersPromise = fetchUsers();

export function UsersPage() {
  const [usersPromise, setUsersPromise] = useState(defaultUsersPromise);
  const refetchUsers = () => {
    setUsersPromise(fetchUsers);
  };

  return (
    <main className={" container mx-auto p-4 pt-10 flex flex-col gap-4"}>
      <h1 className={"text-3xl font-bold underline mb-10"}>Users</h1>
      <CreateUserForm refetchUsers={refetchUsers} />
      <ErrorBoundary
        fallbackRender={(e) => (
          <div className={"text-red-800"}>
            'Somethink went wrong': {JSON.stringify(e.error)}
          </div>
        )}
      >
        <Suspense fallback={<div>loading...</div>}>
          <UsersList usersPromise={usersPromise} refetchUsers={refetchUsers} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}

export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [email, setEmail] = useState("");

  const [isPending, startTransition] = useTransition();
  const {} = useActionState(createUserAction({ refetchUsers, setEmail }));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {});
  };
  return (
    <form className={"flex gap-2"} onSubmit={handleSubmit}>
      <input
        type="email"
        className={"border p-2 m-2 rounded"}
        value={email}
        disabled={isPending}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={
          "bg-blue-500 hover: bg-blue-700 text-white font-bold py-2 px-2 rounded disabled:bg-gray-500"
        }
        disabled={isPending}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export function UsersList({
  usersPromise,
  refetchUsers,
}: {
  usersPromise: Promise<User[]>;
  refetchUsers: () => void;
}) {
  const users = use(usersPromise);

  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <UserCard user={user} key={user.id} refetchUsers={refetchUsers} />
      ))}
    </div>
  );
}

export function UserCard({
  user,
  refetchUsers,
}: {
  user: User;
  refetchUsers: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const { user: userList } = user;
  const handleDelete = async () => {
    startTransition(async () => {
      await deleteUser(user.id);
      startTransition(() => {
        refetchUsers();
      });
    });
  };
  return (
    <div className={"p-2 m-2 rounded bg-gray-100 flex gap-2"} key={userList.id}>
      {userList.email}
      <button
        className={
          "bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded ml-2 ml-auto disabled:bg-gray-500"
        }
        type={"button"}
        disabled={isPending}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
