<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Post;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create([
            'title' => 'Laravel',
            'body' => 'APIの勉強'
        ]);

        Post::create([
            'title' => 'Vue',
            'body' => 'フロントエンド'
        ]);     //
    }
}
