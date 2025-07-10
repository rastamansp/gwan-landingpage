export class CompleteProfileInput {
  constructor(
    public readonly userId: string,
    public readonly imageFile: any
  ) {}
}

export class CompleteProfileOutput {
  constructor(
    public readonly success: boolean,
    public readonly profileImageUrl?: string,
    public readonly message?: string,
    public readonly error?: string
  ) {}
}
