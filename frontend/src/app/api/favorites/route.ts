import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

// GET - Get all favorites
export async function GET() {
  try {
    const db = getDb();
    const favorites = db.prepare("SELECT * FROM favorites ORDER BY created_at DESC").all();
    
    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Failed to fetch favorites" },
      { status: 500 }
    );
  }
}

// POST - Add a favorite
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { movie_id, title, poster_path, release_date, vote_average } = body;

    if (!movie_id || !title) {
      return NextResponse.json(
        { error: "movie_id and title are required" },
        { status: 400 }
      );
    }

    const db = getDb();
    
    // Check if already favorited
    const existing = db
      .prepare("SELECT * FROM favorites WHERE movie_id = ?")
      .get(movie_id);

    if (existing) {
      return NextResponse.json(
        { error: "Movie already in favorites" },
        { status: 409 }
      );
    }

    // Insert new favorite
    const result = db
      .prepare(
        "INSERT INTO favorites (movie_id, title, poster_path, release_date, vote_average) VALUES (?, ?, ?, ?, ?)"
      )
      .run(movie_id, title, poster_path || null, release_date || null, vote_average || null);

    return NextResponse.json(
      { message: "Favorite added successfully", id: result.lastInsertRowid },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Failed to add favorite" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a favorite
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const movie_id = searchParams.get("movie_id");

    if (!movie_id) {
      return NextResponse.json(
        { error: "movie_id is required" },
        { status: 400 }
      );
    }

    const db = getDb();
    const result = db
      .prepare("DELETE FROM favorites WHERE movie_id = ?")
      .run(parseInt(movie_id));

    if (result.changes === 0) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Favorite removed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Failed to remove favorite" },
      { status: 500 }
    );
  }
}

