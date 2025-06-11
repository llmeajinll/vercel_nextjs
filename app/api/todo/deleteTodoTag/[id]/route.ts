import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    //   console.log(await req.json());
    console.log('deletetag : ', new ObjectId(params.id));

    try {
        const client = await connectDB;
        const db = client.db('todo').collection('tag');
        const result = await db.deleteOne({ _id: new ObjectId(params.id) });

        if (result.acknowledged) {
            console.log('[deleteTodoTag] : ', result)
            return NextResponse.json(
                { message: 'Todo deleted successfully', result: true, deleteTag: params.id },
                { status: 200 }
            );
        } else {
            return NextResponse.json({ message: 'Tag not found' }, { status: 404 });
        }
    } catch (err) {
        return NextResponse.json(
            { message: 'Error deleting tag' },
            { status: 500 }
        );
    }

    //   const addTodo = await db.updateOne({
    //     content,
    //     updated_at: date,
    //     tag,
    //     state: false,
    //   });

    //   if (addTodo.acknowledged) {
    //     console.log(addTodo.acknowledged);
    //     return NextResponse.json({ message: 'success' }, { status: 200 });
    //   } else {
    //     console.log(addTodo.acknowledged);
    //     return NextResponse.json({ message: 'error' }, { status: 404 });
    //   }
}
