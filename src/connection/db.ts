import { connect, connection, Connection } from 'mongoose';

export class Database {
    public connection: Connection = new Connection;

    public async connectDb(URL: string): Promise<void> {
        try {
            await connect(URL)
            console.log('MongoDB connected');
        } catch (err) {
            console.error('MongoDB connection error:', err);
        }
    }
}


