export type User = {
  id: string;
  email: string;
};

export function fetchUsers() {
  return fetch("http://localhost:3001/users")
    .then((res) => res.json())
    .then((data) => {
      return data.map((item: { id: string; user: User }) => ({
        id: item.user.id,
        email: item.user.email,
      }));
    });
}

export function createUser(user: User) {
  console.log(user);
  return fetch("http://localhost:3001/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user }),
  }).then((res) => res.json());
}

export function deleteUser(id: string) {
  return fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" }).then(
    (res) => res.json(),
  );
}
