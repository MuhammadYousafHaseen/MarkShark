import 'next-auth';
import { DefaultSession } from 'next-auth';


declare module 'next-auth' {
    interface User{
        _id?:string;
        isAdmin:boolean;
        name?:string;
    }
    interface Session{
          user:{
            id?:string;
            isAdmin?:boolean;
            name?:string;
          } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        name?: string;
        isAdmin: boolean;
    }
}