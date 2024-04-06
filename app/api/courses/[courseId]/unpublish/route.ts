import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId
      },
      
    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }


    
    const unPublishedChapter = await db.chapter.update({
      where: {
        id: params.courseId,
      },
      data: {
        isPublished: false,
      }
    });

    return NextResponse.json(unPublishedChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}