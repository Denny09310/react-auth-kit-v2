export type User = {
    id: number;
    email: string;
    firstName: string;
    lastName: string,
}

export type LoginResponse = User & { token: string }