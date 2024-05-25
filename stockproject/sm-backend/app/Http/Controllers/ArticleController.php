<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::where('user_id', Auth::id())->get();

        // Append the image URL
        $articles->transform(function($article) {
            if ($article->image) {
                $article->image_url = url('images/' . $article->image);
            }
            return $article;
        });

        return response()->json($articles);
    }


    public function store(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        // Validate the request
        $validated = $request->validate([
            'article' => 'required|string|max:255',
            'supplier' => 'nullable|string|max:255',
            'category' => 'nullable|string|max:255',
            'quantity' => 'nullable|integer',
            'unit_price' => 'nullable|numeric',
            'validate_date' => 'nullable|date',
            'description' => 'nullable|string',
            'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
            'localisation' => 'nullable|string|max:255',
        ]);

        $article = new Article();
        $article->article = $validated['article'];
        $article->supplier = $validated['supplier'] ?? null;
        $article->category = $validated['category'] ?? null;
        $article->quantity = $validated['quantity'] ?? null;
        $article->unit_price = $validated['unit_price'] ?? null;
        $article->validate_date = $validated['validate_date'] ?? null;
        $article->description = $validated['description'] ?? null;
        $article->localisation = $validated['localisation'] ?? null;

        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $article->image = $imageName;
        }

        $article->user_id = $user->id; // Assign the user's ID
        $article->save();

        return response()->json(['success' => 'Article created successfully', 'article' => $article], 201);
    }


//    public function show($id)
//    {
//        $user = Auth::user();
//        $article = Article::where('user_id', $user->id)->find($id);
//
//        if (!$article) {
//            return response()->json(['error' => 'Article not found'], 404);
//        }
//
//        return response()->json($article);
//    }

    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();

            // Fetch the article
            $article = Article::where('id', $id)->where('user_id', $user->id)->firstOrFail();

            // Validate the request
            $validated = $request->validate([
                'article' => 'required|string|max:255',
                'supplier' => 'nullable|string|max:255',
                'category' => 'nullable|string|max:255',
                'quantity' => 'nullable|integer',
                'unit_price' => 'nullable|numeric',
                'validate_date' => 'nullable|date',
                'description' => 'nullable|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'localisation' => 'nullable|string|max:255',
            ]);

            // Update article attributes
            $article->article = $validated['article'];
            $article->supplier = $validated['supplier'] ?? null;
            $article->category = $validated['category'] ?? null;
            $article->quantity = $validated['quantity'] ?? null;
            $article->unit_price = $validated['unit_price'] ?? null;
            $article->validate_date = $validated['validate_date'] ?? null;
            $article->description = $validated['description'] ?? null;
            $article->localisation = $validated['localisation'] ?? null;

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete the old image if it exists
                if ($article->image) {
                    $oldImagePath = public_path('images/' . $article->image);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath);
                    }
                }

                // Save the new image
                $imageName = time() . '.' . $request->image->extension();
                $request->image->move(public_path('images'), $imageName);
                $article->image = $imageName;
            }

            // Save the updated article
            $article->save();

            // Append image URL for response
            $article->image_url = $article->image ? url('images/' . $article->image) : null;

            return response()->json(['success' => 'Article updated successfully', 'article' => $article]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Article not found'], 404);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(['error' => 'Validation error', 'messages' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Internal server error', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['success' => 'Article deleted successfully']);
    }
}
