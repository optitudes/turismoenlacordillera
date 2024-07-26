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
        Schema::create('microsites', function (Blueprint $table) {
            //atributos de la tabla
            $table->id();
            $table->string("smallImageUrl")->nullable();
            $table->string("bannerImageUrl")->nullable();
            $table->text("description")->nullable();
            $table->string("name")->unique();
            $table->string("experiences")->nullable();
            $table->boolean('isActive');
            $table->boolean('isPublish');

            //relaciones
            $table->foreignId('ventureId')->constrained('ventures');

            //comportamientos
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('microsites');
    }
};
