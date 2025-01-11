import { createUser, fetchUsers } from "../../shared/api.ts";
import { Suspense, use, useState } from "react"; //npm i -D @types/react@latest @types/react-dom@lates

//npm i -D @types/react@latest @types/react-dom@lates
// npm i react@latest react-dom@latest

type User = {
  id: string;
  email: string;
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
      <Suspense fallback={<div>loading...</div>}>
        <UsersList usersPromise={usersPromise} />
      </Suspense>
    </main>
  );
}

export function CreateUserForm({ refetchUsers }: { refetchUsers: () => void }) {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({
      email,
      id: crypto.randomUUID(),
    });
    refetchUsers();
    setEmail("");
  };
  return (
    <form className={"flex gap-2"} onSubmit={handleSubmit}>
      <input
        type="email"
        className={"border p-2 m-2 rounded"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className={
          "bg-blue-500 hover: bg-blue-700 text-white font-bold py-2 px-2 rounded"
        }
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export function UsersList({ usersPromise }: { usersPromise: Promise<User[]> }) {
  const users = use(usersPromise);
  console.log(users);
  return (
    <div className="flex flex-col">
      {users.map((user) => (
        <UserCard user={user} key={user.id} />
      ))}
    </div>
  );
}

export function UserCard({ user }: { user: User }) {
  return (
    <div className={"p-2 m-2 rounded bg-gray-100 flex gap-2"} key={user.id}>
      {user.email}

      <button
        className={
          "bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded ml-2 ml-auto"
        }
        type={"button"}
      >
        Delete
      </button>
    </div>
  );
}
