import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDTO { 

  @IsEmail({message: "Invalid email message" })
  @IsNotEmpty({ message: 'Field cannot be empty' })
  email: string;

  @MinLength(6)
  @IsNotEmpty({  message: 'Field cannot be empty' })
  readonly password: string;
}

