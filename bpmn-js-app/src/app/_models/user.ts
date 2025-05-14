export class User1 {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
  }

  export class User {
    type: string;                     // C# string -> TypeScript string
    groupId?: number;                 // C# int? (nullable) -> TypeScript number? (nullable)
    group?: string;                   // C# string -> TypeScript string
    company?: string;                 // C# string -> TypeScript string
    accessToken?: string;             // C# string -> TypeScript string              // C# List<string> -> TypeScript string[]
    avatarId?: number;                // C# int? -> TypeScript number?
    displayName?: string;             // C# string -> TypeScript string
    thumbUrl?: string;                // C# string -> TypeScript string
    avatarUrl?: string;               // C# string -> TypeScript string
    fileType?: number;                // C# int? -> TypeScript number?
    gender?: string;                  // C# string -> TypeScript string
    tenantID: string;                 // C# Guid -> TypeScript string (UUID in TypeScript is a string)
    ErrorMessage?: string;            // C# string -> TypeScript string
    MailID?: string;                  // C# string -> TypeScript string
    role?: string;                    // C# string -> TypeScript string
    onPremises: boolean;              // C# bool -> TypeScript boolean
    dynamicProperties?: string;       // C# string -> TypeScript string
    jwtAccessToken?: string;          // C# string -> TypeScript string
    refreshAccessToken?: string;
  }