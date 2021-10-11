export interface Post {
    _id: string;
    name: string;
    age: string;
    description: string;
    lastSeenAt: string;
    image: string;
    reward: string;
    publisher: {
        _id: string;
        name: string;
    }
    contactDetails: string;
    createdAt: Date;
    updatedAt: Date;
}