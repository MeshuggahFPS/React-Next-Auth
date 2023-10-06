export default interface IUser {
    uuid: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}