import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.once('open', () => {
            console.log('Database connected');
        });

        connection.on('error', () => {
            console.log('Error connecting to database');
            process.exit();
        });

    } catch (error) {
        console.log('Error connecting to database: ', error);
    }
}