import mongoose, { Schema, Document, Model } from 'mongoose';
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

    it('should insert data to mongodb', async () => {
        try {
            await mongoose.connect(URI);
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
            const person = new Person({
                name: 'Ahmad Beni Rusli',
                age: '19'
            });
            await person.save().then((person: any) => console.info(person));
        } catch (error) {
            console.error('Error');
        } finally {
            await mongoose.connection.close();
        }
    });
});
