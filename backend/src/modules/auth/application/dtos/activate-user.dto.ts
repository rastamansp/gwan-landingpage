export class ActivateUserInput {
  constructor(
    public readonly userId: string,
    public readonly activationCode: string
  ) {}
}

export class ActivateUserOutput {
  constructor(
    public readonly success: boolean,
    public readonly message?: string,
    public readonly error?: string
  ) {}
}
