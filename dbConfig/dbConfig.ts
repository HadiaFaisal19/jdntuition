import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected');
        });
        connection.on('error', (err) => {
            console.log('DB connection error: ' + err);
            process.exit();
        });

    } catch (error) {
        console.log('Error while connecting to DB: ', error);
    }
}
