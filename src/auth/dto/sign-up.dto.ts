import { IsEmail, IsNotEmpty, Matches, MinLength } from "class-validator";

export class CreateUserDTO {
 
  @MinLength(3)
  @IsNotEmpty({ message: 'Field cannot be empty' })
  username: string;
  
  @IsEmail()
  @IsNotEmpty({ message: 'Field cannot be empty' })
  email: string;

  @MinLength(6)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 
    { message: "The password must have at least eight characters, at least one letter and one number" }
  )
  @IsNotEmpty({ message: 'Field cannot be empty' })
  password: string;
}