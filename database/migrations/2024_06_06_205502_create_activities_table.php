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
        Schema::create('activities', function (Blueprint $table) {
            //atributos
            $table->id();
            $table->double("cost");
            $table->string("description")->nullable();
            $table->string("name");
            //relaciones
            $table->foreignId('touristRouteId')->constrained('tourist_routes');
            //comportamientos
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activities');
    }
};
