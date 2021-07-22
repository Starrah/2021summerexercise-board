export let secret = "d41d8cd98f00b204e9800998ecf8427e"

export interface User {
    name: string
    password: string
    permission: string
}

export const users: Record<string, User> = {
    "root": {
        name: "root",
        password: "123456",
        permission: "admin",
    }
}
