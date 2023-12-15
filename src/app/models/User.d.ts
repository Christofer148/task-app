export type User = {
    id: number,
    firstName?: string,
    lastName?: string,
    username: EmailValidator,
    country?: string,
    message?: string
}