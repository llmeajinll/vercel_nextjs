import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/shared/lib/database';
import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  //   console.log(await req.json());
  console.log('deletetodo : ', params.id);

  try {
    const client = await connectDB;
    const db = client.db('todo').collection('list');
    const result = await db.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: 'Todo deleted successfully' },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ message: 'Todo not found' }, { status: 404 });
    }
  } catch (err) {
    return NextResponse.json(
      { message: 'Error deleting todo' },
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
