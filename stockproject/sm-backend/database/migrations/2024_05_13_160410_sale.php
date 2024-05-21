<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sales', function (Blueprint $table) {
            $table->id(); // Auto-increment primary key
            $table->bigInteger('id_article')->unsigned(); // Foreign key without auto-increment
            $table->bigInteger('id_client')->unsigned(); // Foreign key without auto-increment
            $table->string('category', 191);
            $table->integer('quantity');
            $table->decimal('unit_price', 8, 2);
            $table->text('description');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
