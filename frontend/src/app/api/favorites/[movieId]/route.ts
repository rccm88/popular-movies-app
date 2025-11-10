import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// GET - Check if a specific movie is favorited
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ movieId: string }> }
) {
  try {
    const { movieId } = await params;
    const movie_id = parseInt(movieId);

    if (isNaN(movie_id)) {
      return NextResponse.json(
        { error: "Invalid movie_id" },
        { status: 400 }
      );
    }

    const db = getDb();
    const favorite = db
      .prepare("SELECT * FROM favorites WHERE movie_id = ?")
      .get(movie_id);

    return NextResponse.json(
      { isFavorited: !!favorite, favorite: favorite || null },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking favorite:", error);
    return NextResponse.json(
      { error: "Failed to check favorite" },
      { status: 500 }
    );
  }
}

