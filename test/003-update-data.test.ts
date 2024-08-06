import mongoose, { Schema, Document, Model } from 'mongoose';
import { UpdateResult } from 'mongodb';
import 'dotenv/config';

const URI: string = process.env.MONGO_URI || '';

interface Persons extends Document {
    name: string;
    age: string;
}
const PersonSchema: Schema<Persons> = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
});
const Person = mongoose.model('Person', PersonSchema);

describe('Update Data', () => {
    it('should update one data', async () => {
        try {
            await mongoose.connect(URI);
            const persons: Array<Persons> | null =
                await Person.findOneAndUpdate(
                    { name: 'Supri' },
                    { name: 'Via Fitriana' }
                );
            console.info(persons);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoose.connection.close();
        }
    });

    it('should update many data', async () => {
        try {
            await mongoose.connect(URI);
            const persons: UpdateResult<Document> = await Person.updateMany(
                { age: '19' },
                { age: '20' }
            );
            console.info(persons);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoose.connection.close();
        }
    });

    it('should update all data', async () => {
        try {
            await mongoose.connect(URI);
            const persons: UpdateResult<Document> = await Person.updateMany(
                {},
                { age: '19' }
            );
            console.info(persons);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoose.connection.close();
        }
    });
});
