<?php

namespace App\Http\Controllers;

use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Prompts\Note;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $perPage = $request->query('per_page', 10);

        $notes = Notes::where('user_id', Auth::id())->latest()->paginate($perPage);

        return response()->json([
            'status' => true,
            'data' => $notes->items(),
            'pagination' => [
                'current_page' => $notes->currentPage(),
                'per_page' => $notes->perPage(),
                'total' => $notes->total(),
                'last_page' => $notes->lastPage(),
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $note = Notes::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'content' => $validated['content'] ?? '',
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Note created successfully',
            'data' => $note
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $note = Notes::where('user_id', Auth::id())->find($id);

        if (!$note) {
            return response()->json(['status' => false, 'message' => 'Note not found'], 404);
        }

        return response()->json(['status' => true, 'data' => $note]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $note = Notes::where('user_id', Auth::id())->find($id);

        if (!$note) {
            return response()->json(['status' => false, 'message' => 'Note not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $note->update($validated);

        return response()->json([
            'status' => true,
            'message' => 'Note updated successfully',
            'data' => $note
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $note = Notes::where('user_id', Auth::id())->find($id);

        if (!$note) {
            return response()->json(['status' => false, 'message' => 'Note not found'], 404);
        }

        $note->delete();

        return response()->json(['status' => true, 'message' => 'Note deleted successfully']);

    }
}
