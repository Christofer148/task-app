import { EmailValidator } from "@angular/forms"

export type RegisterRequest = {
    firstName: string,
    lastName: string,
    username: EmailValidator,
    password: string,
    country: string
}