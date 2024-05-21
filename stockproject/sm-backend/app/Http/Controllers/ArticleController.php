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
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $user = Auth::user(); // Get the authenticated user

        $article = new Article();
        $article->id = $request->input('id');
        $article->article = $request->input('article');
        $article->supplier = $request->input('supplier');
        $article->category = $request->input('category');
        $article->quantity = $request->input('quantity');
        $article->unit_price = $request->input('unit_price');
        $article->validate_date = $request->input('validate_date');
        $article->description = $request->input('description');
        $article->image = $request->input('image');
        $article->localisation = $request->input('localisation');
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
        $article = Article::findOrFail($id);
        $article->article = $request->input('article');
        $article->category = $request->input('category');
        $article->quantity = $request->input('quantity');
        $article->unit_price = $request->input('unit_price');
        $article->validate_date = $request->input('validate_date');
        $article->description = $request->input('description');
        $article->image = $request->input('image');
        $article->localisation = $request->input('localisation');
        $article->save();

        return response()->json(['success' => 'Article updated successfully', 'article' => $article]);
    }

    public function destroy($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();
        return response()->json(['success' => 'Article deleted successfully']);
    }
}
