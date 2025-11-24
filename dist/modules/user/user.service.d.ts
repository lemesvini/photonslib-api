import { CreateUserInput, UpdateUserInput, GetUserParams } from "./user.schema";
export declare function createUser(input: CreateUserInput): Promise<any>;
export declare function getUserById(params: GetUserParams): Promise<any>;
export declare function getUsers(query?: any): Promise<{
    users: any;
    total: any;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function updateUser(params: GetUserParams, input: UpdateUserInput): Promise<any>;
export declare function deleteUser(params: GetUserParams): Promise<{
    message: string;
}>;
//# sourceMappingURL=user.service.d.ts.map