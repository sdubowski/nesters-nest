import {Address} from './address';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyId: number;
    roleId: string;
    address: Address
}
