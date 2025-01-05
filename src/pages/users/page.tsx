import { useState } from "react";

type User = {
  id: string;
  email: string;
};

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsers([...users, { id: crypto.randomUUID(), email }]);
    setEmail("");
  };

  return (
    <main className={" container mx-auto p-4 pt-10 flex flex-col gap-4"}>
      <h1 className={"text-3xl font-bold underline mb-10"}>Users</h1>
      <section>
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
      </section>
      <div className="flex flex-col">
        {users.map((user: User) => (
          <div className={"p-2 m-2 rounded bg-gray-100"} key={user.id}>
            {user.email}
          </div>
        ))}
      </div>
    </main>
  );
}
