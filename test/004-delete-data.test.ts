import mongoose, { Schema, Document, Model } from 'mongoose';
import { DeleteResult } from 'mongodb';
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

describe('Delete Data', () => {
    it('should delete one data', async () => {
        try {
            await mongoose.connect(URI);
            const persons: DeleteResult = await Person.deleteOne({
                name: 'Lidiya'
            });
            console.info(persons);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoose.connection.close();
        }
    });

    it('should delete many data', async () => {
        try {
            await mongoose.connect(URI);
            const persons: DeleteResult = await Person.deleteMany({
                age: '19'
            });
            console.info(persons);
        } catch (error) {
            console.error(error);
        } finally {
            await mongoose.connection.close();
        }
    });
});
