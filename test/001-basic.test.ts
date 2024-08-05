import mongoose from 'mongoose';
import 'dotenv/config';

const URI: string = process.env.MONGO_URI || '';

describe('BASIC', () => {
    it('should connect to mongodb', async () => {
        try {
            await mongoose
                .connect(URI)
                .then(() => console.log('success connecting'));
        } catch (error) {
            console.error('Error');
        } finally {
            await mongoose.connection.close();
        }
    });
});
