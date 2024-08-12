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
        Schema::create('microsite_themes', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("demoImageUrl");
            $table->integer("viewIndex");
            $table->integer("maxImages");
            $table->integer("maxVideos");

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('microsite_themes');
    }
};
