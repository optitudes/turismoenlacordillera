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
        Schema::create('microsite_images', function (Blueprint $table) {
            $table->id();
            $table->string("url");
            $table->integer("position");
            $table->timestamps();

            $table->foreignId('micrositeId')->constrained('microsites');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('microsite_images');
    }
};