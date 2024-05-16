<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePasswordResetTokensTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email', 191)->primary(); // Reduce length to 191
            $table->string('token');
            $table->timestamp('created_at')->nullable();
            $table->charset = 'utf8';  // Specify utf8 character set
            $table->collation = 'utf8_unicode_ci';  // Specify utf8 collation
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('password_reset_tokens');
    }
}
