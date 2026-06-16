<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
     public function index()
    {
        return response()->json(Post::all());
    }

    public function store(Request $request)
   {
    $validated = $request->validate([
        'title' => 'required|string',
        'body'  => 'required|string',
    ]);

    $post = Post::create($validated);

    return response()->json($post, 201);
   }
   public function show($id)
  {
    return response()->json(Post::findOrFail($id));
  }

  public function update(Request $request, $id)
  {
    $post = Post::findOrFail($id);

    $validated = $request->validate([
        'title' => 'required|string',
        'body'  => 'required|string',
    ]);

    $post->update($validated);

    return response()->json($post);
  }

   public function destroy($id)
  {
    $post = Post::findOrFail($id);
    $post->delete();

    return response()->json([
        'message' => '削除しました'
    ]);
  }
}
