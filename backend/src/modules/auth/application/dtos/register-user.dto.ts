export class RegisterUserInput {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly phone: string
  ) { }
}

export class RegisterUserOutput {
  constructor(
    public readonly success: boolean,
    public readonly userId?: string,
    public readonly message?: string,
    public readonly error?: string,
    public readonly activationCode?: string
  ) { }
}
