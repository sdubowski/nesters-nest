import {User} from './user';

export interface Order {
    id: number;
    orderStatusId: number;
    creationDate: Date;
    endDate: Date;
    driver: User;
    driverId: string
    startPlace: string;
    destination: string;
    profit: number;
    userId: number;
    companyId: number;
    mileageRate: number;
    mileage: number;
    cargoType: number;
}


